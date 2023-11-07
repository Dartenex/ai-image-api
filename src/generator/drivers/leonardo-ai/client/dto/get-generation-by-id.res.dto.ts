export interface GetGenerationByIdResDto {
  generations_by_pk: {
    status: string;
    generated_images: any[];
  };
}
