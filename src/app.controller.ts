import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import OpenAI from 'openai';

import Model = OpenAI.Model;
import Page = OpenAI.Page;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/model/list')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOkResponse({ type: Page<Model> })
  @ApiOperation({
    description: 'AI 모델의 리스트를 가져옵니다.',
  })
  async getModelList(): Promise<Page<Model>> {
    return this.appService.getModelList();
  }
}
