import { Injectable } from '@nestjs/common';
import {
  Configuration,
  CreateChatCompletionResponse,
  CreateChatCompletionResponseChoicesInner,
  OpenAIApi,
} from 'openai';
import { threeTextsGenerationPrompt } from './prompts';
import { ConfigService } from '@nestjs/config';

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
          content: `${threeTextsGenerationPrompt} ${query}`,
        },
      ],
      n: 1,
    });
    return results.data.choices[0].message.content
      .split('\n\n')
      .map((s) => s.replace(/\$\$\$/, ''))
      .filter((_) => _);
  }
}
