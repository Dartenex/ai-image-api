import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'leonardoai/v1.0.0 (api/6.1.0)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * This endpoint will return your user information, including your user ID.
   *
   * @summary Get user information
   */
  getUserSelf(): Promise<FetchResponse<200, types.GetUserSelfResponse200>> {
    return this.core.fetch('/me', 'get');
  }

  /**
   * This endpoint will generate images
   *
   * @summary Create a Generation of Images
   */
  createGeneration(
    body: types.CreateGenerationBodyParam
  ): Promise<FetchResponse<200, types.CreateGenerationResponse200>> {
    return this.core.fetch('/generations', 'post', body);
  }

  /**
   * This endpoint will provide information about a specific generation
   *
   * @summary Get a Single Generation
   */
  getGenerationById(
    metadata: types.GetGenerationByIdMetadataParam
  ): Promise<FetchResponse<200, types.GetGenerationByIdResponse200>> {
    return this.core.fetch('/generations/{id}', 'get', metadata);
  }

  /**
   * This endpoint deletes a specific generation
   *
   * @summary Delete a Single Generation
   */
  deleteGenerationById(
    metadata: types.DeleteGenerationByIdMetadataParam
  ): Promise<FetchResponse<200, types.DeleteGenerationByIdResponse200>> {
    return this.core.fetch('/generations/{id}', 'delete', metadata);
  }

  /**
   * This endpoint returns all generations by a specific user
   *
   * @summary Get generations by user ID
   */
  getGenerationsByUserId(
    metadata: types.GetGenerationsByUserIdMetadataParam
  ): Promise<FetchResponse<200, types.GetGenerationsByUserIdResponse200>> {
    return this.core.fetch('/generations/user/{userId}', 'get', metadata);
  }

  /**
   * This endpoint returns presigned details to upload an init image to S3
   *
   * @summary Upload init image
   */
  uploadInitImage(
    body: types.UploadInitImageBodyParam
  ): Promise<FetchResponse<200, types.UploadInitImageResponse200>> {
    return this.core.fetch('/init-image', 'post', body);
  }

  /**
   * This endpoint will return a single init image
   *
   * @summary Get single init image
   */
  getInitImageById(
    metadata: types.GetInitImageByIdMetadataParam
  ): Promise<FetchResponse<200, types.GetInitImageByIdResponse200>> {
    return this.core.fetch('/init-image/{id}', 'get', metadata);
  }

  /**
   * This endpoint deletes an init image
   *
   * @summary Delete init image
   */
  deleteInitImageById(
    metadata: types.DeleteInitImageByIdMetadataParam
  ): Promise<FetchResponse<200, types.DeleteInitImageByIdResponse200>> {
    return this.core.fetch('/init-image/{id}', 'delete', metadata);
  }

  /**
   * This endpoint will create an upscale for the provided image ID
   *
   * @summary Create upscale
   */
  createVariationUpscale(
    body: types.CreateVariationUpscaleBodyParam
  ): Promise<FetchResponse<200, types.CreateVariationUpscaleResponse200>> {
    return this.core.fetch('/variations/upscale', 'post', body);
  }

  /**
   * This endpoint will get the variation by ID
   *
   * @summary Get variation by ID
   */
  getVariationById(
    metadata: types.GetVariationByIdMetadataParam
  ): Promise<FetchResponse<200, types.GetVariationByIdResponse200>> {
    return this.core.fetch('/variations/{id}', 'get', metadata);
  }

  /**
   * This endpoint creates a new dataset
   *
   * @summary Create a Dataset
   */
  createDataset(
    body: types.CreateDatasetBodyParam
  ): Promise<FetchResponse<200, types.CreateDatasetResponse200>> {
    return this.core.fetch('/datasets', 'post', body);
  }

  /**
   * This endpoint gets the specific dataset
   *
   * @summary Get a Single Dataset by ID
   */
  getDatasetById(
    metadata: types.GetDatasetByIdMetadataParam
  ): Promise<FetchResponse<200, types.GetDatasetByIdResponse200>> {
    return this.core.fetch('/datasets/{id}', 'get', metadata);
  }

  /**
   * This endpoint deletes the specific dataset
   *
   * @summary Delete a Single Dataset by ID
   */
  deleteDatasetById(
    metadata: types.DeleteDatasetByIdMetadataParam
  ): Promise<FetchResponse<200, types.DeleteDatasetByIdResponse200>> {
    return this.core.fetch('/datasets/{id}', 'delete', metadata);
  }

  /**
   * This endpoint returns presigned details to upload a dataset image to S3
   *
   * @summary Upload dataset image
   */
  uploadDatasetImage(
    body: types.UploadDatasetImageBodyParam,
    metadata: types.UploadDatasetImageMetadataParam
  ): Promise<FetchResponse<200, types.UploadDatasetImageResponse200>> {
    return this.core.fetch('/datasets/{datasetId}/upload', 'post', body, metadata);
  }

  /**
   * This endpoint will upload a previously generated image to the dataset
   *
   * @summary Upload a Single Generated Image to a Dataset
   */
  uploadDatasetImageFromGen(
    body: types.UploadDatasetImageFromGenBodyParam,
    metadata: types.UploadDatasetImageFromGenMetadataParam
  ): Promise<FetchResponse<200, types.UploadDatasetImageFromGenResponse200>> {
    return this.core.fetch('/datasets/{datasetId}/upload/gen', 'post', body, metadata);
  }

  /**
   * This endpoint will train a new custom model
   *
   * @summary Train a Custom Model
   */
  createModel(
    body: types.CreateModelBodyParam
  ): Promise<FetchResponse<200, types.CreateModelResponse200>> {
    return this.core.fetch('/models', 'post', body);
  }

  /**
   * This endpoint gets the specific custom model
   *
   * @summary Get a Single Custom Model by ID
   */
  getModelById(
    metadata: types.GetModelByIdMetadataParam
  ): Promise<FetchResponse<200, types.GetModelByIdResponse200>> {
    return this.core.fetch('/models/{id}', 'get', metadata);
  }

  /**
   * This endpoint will delete a specific custom model
   *
   * @summary Delete a Single Custom Model by ID
   */
  deleteModelById(
    metadata: types.DeleteModelByIdMetadataParam
  ): Promise<FetchResponse<200, types.DeleteModelByIdResponse200>> {
    return this.core.fetch('/models/{id}', 'delete', metadata);
  }
}

