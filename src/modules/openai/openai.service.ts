import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import Model = OpenAI.Model;
import Page = OpenAI.Page;

@Injectable()
export class OpenaiService {
  private readonly openai: OpenAI;

  constructor(configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async getModelList(): Promise<Page<Model>> {
    return this.openai.models.list();
  }
}
