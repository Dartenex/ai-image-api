export interface GeneratedImageDto {
  query: string;
  url: string;
  source: 'midjourney' | 'leonardo';
  createdAt: string;
  isUpscaled: boolean;
}
