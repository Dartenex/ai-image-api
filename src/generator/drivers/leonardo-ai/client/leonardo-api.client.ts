import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  CreateGenerationResDto,
  GetGenerationByIdResDto,
} from '@generator/drivers/leonardo-ai/client/dto';

export class LeonardoApiClient {
  private apiKey: string;
  private client: AxiosInstance;
  private url: string;

  public constructor() {
    this.url = 'https://cloud.leonardo.ai/api/rest/v1';
    this.client = axios.create({
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      baseURL: this.url,
    });
  }

  public setApikey(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getHeaders() {
    return {
      authorization: `Bearer ${this.apiKey}`,
    };
  }

  public async createGeneration(
    config: object,
  ): Promise<CreateGenerationResDto> {
    const response: AxiosResponse = await this.client.post(
      '/generations',
      {
        ...config,
      },
      {
        headers: this.getHeaders(),
      },
    );
    return response.data;
  }

  public async getGenerationById(id: string): Promise<GetGenerationByIdResDto> {
    const response: AxiosResponse = await this.client.get(
      `/generations/${id}`,
      {
        headers: this.getHeaders(),
      },
    );
    return response.data;
  }
}
