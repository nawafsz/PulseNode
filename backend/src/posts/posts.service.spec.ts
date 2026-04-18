import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PrismaService,
          useValue: {
            post: {
              create: jest.fn(),
              update: jest.fn(),
              findMany: jest.fn(),
            },
          } satisfies Partial<PrismaService>,
        },
        {
          provide: AiService,
          useValue: {
            generateSummary: jest.fn(),
            verifyFact: jest.fn(),
            generateEmbedding: jest.fn(),
          } satisfies Partial<AiService>,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
