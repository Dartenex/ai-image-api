import { GenProgressService } from '@generator/gen-progress.service';
import { Test, TestingModule } from '@nestjs/testing';
import { GeneratorDIKeys } from '@generator/contracts';
import { generateHash } from '@utils';
import { CurrentProgressDto, GenerationDto } from '@generator/dto';

const requestId = generateHash('some_request_id');
const generationCurrentProgress = 34;
const incrementStep = 10;
const userId = generateHash(`user_id${Math.random()}`);
const prompt = 'some prompt here';

describe('Generation Progress service test...', () => {
  let generationProgressService: GenProgressService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenProgressService,
        {
          provide: GeneratorDIKeys.GenerationRepository,
          useValue: {
            getProgress: jest.fn().mockResolvedValue(generationCurrentProgress),
            create: jest.fn(),
            updateProgress: jest.fn(),
            generationsByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    generationProgressService =
      module.get<GenProgressService>(GenProgressService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Mocks should be defined', () => {
    expect(generationProgressService).toBeDefined();
  });

  it('getProgress', async () => {
    const getProgressResult: CurrentProgressDto =
      await generationProgressService.getProgress(requestId);
    expect(getProgressResult.currentProgress).toBe(generationCurrentProgress);
    expect(getProgressResult.progressLeft).toBe(
      100 - generationCurrentProgress,
    );
  });

  it('increment', async () => {
    const incrementedValue: number = await generationProgressService.increment(
      requestId,
      incrementStep,
    );
    expect(incrementedValue).toBe(generationCurrentProgress + incrementStep);
  });

  it('init', async () => {
    const genProgressDto: GenerationDto = {
      id: requestId,
      userId: userId,
      prompt: prompt,
      createdAt: new Date().toISOString(),
      progressInPercents: 0,
    };
    const resultGenDto: GenerationDto = await generationProgressService.init(
      userId,
      requestId,
      prompt,
    );
    expect(resultGenDto).toEqual(genProgressDto);
  });
});
