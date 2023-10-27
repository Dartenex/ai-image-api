import { Injectable } from '@nestjs/common';
import * as sdk from 'api';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { UpscaleResDto } from '@generator/drivers/picsart/upscale.res.dto';

@Injectable()
export class PicsartService {
  private sdk: any;
  private apiKey: string;

  public constructor(private readonly config: ConfigService) {
    const apiKey = this.config.get<string>('PICSART_API_KEY');
    if (!apiKey) {
      throw Error('Api key not set!');
    }
    this.sdk = sdk('@picsartfordevelopers/v1.0#11wm1w0lnsym3a6');
    this.sdk.auth(apiKey);
    this.apiKey = apiKey;
  }

  public async upscale(imgUrl: string): Promise<UpscaleResDto> {
    const result = await axios.post(
      'https://api.picsart.io/tools/1.0/upscale',
      {
        upscale_factor: 'x4',
        format: 'PNG',
        image_url: imgUrl,
      },
      {
        headers: {
          'X-Picsart-API-Key': this.apiKey,
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      },
    );
    return result.data.data;
  }
}
