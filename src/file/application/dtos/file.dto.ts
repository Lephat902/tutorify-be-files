import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    file: any;
}