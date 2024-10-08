import { ApiProperty } from '@nestjs/swagger';

export class FilesDto {
    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
    files: any[];
}