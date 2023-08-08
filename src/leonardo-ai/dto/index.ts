export interface LeonardoImage {
  url: string;
  nsfw: boolean;
  id: string;
  likeCount: number;
  generated_image_variation_generics: any[];
}

export interface UpscaleImage {
  url: string;
  status: string;
  id: string;
  createdAt: string;
  transformType: string;
}
