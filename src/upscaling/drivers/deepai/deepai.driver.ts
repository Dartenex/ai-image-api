import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UpscaleResDto, UpscalingDriverInterface } from '@upscaling/contracts';
import { delayCallback } from '@utils';
import axios from 'axios';

@Injectable()
export class DeepaiDriver implements UpscalingDriverInterface {
  private readonly apiKey: string;
  private readonly logger: Logger = new Logger(DeepaiDriver.name);

  public constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get<string>('DEEPAI_API_KEY');
    if (!apiKey) {
      throw Error('Api key not set!');
    }
    this.apiKey = apiKey;
  }

  async upscale(imageUrl: string): Promise<UpscaleResDto> {
    const url = 'https://api.deepai.org/api/torch-srgan';

    let attempts = 3;
    let success = false;
    let resultUrl = '';
    do {
      try {
        await delayCallback(2500, async () => {
          const result = await axios.post(
            url,
            {
              image: imageUrl,
            },
            {
              headers: {
                'api-key': this.apiKey,
                accept: 'application/json',
                'content-type': 'multipart/form-data',
              },
            },
          );
          const data = result.data;
          resultUrl = data.output_url;
          success = true;
        });
      } catch (e) {
        console.log(e);
        this.logger.error('Upscaling failed');
        this.logger.error(e);
        attempts -= 1;
        success = false;
      }
    } while (!success && attempts !== 0);
    return {
      url: resultUrl,
    };
  }
}
