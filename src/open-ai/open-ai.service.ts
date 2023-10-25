import { Injectable } from '@nestjs/common';
import { Configuration, CreateChatCompletionResponse, OpenAIApi } from 'openai';
import {
  promptNumber2,
  promptsDelimiter,
  threeTextsGenerationPrompt,
} from './prompts';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';

@Injectable()
export class OpenAiService {
  private ai: OpenAIApi;
  private defaultModel = 'gpt-3.5-turbo';

  public constructor(private configService: ConfigService) {
    this.ai = new OpenAIApi(
      new Configuration({
        apiKey: this.configService.get<string>('OPEN_AI_API_KEY'),
      }),
    );
  }

  public async generatePromptsForImages(query: string): Promise<string[]> {
    const results = await this.ai.createChatCompletion({
      model: this.defaultModel,
      messages: [
        {
          role: 'assistant',
          content: promptNumber2(query),
        },
      ],
      n: 1,
    });
    const result: { prompt_1: string; prompt_2: string } = JSON.parse(
      results.data.choices[0].message.content,
    );
    const resultPrompts: string[] = [];
    if (result?.prompt_1) {
      resultPrompts.push(result.prompt_1);
    }
    if (result?.prompt_2) {
      resultPrompts.push(result.prompt_2);
    }
    return resultPrompts;
  }
}
