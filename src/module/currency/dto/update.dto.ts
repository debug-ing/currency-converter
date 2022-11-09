import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCurrencyDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    usd: number;
}