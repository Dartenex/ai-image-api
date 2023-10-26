import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { promptNumber2 } from './prompts';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAiService {
  private ai: OpenAIApi;
  private readonly defaultModel: string = 'gpt-4';

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
    const result: { prompt_1: string } = JSON.parse(
      results.data.choices[0].message.content,
    );
    const resultPrompts: string[] = [];
    if (result?.prompt_1) {
      resultPrompts.push(result.prompt_1);
    }
    return resultPrompts;
  }
}
