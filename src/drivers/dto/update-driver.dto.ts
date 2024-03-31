import { PartialType } from '@nestjs/swagger';
import { CreateDriverDto } from './create-driver.dto';

type OmitCnh = Omit<CreateDriverDto, 'cnh'>;

export class UpdateDriverDto extends PartialType(CreateDriverDto) {
    email?: string;
    nome?: string;
    telefone?: string;
}
