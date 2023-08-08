import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type CreateDatasetBodyParam = FromSchema<typeof schemas.CreateDataset.body>;
export type CreateDatasetResponse200 = FromSchema<(typeof schemas.CreateDataset.response)['200']>;
export type CreateGenerationBodyParam = FromSchema<typeof schemas.CreateGeneration.body>;
export type CreateGenerationResponse200 = FromSchema<
  (typeof schemas.CreateGeneration.response)['200']
>;
export type CreateModelBodyParam = FromSchema<typeof schemas.CreateModel.body>;
export type CreateModelResponse200 = FromSchema<(typeof schemas.CreateModel.response)['200']>;
export type CreateVariationUpscaleBodyParam = FromSchema<
  typeof schemas.CreateVariationUpscale.body
>;
export type CreateVariationUpscaleResponse200 = FromSchema<
  (typeof schemas.CreateVariationUpscale.response)['200']
>;
export type DeleteDatasetByIdMetadataParam = FromSchema<typeof schemas.DeleteDatasetById.metadata>;
export type DeleteDatasetByIdResponse200 = FromSchema<
  (typeof schemas.DeleteDatasetById.response)['200']
>;
export type DeleteGenerationByIdMetadataParam = FromSchema<
  typeof schemas.DeleteGenerationById.metadata
>;
export type DeleteGenerationByIdResponse200 = FromSchema<
  (typeof schemas.DeleteGenerationById.response)['200']
>;
export type DeleteInitImageByIdMetadataParam = FromSchema<
  typeof schemas.DeleteInitImageById.metadata
>;
export type DeleteInitImageByIdResponse200 = FromSchema<
  (typeof schemas.DeleteInitImageById.response)['200']
>;
export type DeleteModelByIdMetadataParam = FromSchema<typeof schemas.DeleteModelById.metadata>;
export type DeleteModelByIdResponse200 = FromSchema<
  (typeof schemas.DeleteModelById.response)['200']
>;
export type GetDatasetByIdMetadataParam = FromSchema<typeof schemas.GetDatasetById.metadata>;
export type GetDatasetByIdResponse200 = FromSchema<(typeof schemas.GetDatasetById.response)['200']>;
export type GetGenerationByIdMetadataParam = FromSchema<typeof schemas.GetGenerationById.metadata>;
export type GetGenerationByIdResponse200 = FromSchema<
  (typeof schemas.GetGenerationById.response)['200']
>;
export type GetGenerationsByUserIdMetadataParam = FromSchema<
  typeof schemas.GetGenerationsByUserId.metadata
>;
export type GetGenerationsByUserIdResponse200 = FromSchema<
  (typeof schemas.GetGenerationsByUserId.response)['200']
>;
export type GetInitImageByIdMetadataParam = FromSchema<typeof schemas.GetInitImageById.metadata>;
export type GetInitImageByIdResponse200 = FromSchema<
  (typeof schemas.GetInitImageById.response)['200']
>;
export type GetModelByIdMetadataParam = FromSchema<typeof schemas.GetModelById.metadata>;
export type GetModelByIdResponse200 = FromSchema<(typeof schemas.GetModelById.response)['200']>;
export type GetUserSelfResponse200 = FromSchema<(typeof schemas.GetUserSelf.response)['200']>;
export type GetVariationByIdMetadataParam = FromSchema<typeof schemas.GetVariationById.metadata>;
export type GetVariationByIdResponse200 = FromSchema<
  (typeof schemas.GetVariationById.response)['200']
>;
export type UploadDatasetImageBodyParam = FromSchema<typeof schemas.UploadDatasetImage.body>;
export type UploadDatasetImageFromGenBodyParam = FromSchema<
  typeof schemas.UploadDatasetImageFromGen.body
>;
export type UploadDatasetImageFromGenMetadataParam = FromSchema<
  typeof schemas.UploadDatasetImageFromGen.metadata
>;
export type UploadDatasetImageFromGenResponse200 = FromSchema<
  (typeof schemas.UploadDatasetImageFromGen.response)['200']
>;
export type UploadDatasetImageMetadataParam = FromSchema<
  typeof schemas.UploadDatasetImage.metadata
>;
export type UploadDatasetImageResponse200 = FromSchema<
  (typeof schemas.UploadDatasetImage.response)['200']
>;
export type UploadInitImageBodyParam = FromSchema<typeof schemas.UploadInitImage.body>;
export type UploadInitImageResponse200 = FromSchema<
  (typeof schemas.UploadInitImage.response)['200']
>;
