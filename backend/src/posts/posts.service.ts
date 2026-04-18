import { Injectable, Logger } from '@nestjs/common';
import { FactStatus as PrismaFactStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AiService, FactStatus } from '../ai/ai.service';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async create(authorId: string, content: string, url?: string, tags: string[] = []) {
    this.logger.log(`Creating post for author ${authorId} with tags: ${tags.join(', ')}`);

    // 1. Create initial post in PENDING status
    const post = await this.prisma.post.create({
      data: {
        authorId,
        content,
        originalUrl: url,
        factCheckStatus: 'PENDING',
        tags: {
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      },
      include: { tags: true }
    });

    // 2. Trigger AI processing in background
    void this.processAiReview(post.id, content, url);

    return post;
  }

  private async processAiReview(postId: string, content: string, url?: string) {
    try {
      // Simulate latencies
      const summary = await this.aiService.generateSummary(content);
      const factCheck = await this.aiService.verifyFact(content, url);
      await this.aiService.generateEmbedding(content, postId);

      // Update post with AI results
      const factCheckStatus =
        factCheck.status === FactStatus.VERIFIED
          ? PrismaFactStatus.VERIFIED
          : factCheck.status === FactStatus.FALSE
            ? PrismaFactStatus.FALSE
            : factCheck.status === FactStatus.DISPUTED
              ? PrismaFactStatus.DISPUTED
              : PrismaFactStatus.PENDING;

      await this.prisma.post.update({
        where: { id: postId },
        data: {
          tldrSummary: summary,
          factCheckStatus,
          trustScore: factCheck.honestyScore,
        },
      });

      this.logger.log(`AI Review completed for post ${postId}`);
    } catch (error) {
      this.logger.error(
        `AI Review failed for post ${postId}`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }

  async findAll() {
    return this.prisma.post.findMany({
      include: { author: true, tags: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
