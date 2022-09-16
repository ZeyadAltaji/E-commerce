import { HttpInterceptor ,HttpRequest ,HttpHandler, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class HttperorInterceptorService implements HttpInterceptor {
constructor( private alertify:AlertifyService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('HTTP Requset Started !!!');
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMsg = this.SetError(error);
        console.log(error);
        this.alertify.error(errorMsg);
        return throwError(errorMsg);
      })

    );

  }
  SetError(error:HttpErrorResponse):string {
    let errorMsg = 'Unknown error occured';
    if (error.error instanceof ErrorEvent)
    {
      // Client Side Error
      errorMsg = error.error.message;
    }
    else
    {
      //server side error
      if (error.status !== 0)
      {
        errorMsg = error.error;
      }
    }


    return errorMsg;
 }

}
