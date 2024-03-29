import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Errors } from '../errors/errors.enum';
@Global()
@Injectable()
export class ResponseService {
    getStatusCode(errorCode: Errors): HttpStatus {
        switch (errorCode) {
            case Errors.BAD_REQUEST:
                return HttpStatus.BAD_REQUEST;
            case Errors.UNAUTHORIZED:
                return HttpStatus.UNAUTHORIZED;
            case Errors.FORBIDDEN:
                return HttpStatus.FORBIDDEN;
            case Errors.NOT_FOUND:
                return HttpStatus.NOT_FOUND;
            case Errors.CONFLICT:
                return HttpStatus.CONFLICT;
            case Errors.UNPROCESSABLE_ENTITY:
                return HttpStatus.UNPROCESSABLE_ENTITY;
            case Errors.TOO_MANY_REQUESTS:
                return HttpStatus.TOO_MANY_REQUESTS;
            case Errors.SERVICE_UNAVAILABLE:
                return HttpStatus.SERVICE_UNAVAILABLE;
            case Errors.GATEWAY_TIMEOUT:
                return HttpStatus.GATEWAY_TIMEOUT;
            default:
                return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    throwHttpException(errorCode: Errors, errorMessage: string): void {
        const statusCode = this.getStatusCode(errorCode);
        throw new HttpException(
            { error: errorMessage },
            statusCode,
        );
    }
}
