import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Response<T> {
    status: boolean;
    message?: string;
    data?: T;
}
@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<Response<T>> {
        let statusCode = context.switchToHttp().getResponse().statusCode;
        if (statusCode == 200 || statusCode == 201) {
            return next.handle().pipe(
                map((data) => ({
                    status: true,
                    data: data,
                }))
            );
        } else {
            return next.handle().pipe(
                map((data) => ({
                    status: false,
                    message: data.message || '',
                }))
            );
        }
    }
}