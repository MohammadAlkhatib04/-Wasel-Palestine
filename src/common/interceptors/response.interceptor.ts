import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const method = request.method;
    const url = request.url;

    const entity = this.extractEntity(url);

    return next.handle().pipe(
      map((response) => {
        let message = 'Request successful';

        // 👇 إذا المستخدم رجع message بنفسه لا نغيره
        if (response?.message) {
          message = response.message;
        } else {
          message = this.generateMessage(method, entity);
        }

        // pagination
        if (response?.data && response?.meta) {
          return {
            success: true,
            message,
            data: response.data,
            meta: response.meta,
          };
        }

        // data مغلفة
        if (response?.data) {
          return {
            success: true,
            message,
            data: response.data,
          };
        }

        // response عادي
        return {
          success: true,
          message,
          data: response,
        };
      }),
    );
  }

  private extractEntity(url: string): string {
    // /api/v1/incident → incident
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1] || 'resource';
  }

  private generateMessage(method: string, entity: string): string {
    const name = this.capitalize(entity);

    switch (method) {
      case 'GET':
        return `${name} fetched successfully`;
      case 'POST':
        return `${name} created successfully`;
      case 'PATCH':
      case 'PUT':
        return `${name} updated successfully`;
      case 'DELETE':
        return `${name} deleted successfully`;
      default:
        return 'Request successful';
    }
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