const createSDK = (() => {
  return new SDK();
})();
export default createSDK;

export type {
  CreateDatasetBodyParam,
  CreateDatasetResponse200,
  CreateGenerationBodyParam,
  CreateGenerationResponse200,
  CreateModelBodyParam,
  CreateModelResponse200,
  CreateVariationUpscaleBodyParam,
  CreateVariationUpscaleResponse200,
  DeleteDatasetByIdMetadataParam,
  DeleteDatasetByIdResponse200,
  DeleteGenerationByIdMetadataParam,
  DeleteGenerationByIdResponse200,
  DeleteInitImageByIdMetadataParam,
  DeleteInitImageByIdResponse200,
  DeleteModelByIdMetadataParam,
  DeleteModelByIdResponse200,
  GetDatasetByIdMetadataParam,
  GetDatasetByIdResponse200,
  GetGenerationByIdMetadataParam,
  GetGenerationByIdResponse200,
  GetGenerationsByUserIdMetadataParam,
  GetGenerationsByUserIdResponse200,
  GetInitImageByIdMetadataParam,
  GetInitImageByIdResponse200,
  GetModelByIdMetadataParam,
  GetModelByIdResponse200,
  GetUserSelfResponse200,
  GetVariationByIdMetadataParam,
  GetVariationByIdResponse200,
  UploadDatasetImageBodyParam,
  UploadDatasetImageFromGenBodyParam,
  UploadDatasetImageFromGenMetadataParam,
  UploadDatasetImageFromGenResponse200,
  UploadDatasetImageMetadataParam,
  UploadDatasetImageResponse200,
  UploadInitImageBodyParam,
  UploadInitImageResponse200,
} from './types';
