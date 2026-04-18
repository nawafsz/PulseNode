import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { Pinecone, type RecordMetadata } from '@pinecone-database/pinecone';

export enum FactStatus {
  VERIFIED = 'VERIFIED',
  DISPUTED = 'DISPUTED',
  FALSE = 'FALSE',
  PENDING = 'PENDING',
}

export interface ModerationResult {
  summary: string;
  factStatus: FactStatus;
  trustScore: number;
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openaiClient: OpenAI | null = null;
  private pineconeClient: Pinecone | null = null;

  async generateSummary(content: string): Promise<string> {
    this.logger.log('Generating AI summary...');

    const openai = this.getOpenAIClient();
    const model = process.env.OPENAI_MODEL?.trim() || 'gpt-4o';

    const response = await openai.chat.completions.create({
      model,
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content:
            'You are MindLink AI. Summarize the given post as a TL;DR in 1-2 sentences. Keep it neutral and factual.',
        },
        { role: 'user', content },
      ],
    });

    return (response.choices[0]?.message?.content ?? '').trim();
  }

  async verifyFact(
    content: string,
    url?: string,
  ): Promise<{ status: FactStatus; honestyScore: number }> {
    this.logger.log('Running fact-check verification...');

    const openai = this.getOpenAIClient();
    const model = process.env.OPENAI_MODEL?.trim() || 'gpt-4o';

    const promptParts: string[] = [];
    promptParts.push('Return ONLY valid JSON.');
    promptParts.push(
      'Schema: {"status":"VERIFIED|DISPUTED|FALSE","honestyScore":number}',
    );
    promptParts.push('honestyScore must be an integer between 0 and 100.');
    promptParts.push(
      'If you are not confident, prefer DISPUTED with a mid score.',
    );
    promptParts.push('');
    if (url) {
      promptParts.push(`Source URL (may help): ${url}`);
      promptParts.push('');
    }
    promptParts.push(`Post:\n${content}`);

    const response = await openai.chat.completions.create({
      model,
      temperature: 0,
      messages: [
        {
          role: 'system',
          content:
            'You are a fact-checking assistant. You must output JSON only (no markdown, no extra text).',
        },
        { role: 'user', content: promptParts.join('\n') },
      ],
    });

    const raw = (response.choices[0]?.message?.content ?? '').trim();
    const parsed = this.safeParseJson(raw);
    const parsedRecord =
      parsed && typeof parsed === 'object'
        ? (parsed as Record<string, unknown>)
        : null;

    const status = this.coerceFactStatus(parsedRecord?.status);
    const honestyScore = this.coerceScore(parsedRecord?.honestyScore);

    return { status, honestyScore };
  }

  async generateEmbedding(
    content: string,
    vectorId?: string,
  ): Promise<number[]> {
    this.logger.log('Generating vector embedding...');

    const openai = this.getOpenAIClient();
    const model =
      process.env.OPENAI_EMBEDDING_MODEL?.trim() || 'text-embedding-3-small';

    const response = await openai.embeddings.create({
      model,
      input: content,
    });

    const embedding = response.data[0]?.embedding;
    if (!embedding) {
      throw new Error('OpenAI embeddings response missing embedding vector');
    }

    await this.tryUpsertToPinecone(vectorId, embedding, {
      textPreview: content.slice(0, 300),
    });

    return embedding;
  }

  private getOpenAIClient(): OpenAI {
    if (this.openaiClient) return this.openaiClient;
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
      throw new Error('Missing OPENAI_API_KEY in environment (.env)');
    }

    this.openaiClient = new OpenAI({ apiKey });
    return this.openaiClient;
  }

  private async tryUpsertToPinecone(
    vectorId: string | undefined,
    values: number[],
    metadata: RecordMetadata,
  ): Promise<void> {
    const apiKey = process.env.PINECONE_API_KEY?.trim();
    const indexName = process.env.PINECONE_INDEX_NAME?.trim();
    if (!apiKey || !indexName || !vectorId) return;

    if (!this.pineconeClient) {
      this.pineconeClient = new Pinecone({ apiKey });
    }

    const namespace = process.env.PINECONE_NAMESPACE?.trim() || 'posts';
    const index = this.pineconeClient.index(indexName);

    await index.namespace(namespace).upsert({
      records: [
        {
          id: vectorId,
          values,
          metadata,
        },
      ],
    });
  }

  private safeParseJson(raw: string): unknown {
    if (!raw) return null;
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) return null;
    const jsonSlice = raw.slice(start, end + 1);
    try {
      return JSON.parse(jsonSlice);
    } catch {
      return null;
    }
  }

  private coerceFactStatus(value: unknown): FactStatus {
    if (value === FactStatus.VERIFIED) return FactStatus.VERIFIED;
    if (value === FactStatus.FALSE) return FactStatus.FALSE;
    if (value === FactStatus.DISPUTED) return FactStatus.DISPUTED;
    return FactStatus.DISPUTED;
  }

  private coerceScore(value: unknown): number {
    const numberValue = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(numberValue)) return 50;
    const intValue = Math.round(numberValue);
    return Math.max(0, Math.min(100, intValue));
  }
}
