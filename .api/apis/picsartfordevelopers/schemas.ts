const GetBalance = {
  response: {
    '200': {
      type: 'object',
      properties: { credits: { type: 'integer' } },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetEffects = {
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: { name: { type: 'string' }, preview: { type: 'string' } },
          },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const GetUpscaleUltraTransactionId = {
  metadata: {
    allOf: [
      {
        type: 'object',
        properties: {
          transaction_id: {
            type: 'string',
            $schema: 'http://json-schema.org/draft-04/schema#',
            description: "The ID returned from the POST method when it's done asynchronously.",
          },
        },
        required: ['transaction_id'],
      },
    ],
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '202': {
      type: 'object',
      properties: { transaction_id: { type: 'string' }, status: { type: 'string' } },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostAdjust = {
  body: {
    type: 'object',
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
      image_id: {
        type: 'string',
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.)',
      },
      brightness: {
        type: 'integer',
        minimum: -100,
        maximum: 100,
        description: 'Enter an integer value from -100 to +100.',
        default: 0,
      },
      contrast: {
        type: 'integer',
        minimum: -100,
        maximum: 100,
        description: 'Enter an integer value from -100 to +100.',
        default: 0,
      },
      clarity: {
        type: 'integer',
        minimum: -100,
        maximum: 100,
        description: 'Enter an integer value from -100 to +100.',
        default: 0,
      },
      saturation: {
        type: 'integer',
        minimum: -100,
        maximum: 100,
        description: 'Enter an integer value from -100 to +100.',
        default: 0,
      },
      hue: {
        type: 'integer',
        minimum: -100,
        maximum: 100,
        description: 'Enter an integer value from -100 to +100.',
        default: 0,
      },
      shadows: {
        type: 'integer',
        minimum: -100,
        maximum: 100,
        description: 'Enter an integer value from -100 to +100.',
        default: 0,
      },
      highlights: {
        type: 'integer',
        minimum: -100,
        maximum: 100,
        description: 'Enter an integer value from -100 to +100.',
        default: 0,
      },
      temperature: {
        type: 'integer',
        minimum: -100,
        maximum: 100,
        description: 'Enter an integer value from -100 to +100.',
        default: 0,
      },
      sharpen: {
        type: 'integer',
        minimum: 0,
        maximum: 100,
        description: 'Enter an integer value from 0 to +100.',
        default: 0,
      },
      noise: {
        type: 'integer',
        minimum: 0,
        maximum: 100,
        description: 'Enter an integer value from 0 to +100.',
        default: 0,
      },
      vignette: {
        type: 'integer',
        minimum: 0,
        maximum: 100,
        description: 'Enter an integer value from 0 to +100.',
        default: 0,
      },
      format: {
        type: 'string',
        default: 'JPG',
        enum: ['JPG', 'PNG', 'WEBP'],
        description:
          'Optionally select one of the image formats (JPG is default). Options are as follows:\n  * JPG\n  * PNG\n  * WEBP\n\nDefault: `JPG`',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostBackgroundTexture = {
  body: {
    type: 'object',
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
      image_id: {
        type: 'string',
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.)',
      },
      format: {
        type: 'string',
        default: 'JPG',
        enum: ['JPG', 'PNG', 'WEBP'],
        description:
          'Optionally select one of the image formats (JPG is chosen if left blank). Options are as follows:\n  * JPG\n  * PNG\n  * WEBP\n\nDefault: `JPG`',
      },
      width: {
        type: 'integer',
        description: 'Specify the width of the output image in pixels. The default is 1024.',
        default: 1024,
      },
      height: {
        type: 'integer',
        description: 'Specify the width of the output image in pixels. The default is 1024.',
        default: 1024,
      },
      offset_x: {
        type: 'integer',
        description:
          'Specify the pattern location, with x(width). Calculation starts from the center of the image. Default is 0.',
        default: 0,
      },
      offset_y: {
        type: 'integer',
        description:
          'Specify the pattern location  with y(height). Calculation starts from the center of the image. Default is 0.',
        default: 0,
      },
      pattern: {
        type: 'string',
        enum: ['hex', 'mirror', 'diamond', 'hex2', 'tile'],
        default: 'hex',
        description:
          'Choose a pattern for the background texture. Default is hex.\n\nDefault: `hex`',
      },
      rotate: {
        type: 'integer',
        minimum: -180,
        maximum: 180,
        default: 0,
        description:
          'Enter an integer value to rotate the texture pattern from -180 to +180. Default is 0.',
      },
      scale: {
        type: 'number',
        format: 'float',
        default: 1,
        description:
          'Enter a floating point number between 0.0 - 10.0 to scale the background texture. Default is 1.0.',
        minimum: -3.402823669209385e38,
        maximum: 3.402823669209385e38,
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostEdit = {
  body: {
    type: 'object',
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
      image_id: {
        type: 'string',
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.)',
      },
      format: {
        type: 'string',
        default: 'JPG',
        enum: ['JPG', 'PNG', 'WEBP'],
        description:
          'Optionally select one of the image formats (JPG is chosen if left blank). Options are as follows:\n  * JPG\n  * PNG\n  * WEBP\n\nDefault: `JPG`',
      },
      mode: {
        type: ['string', 'null'],
        enum: ['resize', 'crop'],
        description:
          'For *crop* mode, the outcome image will be center-cropped with the given size (width, height). For the *resize* mode, the smallest size will be fitted to preserve the original proportion of the image. When the outcome size is not provided with width and height, no cropping or resizing will be applied (see alternative options such as rotate, flip and perspective).',
      },
      size: {
        type: ['integer', 'null'],
        description:
          'When defined, this parameter overrides and applies the value for both width and height.',
      },
      width: {
        type: ['integer', 'null'],
        description:
          'Width of outcome image. If the provided width is larger than the original width of the file, the original size of the image will be selected. When crop size is defined, but the x,y starting position is not provided, the crop will be a center-crop (i.e., equally cutting from each side).',
      },
      height: {
        type: ['integer', 'null'],
        description:
          'Height of outcome image. If the provided height is larger than the original width of the file, the original size of the image will be selected. When crop size is defined, but the x,y starting position is not provided, the crop will be a center-crop (i.e, equally cutting from each side).',
      },
      flip: {
        type: 'string',
        enum: ['horizontal', 'vertical'],
        description: 'Choose a way to flip the image.',
      },
      rotate: {
        type: 'number',
        format: 'float',
        default: 0,
        minimum: -180,
        maximum: 180,
        description: 'Enter a float value to rotate the image from -180 to +180. Default is 0.',
      },
      perspective_horizontal: {
        type: 'integer',
        default: 0,
        minimum: -45,
        maximum: 45,
        description: 'The horizontal perspective after edits.',
      },
      perspective_vertical: {
        type: 'integer',
        default: 0,
        minimum: -45,
        maximum: 45,
        description: 'The vertical perspective after edits.',
      },
      quality: {
        type: 'integer',
        default: 90,
        minimum: 10,
        maximum: 100,
        description:
          'This refers to the level of accuracy of the image processing. The greater the quality (i.e., the larger the number), the larger the image file size. The default value is 90, which is a good compromise between quality and file size.',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostEffects = {
  body: {
    type: 'object',
    required: ['effect_name'],
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
      image_id: {
        type: 'string',
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.)',
      },
      effect_name: {
        type: 'string',
        enum: [
          'apr1',
          'apr2',
          'apr3',
          'brnz1',
          'brnz2',
          'brnz3',
          'cyber1',
          'cyber2',
          'dodger',
          'food1',
          'food2',
          'icy1',
          'icy2',
          'icy3',
          'mnch1',
          'mnch2',
          'mnch3',
          'noise',
          'nature1',
          'nature2',
          'ntrl1',
          'ntrl2',
          'saturation',
          'sft1',
          'sft2',
          'sft3',
          'sft4',
          'shadow1',
          'shadow2',
          'sketcher1',
          'sketcher2',
          'tl1',
          'tl2',
          'urban1',
          'urban2',
          'water1',
          'water2',
          'pixelize',
          'popart',
        ],
        description:
          'Choose an effect from the dropdown menu. The list of effects are as follows\n  * apr1\n  * apr2\n  * apr3\n  * brnz1\n  * brnz2\n  * brnz3\n  * cyber1\n  * cyber2\n  * dodger\n  * food1\n  * food2\n  * icy1\n  * icy2\n  * icy3\n  * mnch1\n  * mnch2\n  * mnch3\n  * noise\n  * nature1\n  * nature2\n  * ntrl1\n  * ntrl2\n  * saturation\n  * sft1\n  * sft2\n  * sft3\n  * sft4\n  * shadow1\n  * shadow2\n  * sketcher1\n  * sketcher2\n  * tl1\n  * tl2\n  * urban1\n  * urban2\n  * water1\n  * water2\n  * pixelize\n  * popart\n',
      },
      format: {
        type: 'string',
        default: 'JPG',
        enum: ['JPG', 'PNG', 'WEBP'],
        description:
          'Optionally select one of the output image formats (JPG is chosen if left blank). Options are as follows:\n  * JPG\n  * PNG\n  * WEBP\n\nDefault: `JPG`',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostEffectsPreviews = {
  body: {
    type: 'object',
    required: ['effect_names'],
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
      image_id: {
        type: 'string',
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.)',
      },
      effect_names: {
        description:
          'Select up to 10 effects to preview by holding down the Ctrl key. The list of effects are as follows:\n  * icy1\n  * icy2\n  * icy3\n  * brnz1\n  * brnz2\n  * brnz3\n  * mnch1\n  * mnch2\n  * mnch3\n  * noise\n  * saturation\n  * cyber1\n  * cyber2\n  * food1\n  * food2\n  * nature1\n  * nature2\n  * urban1\n  * urban2\n  * water1\n  * water2\n  * shadow1\n  * shadow2\n  * sketcher1\n  * sketcher2\n',
        type: 'array',
        items: {
          type: 'string',
          enum: [
            'icy1',
            'icy2',
            'icy3',
            'brnz1',
            'brnz2',
            'brnz3',
            'mnch1',
            'mnch2',
            'mnch3',
            'noise',
            'saturation',
            'cyber1',
            'cyber2',
            'food1',
            'food2',
            'nature1',
            'nature2',
            'urban1',
            'urban2',
            'water1',
            'water2',
            'shadow1',
            'shadow2',
            'sketcher1',
            'sketcher2',
          ],
        },
      },
      preview_size: {
        type: 'integer',
        description:
          'Enter the width of the preview image. The max value is 240px. The default is 120px.',
        default: '120px',
      },
      format: {
        type: 'string',
        default: 'JPG',
        enum: ['JPG', 'PNG', 'WEBP'],
        description:
          'Optionally select one of the image formats (JPG is default). Options are as follows:\n  * JPG\n  * PNG\n  * WEBP\n\nDefault: `JPG`',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostEnhanceFace = {
  body: {
    type: 'object',
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
      image_id: {
        type: 'string',
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.)',
      },
      format: {
        type: 'string',
        default: 'JPG',
        enum: ['JPG', 'PNG', 'WEBP'],
        description:
          'Optionally select one of the image formats (JPG is the default). Options are as follows:\n  * JPG\n  * PNG\n  * WEBP\n\nDefault: `JPG`',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostMasks = {
  body: {
    type: 'object',
    required: ['mask'],
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
      image_id: {
        type: 'string',
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.)',
      },
      format: {
        type: 'string',
        default: 'JPG',
        enum: ['JPG', 'PNG', 'WEBP'],
        description:
          'Optionally select one of the image formats (JPG is default). Options are as follows:\n  * JPG\n  * PNG\n  * WEBP\n\nDefault: `JPG`',
      },
      blend: {
        type: 'string',
        enum: ['normal', 'screen', 'overlay', 'multiply', 'darken', 'lighten', 'add'],
        default: 'screen',
        description:
          'Select one of the appearance types from the dropdown list (screen is chosen if left blank). The options are as follows:\n  * normal\n  * screen\n  * overlay\n  * multiply\n  * darken\n  * lighten\n  * add\n\nDefault: `screen`',
      },
      mask: {
        type: 'string',
        enum: [
          'lace1',
          'lace2',
          'lace3',
          'lace4',
          'shdw2',
          'shdw17',
          'rpl3',
          'rpl5',
          'prsm3',
          'prsm9',
          'prsm10',
        ],
        description:
          'Select one of the mask types from the dropdown list. The options are as follows:\n  * lace1\n  * lace2\n  * lace3\n  * lace4\n  * shdw2\n  * shdw17\n  * rpl3\n  * rpl5\n  * prsm3\n  * prsm9\n  * prsm10\n',
      },
      opacity: {
        type: 'integer',
        minimum: 0,
        maximum: 100,
        default: 100,
        description:
          'Enter an integer value from 0 to +100. The larger the number, the greater the opacity. Default is 100.',
      },
      hue: {
        type: 'integer',
        minimum: -180,
        maximum: 180,
        default: 0,
        description: 'Enter an integer value from -180 to +180. Default is 0.',
      },
      mask_flip: {
        type: 'string',
        enum: ['left', 'right', 'mirror horizontal', 'mirror vertical', 'turnaround'],
        description:
          'Choose a mask flip option. The choices are as follows.\n  * left\n  * right\n  * mirror horizontal\n  * mirror vertical\n  * turnaround\n',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostMasksPreviews = {
  body: {
    type: 'object',
    required: ['mask'],
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
      image_id: {
        type: 'string',
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.)',
      },
      format: {
        type: 'string',
        default: 'JPG',
        enum: ['JPG', 'PNG', 'WEBP'],
        description:
          'Optionally select one of the image formats (JPG is chosen if left blank). Options are as follows:\n  * JPG\n  * PNG\n  * WEBP\n\nDefault: `JPG`',
      },
      blend: {
        type: 'string',
        enum: ['normal', 'screen', 'overlay', 'multiply', 'darken', 'lighten', 'add'],
        default: 'screen',
        description:
          'Select one of the appearance types from the dropdown list (it will be _screen_ if left blank). The options are as follows.\n  * normal\n  * screen\n  * overlay\n  * multiply\n  * darken\n  * lighten\n  * add\n\nDefault: `screen`',
      },
      mask: {
        type: 'array',
        description:
          'Select up to 10 mask types from the list by holding down Ctrl. The options are as follows\n  * lace1\n  * lace4\n  * shdw2\n  * shdw17\n  * fold5\n  * fold9\n  * rpl3\n  * rpl5\n  * prsm3\n  * prsm9\n  * prsm10\n',
        items: {
          type: 'string',
          enum: [
            'lace1',
            'lace2',
            'lace3',
            'lace4',
            'shdw2',
            'shdw17',
            'rpl3',
            'rpl5',
            'prsm3',
            'prsm9',
            'prsm10',
          ],
        },
      },
      opacity: {
        type: 'integer',
        minimum: 0,
        maximum: 100,
        default: 100,
        description:
          'Enter an integer value from 0 to +100. The larger the number, the greater the opacity.',
      },
      hue: {
        type: 'integer',
        minimum: -180,
        maximum: 180,
        default: 0,
        description: 'Enter an integer value from -180 to +180.',
      },
      mask_flip: {
        type: 'string',
        enum: ['left', 'right', 'mirror horizontal', 'mirror vertical', 'turnaround'],
        description:
          'Choose a mask flip option. The choices are as follows.\n  * left\n  * right\n  * mirror horizontal\n  * mirror vertical\n  * turnaround\n',
      },
      preview_size: {
        type: 'integer',
        default: 120,
        description:
          "Enter the max size for the width or height of the preview image. The max value is 240px. If left blank it's 120px.",
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostRemovebg = {
  body: {
    type: 'object',
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
      image_id: {
        type: 'string',
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.)',
      },
      output_type: {
        type: 'string',
        default: 'cutout',
        enum: ['mask', 'cutout'],
        description:
          'Select one of the two output options. If you submit a photo of a person, **cutout** returns the person as a sticker while **mask** returns a mask photo of the person.\n\nDefault: `cutout`',
      },
      bg_image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.) This only has an effect when output=cutout.',
        type: ['string', 'null'],
        format: 'binary',
      },
      bg_image_url: {
        type: ['string', 'null'],
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.) If this has a value, the output value is dismissed.',
      },
      bg_image_id: {
        type: ['string', 'null'],
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.) See /upload method. If this has a value, the output value is dismissed.',
      },
      bg_color: {
        type: ['string', 'null'],
        description:
          'Can be a hexcolor code (e.g., #82d5fa, #fff) or a color name (e.g., blue). For semi-transparency, 4-/8-digit hexcodes are also supported (e.g., #18d4ff87). (If this parameter is present, the other bg_ parameters must be empty).\n',
      },
      bg_blur: {
        type: 'integer',
        default: 0,
        minimum: 0,
        maximum: 100,
        description: 'Enter an integer value from 0 to +100.',
      },
      bg_width: {
        type: 'integer',
        description:
          'Size, in pixels, for the width. If left blank, the background is left at its original width.\n',
      },
      bg_height: {
        type: 'integer',
        description:
          'Size, in pixels, for the height. If left blank, the background is left at its original height.\n',
      },
      scale: {
        type: 'string',
        enum: ['fit', 'fill'],
        default: 'fit',
        description:
          'Fit is where the longer side (width/height) fits the background. Fill is where the shorter side fits the background. Fit is the default.\n\nDefault: `fit`',
      },
      format: {
        type: 'string',
        enum: ['JPG', 'PNG', 'WEBP'],
        default: 'PNG',
        description:
          'Optionally select one of the image formats (PNG is chosen if left blank). Options are as follows:\n  * JPG\n  * PNG\n  * WEBP\n\nDefault: `PNG`',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostStyletransfer = {
  body: {
    type: 'object',
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
      image_id: {
        type: 'string',
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.)',
      },
      level: {
        type: 'string',
        default: 'l1',
        enum: ['l1', 'l2', 'l3', 'l4', 'l5'],
        description:
          'Select a level from the dropdown menu. Smaller numbers preserve more from the original image, bigger numbers make the original image look closer to the reference image. The level options are as follows.\n  * l1\n  * l2\n  * l3\n  * l4\n  * l5\n\nDefault: `l1`',
      },
      format: {
        type: 'string',
        default: 'JPG',
        enum: ['JPG', 'PNG', 'WEBP'],
        description:
          'Optionally select one of the image formats (JPG is chosen if left blank). Options are as follows:\n  * JPG\n  * PNG\n  * WEBP\n\nDefault: `JPG`',
      },
      reference_image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      reference_image_id: {
        type: 'string',
        description: 'Enter the Picsart image ID if you previously uploaded the image.',
      },
      reference_image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostUpload = {
  body: {
    type: 'object',
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostUpscale = {
  body: {
    type: 'object',
    required: ['upscale_factor'],
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
      image_id: {
        type: 'string',
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.)',
      },
      upscale_factor: {
        type: 'string',
        enum: ['x2', 'x4', 'x6', 'x8'],
        description:
          'Choose one of the upscale factors. The option are as follows\n  * 2x\n  * 4x\n  * 6x\n  * 8x\n',
      },
      format: {
        type: 'string',
        default: 'JPG',
        enum: ['JPG', 'PNG', 'WEBP'],
        description:
          'Optionally select one of the output image formats (JPG is chosen if left blank). Options are as follows:\n  * JPG\n  * PNG\n  * WEBP\n\nDefault: `JPG`',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostUpscaleEnhance = {
  body: {
    type: 'object',
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
      image_id: {
        type: 'string',
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.)',
      },
      upscale_factor: {
        type: 'integer',
        default: 2,
        enum: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        description:
          'Upscale an image with a given upscale factor. The upscale factor increases the image’s resolution without increasing its size. Upscale factor can be between 2 - 16 (default is 2).\n\nDefault: `2`',
      },
      format: {
        type: 'string',
        default: 'JPG',
        enum: ['JPG', 'PNG', 'WEBP'],
        description:
          'Optionally select one of the image formats (JPG is chosen if left blank). Options are as follows:\n  * JPG\n  * PNG\n  * WEBP\n\nDefault: `JPG`',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '202': {
      type: 'object',
      properties: { transaction_id: { type: 'string' }, status: { type: 'string' } },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostUpscaleUltra = {
  body: {
    type: 'object',
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
      image_id: {
        type: 'string',
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.)',
      },
      upscale_factor: {
        type: 'integer',
        default: 2,
        enum: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        description:
          'Upscale an image with a given upscale factor. The upscale factor increases the image’s resolution without increasing its size. Upscale factor can be between 2 - 16 (default is 2).\n\nDefault: `2`',
      },
      format: {
        type: 'string',
        default: 'JPG',
        enum: ['JPG', 'PNG', 'WEBP'],
        description:
          'Optionally select one of the image formats (JPG is default). Options are as follows:\n  * JPG\n  * PNG\n  * WEBP\n\nDefault: `JPG`',
      },
      mode: {
        type: 'string',
        default: 'sync',
        enum: ['sync', 'async', 'auto'],
        description:
          'Use this query parameter to establish the processing mode. Acceptable values are sync, async and auto (sync is default):\n  * sync: issues a synchronous request, response is given when the result is ready.\n  * async: forces an asynchronous request, the response, which is instantaneous, contains a "transaction_id" which is used to poll for the result.\n  * auto: the processing mode decision is made by the service, which depends upon the expected processing time.\n\nDefault: `sync`',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '202': {
      type: 'object',
      properties: { transaction_id: { type: 'string' }, status: { type: 'string' } },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
const PostVectorizer = {
  body: {
    type: 'object',
    properties: {
      image: {
        description:
          'Source image file (binary). (If this parameter is present, the other image source parameters must be empty.)',
        type: 'string',
        format: 'binary',
      },
      image_url: {
        type: 'string',
        description:
          'Source image URL. (If this parameter is present, the other image source parameters must be empty.)',
      },
      image_id: {
        type: 'string',
        description:
          'Source image ID of an image previously uploaded to Picsart or result image ID from a different API. (If this parameter is present, the other image source parameters must be empty.)',
      },
      downscale_to: {
        type: 'integer',
        default: 2048,
        description:
          'Large images can be downscaled. Use -1 to turn off downscaling. Otherwise the image is scaled by 0.5 until max(width, height) < downscale_to.',
      },
    },
    $schema: 'http://json-schema.org/draft-04/schema#',
  },
  response: {
    '200': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: { image_id: { type: 'string' }, image_url: { type: 'string' } },
        },
        status: { type: 'string' },
      },
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '400': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '401': {
      type: 'object',
      properties: {
        code: { type: 'integer', examples: [401] },
        message: { type: 'string', examples: ['Unauthorized'] },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '403': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '404': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '405': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '413': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '415': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '429': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '431': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '500': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
    '503': {
      type: 'object',
      properties: {
        code: { type: 'integer' },
        message: { type: 'string' },
        detail: { type: 'string' },
      },
      required: ['message', 'detail'],
      $schema: 'http://json-schema.org/draft-04/schema#',
    },
  },
} as const;
export {
  GetBalance,
  GetEffects,
  GetUpscaleUltraTransactionId,
  PostAdjust,
  PostBackgroundTexture,
  PostEdit,
  PostEffects,
  PostEffectsPreviews,
  PostEnhanceFace,
  PostMasks,
  PostMasksPreviews,
  PostRemovebg,
  PostStyletransfer,
  PostUpload,
  PostUpscale,
  PostUpscaleEnhance,
  PostUpscaleUltra,
  PostVectorizer,
};
