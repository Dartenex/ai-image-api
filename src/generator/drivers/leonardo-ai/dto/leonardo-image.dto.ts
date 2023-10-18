type LeonardoImageStatus = 'PENDING' | 'COMPLETE' | 'FAILED';
export interface LeonardoImage {
  url: string;
  nsfw: boolean;
  id: string;
  likeCount: number;
  generated_image_variation_generics: LeonardoImageVariationGenericsItem[];
}

interface LeonardoImageVariationGenericsItem {
  url: string;
  id: string;
  status: LeonardoImageStatus;
  transformType: string;
}
