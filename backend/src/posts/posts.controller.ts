import { Controller, Post, Get, Body } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() body: any) {
    const { authorId, content, url, tags } = body;
    return this.postsService.create(authorId, content, url, tags);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }
}
