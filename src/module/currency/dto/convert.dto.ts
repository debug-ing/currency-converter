import { IsNotEmpty, IsString } from 'class-validator';

export class ConvertCurrencyDto {
    @IsNotEmpty()
    @IsString()
    from: string;

    @IsNotEmpty()
    @IsString()
    to: string;
}