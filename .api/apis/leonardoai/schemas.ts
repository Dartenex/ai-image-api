const CreateDataset = {
  body: {
    properties: {
      name: { title: 'String', type: ['string', 'null'], description: 'The name of the dataset.' },
      description: {
        title: 'String',
        type: ['string', 'null'],
        description: 'A description for the dataset.',
      },
    },
    required: ['name'],
    type: 'object',
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        insert_datasets_one: {
          description: 'columns and relationships of "datasets"',
          properties: {
            id: {
              pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
              title: 'uuid',
              type: ['string', 'null'],
            },
          },
          title: 'datasets',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const CreateGeneration = {
  body: {
    properties: {
      prompt: {
        title: 'String',
        type: ['string', 'null'],
        description: 'The prompt used to generate images',
        default: 'An oil painting of a cat',
      },
      negative_prompt: {
        title: 'String',
        type: ['string', 'null'],
        description: 'The negative prompt used for the image generation',
      },
      modelId: {
        title: 'String',
        type: ['string', 'null'],
        description:
          'The model ID used for the image generation. If not provided uses sd_version to determine the version of Stable Diffusion to use.\n\n_Leonardo Creative_: 6bef9f1b-29cb-40c7-b9df-32b51c1f67d3\n_Leonardo Select_: cd2b2a15-9760-4174-a5ff-4d2925057376\n_Leonardo Signature_: 291be633-cb24-434f-898f-e662799936ad',
        default: '6bef9f1b-29cb-40c7-b9df-32b51c1f67d3',
      },
      sd_version: {
        type: ['string', 'null'],
        title: 'sd_versions',
        enum: ['v1_5', 'v2'],
        description:
          'The base version of stable diffusion to use if not using a custom model. v1_5 is 1.5, v2 is 2.1, if not specified it will default to v1_5.',
      },
      num_images: {
        title: 'Int',
        type: ['integer', 'null'],
        description:
          'The number of images to generate. Must be between 1 and 8. If either width or height is over 768, must be between 1 and 4.',
      },
      width: {
        title: 'Int',
        type: ['integer', 'null'],
        description: 'The width of the images. Must be between 32 and 1024 and be a multiple of 8.',
        default: 512,
      },
      height: {
        title: 'Int',
        type: ['integer', 'null'],
        description:
          'The height of the images. Must be between 32 and 1024 and be a multiple of 8.',
        default: 512,
      },
      num_inference_steps: {
        title: 'Int',
        type: ['integer', 'null'],
        description:
          'The number of inference steps to use for the generation. Must be between 30 and 60.',
      },
      guidance_scale: {
        title: 'Int',
        type: ['integer', 'null'],
        description:
          'How strongly the generation should reflect the prompt. 7 is recommended. Must be between 1 and 20.',
      },
      init_generation_image_id: {
        title: 'String',
        type: ['string', 'null'],
        description: 'The ID of an existing image to use in image2image.',
      },
      init_image_id: {
        title: 'String',
        type: ['string', 'null'],
        description: 'The ID of an Init Image to use in image2image.',
      },
      init_strength: {
        title: 'Float',
        type: ['number', 'null'],
        description:
          'How strongly the generated images should reflect the original image in image2image. Must be a float between 0.1 and 0.9.',
      },
      scheduler: {
        type: ['string', 'null'],
        title: 'sd_generation_schedulers',
        enum: ['KLMS', 'EULER_ANCESTRAL_DISCRETE', 'EULER_DISCRETE', 'DDIM', 'DPM_SOLVER', 'PNDM'],
        description:
          'The scheduler to generate images with. Defaults to EULER_DISCRETE if not specified.',
      },
      presetStyle: {
        type: ['string', 'null'],
        title: 'sd_generation_style',
        enum: ['LEONARDO', 'NONE'],
        description: 'The style to generate images with.',
      },
      tiling: {
        title: 'Boolean',
        type: ['boolean', 'null'],
        description: 'Whether the generated images should tile on all axis.',
      },
      public: {
        title: 'Boolean',
        type: ['boolean', 'null'],
        description: 'Whether the generated images should show in the community feed.',
      },
      promptMagic: {
        title: 'Boolean',
        type: ['boolean', 'null'],
        description: 'Enable to use Prompt Magic.',
      },
      controlNet: {
        title: 'Boolean',
        type: ['boolean', 'null'],
        description:
          'Enable to use ControlNet. Requires an init image to be provided. Requires a model based on SD v1.5',
      },
      controlNetType: {
        type: ['string', 'null'],
        title: 'controlnet_type',
        enum: ['POSE', 'CANNY', 'DEPTH'],
        description: 'The type of ControlNet to use.',
      },
    },
    type: 'object',
    required: ['prompt'],
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        sdGenerationJob: {
          properties: { generationId: { title: 'String', type: ['string', 'null'] } },
          title: 'SDGenerationOutput',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const CreateModel = {
  body: {
    properties: {
      name: { title: 'String', type: ['string', 'null'], description: 'The name of the model.' },
      description: {
        title: 'String',
        type: ['string', 'null'],
        description: 'The description of the model.',
      },
      datasetId: {
        title: 'String',
        type: ['string', 'null'],
        description: 'The ID of the dataset to train the model on.',
      },
      instance_prompt: {
        title: 'String',
        type: ['string', 'null'],
        description: 'The instance prompt to use during training.',
      },
      modelType: {
        type: ['string', 'null'],
        default: 'GENERAL',
        title: 'custom_model_type',
        enum: [
          'GENERAL',
          'BUILDINGS',
          'CHARACTERS',
          'ENVIRONMENTS',
          'FASHION',
          'ILLUSTRATIONS',
          'GAME_ITEMS',
          'GRAPHICAL_ELEMENTS',
          'PHOTOGRAPHY',
          'PIXEL_ART',
          'PRODUCT_DESIGN',
          'TEXTURES',
          'UI_ELEMENTS',
          'VECTOR',
        ],
        description: 'The category the most accurately reflects the model.\n\nDefault: `GENERAL`',
      },
      nsfw: {
        default: false,
        title: 'Boolean',
        type: ['boolean', 'null'],
        description: 'Whether or not the model is NSFW.',
      },
      resolution: {
        default: 512,
        title: 'Int',
        type: ['integer', 'null'],
        description: 'The resolution for training. Must be 512 or 768.',
      },
      sd_Version: {
        type: ['string', 'null'],
        title: 'sd_versions',
        enum: ['v1_5', 'v2'],
        description:
          'The base version of stable diffusion to use if not using a custom model. v1_5 is 1.5, v2 is 2.1, if not specified it will default to v1_5.',
      },
      strength: {
        type: ['string', 'null'],
        title: 'strength',
        enum: ['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH'],
        description:
          'When training using the PIXEL_ART model type, this influences the training strength.\n\nDefault: `MEDIUM`',
        default: 'MEDIUM',
      },
    },
    required: ['name', 'datasetId', 'instance_prompt'],
    type: 'object',
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        sdTrainingJob: {
          properties: { customModelId: { title: 'String', type: ['string', 'null'] } },
          title: 'SDTrainingOutput',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const CreateVariationUpscale = {
  body: {
    properties: { id: { title: 'String', type: ['string', 'null'] } },
    required: ['id'],
    type: 'object',
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        sdUpscaleJob: {
          properties: { id: { title: 'String', type: ['string', 'null'] } },
          title: 'SDUpscaleJobOutput',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const DeleteDatasetById = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The ID of the dataset to delete.',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        delete_datasets_by_pk: {
          description: 'columns and relationships of "datasets"',
          properties: {
            id: {
              pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
              title: 'uuid',
              type: ['string', 'null'],
            },
          },
          title: 'datasets',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const DeleteGenerationById = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The ID of the generation to delete.',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        delete_generations_by_pk: {
          description: 'columns and relationships of "generations"',
          properties: {
            id: {
              pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
              title: 'uuid',
              type: ['string', 'null'],
            },
          },
          title: 'generations',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const DeleteInitImageById = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: '_"id" is required_',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        delete_init_images_by_pk: {
          description: 'columns and relationships of "init_images"',
          properties: {
            id: {
              pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
              title: 'uuid',
              type: ['string', 'null'],
            },
          },
          title: 'init_images',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const DeleteModelById = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The ID of the model to delete.',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        delete_custom_models_by_pk: {
          description: 'columns and relationships of "custom_models"',
          properties: {
            id: {
              pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
              title: 'uuid',
              type: ['string', 'null'],
            },
          },
          title: 'custom_models',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetDatasetById = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The ID of the dataset to return.',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        datasets_by_pk: {
          description: 'columns and relationships of "datasets"',
          properties: {
            createdAt: { type: ['string', 'null'], title: 'timestamp' },
            dataset_images: {
              items: {
                description: 'columns and relationships of "dataset_images"',
                properties: {
                  createdAt: { type: ['string', 'null'], title: 'timestamp' },
                  id: {
                    pattern:
                      '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
                    title: 'uuid',
                    type: ['string', 'null'],
                  },
                  url: { title: 'String', type: ['string', 'null'] },
                },
                title: 'dataset_images',
                type: ['object', 'null'],
              },
              type: ['array', 'null'],
            },
            description: { title: 'String', type: ['string', 'null'] },
            id: {
              pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
              title: 'uuid',
              type: ['string', 'null'],
            },
            name: { title: 'String', type: ['string', 'null'] },
            updatedAt: { type: ['string', 'null'], title: 'timestamp' },
          },
          title: 'datasets',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetGenerationById = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The ID of the generation to return.',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        generations_by_pk: {
          description: 'columns and relationships of "generations"',
          properties: {
            generated_images: {
              items: {
                description: 'columns and relationships of "generated_images"',
                properties: {
                  generated_image_variation_generics: {
                    items: {
                      description:
                        'columns and relationships of "generated_image_variation_generic"',
                      properties: {
                        id: {
                          pattern:
                            '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
                          title: 'uuid',
                          type: ['string', 'null'],
                        },
                        status: {
                          type: ['string', 'null'],
                          title: 'job_status',
                          enum: ['PENDING', 'COMPLETE', 'FAILED'],
                          description:
                            'The status of the current task.\n\n`PENDING` `COMPLETE` `FAILED`',
                        },
                        transformType: {
                          type: ['string', 'null'],
                          title: 'VARIATION_TYPE',
                          enum: ['OUTPAINT', 'INPAINT', 'UPSCALE', 'UNZOOM', 'NOBG'],
                          description:
                            'The type of variation.\n\n`OUTPAINT` `INPAINT` `UPSCALE` `UNZOOM` `NOBG`',
                        },
                        url: { title: 'String', type: ['string', 'null'] },
                      },
                      title: 'generated_image_variation_generic',
                      type: ['object', 'null'],
                    },
                    type: ['array', 'null'],
                  },
                  id: {
                    pattern:
                      '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
                    title: 'uuid',
                    type: ['string', 'null'],
                  },
                  likeCount: { title: 'Int', type: ['integer', 'null'] },
                  nsfw: { title: 'Boolean', type: ['boolean', 'null'] },
                  url: { title: 'String', type: ['string', 'null'] },
                },
                title: 'generated_images',
                type: ['object', 'null'],
              },
              type: ['array', 'null'],
            },
            guidanceScale: { type: ['number', 'null'], title: 'float8' },
            id: {
              pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
              title: 'uuid',
              type: ['string', 'null'],
            },
            imageHeight: { title: 'Int', type: ['integer', 'null'] },
            imageWidth: { title: 'Int', type: ['integer', 'null'] },
            inferenceSteps: { title: 'Int', type: ['integer', 'null'] },
            initStrength: { type: ['number', 'null'], title: 'float8' },
            modelId: {
              pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
              title: 'uuid',
              type: ['string', 'null'],
            },
            negativePrompt: { title: 'String', type: ['string', 'null'] },
            presetStyle: {
              type: ['string', 'null'],
              title: 'sd_generation_style',
              enum: ['LEONARDO', 'NONE'],
              description: 'The style to generate images with.\n\n`LEONARDO` `NONE`',
            },
            prompt: { title: 'String', type: ['string', 'null'] },
            public: { title: 'Boolean', type: ['boolean', 'null'] },
            scheduler: {
              type: ['string', 'null'],
              title: 'sd_generation_schedulers',
              enum: [
                'KLMS',
                'EULER_ANCESTRAL_DISCRETE',
                'EULER_DISCRETE',
                'DDIM',
                'DPM_SOLVER',
                'PNDM',
              ],
              description:
                'The scheduler to generate images with. Defaults to EULER_DISCRETE if not specified.\n\n`KLMS` `EULER_ANCESTRAL_DISCRETE` `EULER_DISCRETE` `DDIM` `DPM_SOLVER` `PNDM`',
            },
            sdVersion: {
              type: ['string', 'null'],
              title: 'sd_versions',
              enum: ['v1_5', 'v2'],
              description:
                'The base version of stable diffusion to use if not using a custom model. v1_5 is 1.5, v2 is 2.1, if not specified it will default to v1_5.\n\n`v1_5` `v2`',
            },
            seed: { type: ['integer', 'null'], title: 'bigint' },
            status: {
              type: ['string', 'null'],
              title: 'job_status',
              enum: ['PENDING', 'COMPLETE', 'FAILED'],
              description: 'The status of the current task.\n\n`PENDING` `COMPLETE` `FAILED`',
            },
            createdAt: { type: ['string', 'null'], title: 'timestamp' },
          },
          title: 'generations',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetGenerationsByUserId = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          userId: {
            pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: ['userId'],
      },
      {
        type: 'object',
        properties: {
          offset: {
            default: 0,
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
          limit: {
            default: 10,
            type: 'integer',
            $schema: 'http://json-schema.org/draft-04/schema#',
          },
        },
        required: [],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        generations: {
          items: {
            description: 'columns and relationships of "generations"',
            properties: {
              generated_images: {
                items: {
                  description: 'columns and relationships of "generated_images"',
                  properties: {
                    generated_image_variation_generics: {
                      items: {
                        description:
                          'columns and relationships of "generated_image_variation_generic"',
                        properties: {
                          id: {
                            pattern:
                              '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
                            title: 'uuid',
                            type: ['string', 'null'],
                          },
                          status: {
                            type: ['string', 'null'],
                            title: 'job_status',
                            enum: ['PENDING', 'COMPLETE', 'FAILED'],
                            description:
                              'The status of the current task.\n\n`PENDING` `COMPLETE` `FAILED`',
                          },
                          transformType: {
                            type: ['string', 'null'],
                            title: 'VARIATION_TYPE',
                            enum: ['OUTPAINT', 'INPAINT', 'UPSCALE', 'UNZOOM', 'NOBG'],
                            description:
                              'The type of variation.\n\n`OUTPAINT` `INPAINT` `UPSCALE` `UNZOOM` `NOBG`',
                          },
                          url: { title: 'String', type: ['string', 'null'] },
                        },
                        title: 'generated_image_variation_generic',
                        type: ['object', 'null'],
                      },
                      type: ['array', 'null'],
                    },
                    id: {
                      pattern:
                        '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
                      title: 'uuid',
                      type: ['string', 'null'],
                    },
                    likeCount: { title: 'Int', type: ['integer', 'null'] },
                    nsfw: { title: 'Boolean', type: ['boolean', 'null'] },
                    url: { title: 'String', type: ['string', 'null'] },
                  },
                  title: 'generated_images',
                  type: ['object', 'null'],
                },
                type: ['array', 'null'],
              },
              guidanceScale: { type: ['number', 'null'], title: 'float8' },
              id: {
                pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
                title: 'uuid',
                type: ['string', 'null'],
              },
              imageHeight: { title: 'Int', type: ['integer', 'null'] },
              imageWidth: { title: 'Int', type: ['integer', 'null'] },
              inferenceSteps: { title: 'Int', type: ['integer', 'null'] },
              initStrength: { type: ['number', 'null'], title: 'float8' },
              modelId: {
                pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
                title: 'uuid',
                type: ['string', 'null'],
              },
              negativePrompt: { title: 'String', type: ['string', 'null'] },
              presetStyle: {
                type: ['string', 'null'],
                title: 'sd_generation_style',
                enum: ['LEONARDO', 'NONE'],
                description: 'The style to generate images with.\n\n`LEONARDO` `NONE`',
              },
              prompt: { title: 'String', type: ['string', 'null'] },
              public: { title: 'Boolean', type: ['boolean', 'null'] },
              scheduler: {
                type: ['string', 'null'],
                title: 'sd_generation_schedulers',
                enum: [
                  'KLMS',
                  'EULER_ANCESTRAL_DISCRETE',
                  'EULER_DISCRETE',
                  'DDIM',
                  'DPM_SOLVER',
                  'PNDM',
                ],
                description:
                  'The scheduler to generate images with. Defaults to EULER_DISCRETE if not specified.\n\n`KLMS` `EULER_ANCESTRAL_DISCRETE` `EULER_DISCRETE` `DDIM` `DPM_SOLVER` `PNDM`',
              },
              sdVersion: {
                type: ['string', 'null'],
                title: 'sd_versions',
                enum: ['v1_5', 'v2'],
                description:
                  'The base version of stable diffusion to use if not using a custom model. v1_5 is 1.5, v2 is 2.1, if not specified it will default to v1_5.\n\n`v1_5` `v2`',
              },
              seed: { type: ['integer', 'null'], title: 'bigint' },
              status: {
                type: ['string', 'null'],
                title: 'job_status',
                enum: ['PENDING', 'COMPLETE', 'FAILED'],
                description: 'The status of the current task.\n\n`PENDING` `COMPLETE` `FAILED`',
              },
              createdAt: { type: ['string', 'null'], title: 'timestamp' },
            },
            title: 'generations',
            type: ['object', 'null'],
          },
          type: ['array', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetInitImageById = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: '_"id" is required_',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        init_images_by_pk: {
          description: 'columns and relationships of "init_images"',
          properties: {
            createdAt: { type: ['string', 'null'], title: 'timestamp' },
            id: {
              pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
              title: 'uuid',
              type: ['string', 'null'],
            },
            url: { title: 'String', type: ['string', 'null'] },
          },
          title: 'init_images',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetModelById = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The ID of the custom model to return.',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        custom_models_by_pk: {
          description: 'columns and relationships of "custom_models"',
          properties: {
            createdAt: { type: ['string', 'null'], title: 'timestamp' },
            description: { title: 'String', type: ['string', 'null'] },
            id: {
              pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
              title: 'uuid',
              type: ['string', 'null'],
            },
            instancePrompt: { title: 'String', type: ['string', 'null'] },
            modelHeight: { title: 'Int', type: ['integer', 'null'] },
            modelWidth: { title: 'Int', type: ['integer', 'null'] },
            name: { title: 'String', type: ['string', 'null'] },
            public: { title: 'Boolean', type: ['boolean', 'null'] },
            sdVersion: {
              type: ['string', 'null'],
              title: 'sd_versions',
              enum: ['v1_5', 'v2'],
              description:
                'The base version of stable diffusion to use if not using a custom model. v1_5 is 1.5, v2 is 2.1, if not specified it will default to v1_5.\n\n`v1_5` `v2`',
            },
            status: {
              type: ['string', 'null'],
              title: 'job_status',
              enum: ['PENDING', 'COMPLETE', 'FAILED'],
              description: 'The status of the current task.\n\n`PENDING` `COMPLETE` `FAILED`',
            },
            type: {
              type: ['string', 'null'],
              default: 'GENERAL',
              title: 'custom_model_type',
              enum: [
                'GENERAL',
                'BUILDINGS',
                'CHARACTERS',
                'ENVIRONMENTS',
                'FASHION',
                'ILLUSTRATIONS',
                'GAME_ITEMS',
                'GRAPHICAL_ELEMENTS',
                'PHOTOGRAPHY',
                'PIXEL_ART',
                'PRODUCT_DESIGN',
                'TEXTURES',
                'UI_ELEMENTS',
                'VECTOR',
              ],
              description:
                'The category the most accurately reflects the model.\n\n`GENERAL` `BUILDINGS` `CHARACTERS` `ENVIRONMENTS` `FASHION` `ILLUSTRATIONS` `GAME_ITEMS` `GRAPHICAL_ELEMENTS` `PHOTOGRAPHY` `PIXEL_ART` `PRODUCT_DESIGN` `TEXTURES` `UI_ELEMENTS` `VECTOR`',
            },
            updatedAt: { type: ['string', 'null'], title: 'timestamp' },
          },
          title: 'custom_models',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetUserSelf = {
  response: {
    '200': {
      type: 'object',
      properties: {
        user_details: {
          items: {
            description: 'columns and relationships of "user_details"',
            properties: {
              showNsfw: { title: 'Boolean', type: ['boolean', 'null'] },
              user: {
                description: 'columns and relationships of "users"',
                properties: {
                  id: {
                    pattern:
                      '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
                    title: 'uuid',
                    type: ['string', 'null'],
                  },
                  username: { title: 'String', type: ['string', 'null'] },
                },
                title: 'users',
                type: ['object', 'null'],
              },
            },
            title: 'user_details',
            type: ['object', 'null'],
          },
          type: ['array', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetVariationById = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          id: {
            pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: '"id" is required',
          },
        },
        required: ['id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        generated_image_variation_generic: {
          items: {
            description: 'columns and relationships of "generated_image_variation_generic"',
            properties: {
              createdAt: { type: ['string', 'null'], title: 'timestamp' },
              id: {
                pattern: '[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}',
                title: 'uuid',
                type: ['string', 'null'],
              },
              status: {
                type: ['string', 'null'],
                title: 'job_status',
                enum: ['PENDING', 'COMPLETE', 'FAILED'],
                description: 'The status of the current task.\n\n`PENDING` `COMPLETE` `FAILED`',
              },
              transformType: {
                type: ['string', 'null'],
                title: 'VARIATION_TYPE',
                enum: ['OUTPAINT', 'INPAINT', 'UPSCALE', 'UNZOOM', 'NOBG'],
                description:
                  'The type of variation.\n\n`OUTPAINT` `INPAINT` `UPSCALE` `UNZOOM` `NOBG`',
              },
              url: { title: 'String', type: ['string', 'null'] },
            },
            title: 'generated_image_variation_generic',
            type: ['object', 'null'],
          },
          type: ['array', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const UploadDatasetImage = {
  body: {
    properties: {
      extension: {
        title: 'String',
        type: ['string', 'null'],
        description: 'Has to be png, jpg, jpeg, or webp.',
      },
    },
    required: ['extension'],
    type: 'object',
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          datasetId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: '_"datasetId" is required',
          },
        },
        required: ['datasetId'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        uploadDatasetImage: {
          properties: {
            fields: { title: 'String', type: ['string', 'null'] },
            id: { title: 'String', type: ['string', 'null'] },
            key: { title: 'String', type: ['string', 'null'] },
            url: { title: 'String', type: ['string', 'null'] },
          },
          title: 'DatasetUploadOutput',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const UploadDatasetImageFromGen = {
  body: {
    properties: {
      generatedImageId: {
        title: 'String',
        type: ['string', 'null'],
        description: 'The ID of the image to upload to the dataset.',
      },
    },
    required: ['generatedImageId'],
    type: 'object',
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          datasetId: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: 'The ID of the dataset to upload the image to.',
          },
        },
        required: ['datasetId'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        uploadDatasetImageFromGen: {
          properties: { id: { title: 'String', type: ['string', 'null'] } },
          title: 'DatasetGenUploadOutput',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const UploadInitImage = {
  body: {
    properties: {
      extension: {
        title: 'String',
        type: ['string', 'null'],
        description: 'Has to be png, jpg, jpeg, or webp.',
      },
    },
    required: ['extension'],
    type: 'object',
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        uploadInitImage: {
          properties: {
            __typename: { title: 'String', type: ['string', 'null'] },
            fields: { title: 'String', type: ['string', 'null'] },
            id: { title: 'String', type: ['string', 'null'] },
            key: { title: 'String', type: ['string', 'null'] },
            url: { title: 'String', type: ['string', 'null'] },
          },
          title: 'InitImageUploadOutput',
          type: ['object', 'null'],
        },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
export {
  CreateDataset,
  CreateGeneration,
  CreateModel,
  CreateVariationUpscale,
  DeleteDatasetById,
  DeleteGenerationById,
  DeleteInitImageById,
  DeleteModelById,
  GetDatasetById,
  GetGenerationById,
  GetGenerationsByUserId,
  GetInitImageById,
  GetModelById,
  GetUserSelf,
  GetVariationById,
  UploadDatasetImage,
  UploadDatasetImageFromGen,
  UploadInitImage,
};
