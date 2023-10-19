import { GenerateUserDto } from '@generator/dto/generate-user.dto';

export interface MainGeneratorDto {
  query: string;
  user: GenerateUserDto;
  redirectUrl: string;
}
