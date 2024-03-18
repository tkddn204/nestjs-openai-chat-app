import { Injectable } from '@nestjs/common';
import { OpenaiService } from './modules/openai/openai.service';

@Injectable()
export class AppService {
  constructor(private readonly openaiService: OpenaiService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getModelList() {
    return this.openaiService.getModelList();
  }
}
