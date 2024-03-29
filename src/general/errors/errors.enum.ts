import { ApiProperty } from "@nestjs/swagger";

export enum Errors {
    VALIDATION_ERROR = 'Erro de validação',
    INTERNAL_ERROR = 'Erro interno',
    NOT_FOUND = 'Não encontrado',
    UNAUTHORIZED = 'Não autorizado',
    FORBIDDEN = 'Proibido',
    CONFLICT = 'Conflito',
    BAD_REQUEST = 'Requisição inválida',
    UNPROCESSABLE_ENTITY = 'Entidade não processável',
    TOO_MANY_REQUESTS = 'Muitas requisições',
    SERVICE_UNAVAILABLE = 'Serviço indisponível',
    GATEWAY_TIMEOUT = 'Tempo de requisição esgotado',
    NETWORK_ERROR = 'Erro de rede',
    UNKNOWN_ERROR = 'Erro desconhecido',
}

export class ErrorResponse {
    @ApiProperty({
        description: 'Mensagem de erro',
        example: 'Erro interno',
    })
    error: string;
}