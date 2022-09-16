import { HttpInterceptor ,HttpRequest ,HttpHandler, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, retryWhen } from 'rxjs/operators';
import { ErrorCode } from '../enums/enums';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class HttperorInterceptorService implements HttpInterceptor {
constructor( private alertify:AlertifyService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('HTTP Requset Started !!!');
    return next.handle(req).pipe(
      retryWhen(
        error => this.retryRequest(error,19)),
      catchError((error: HttpErrorResponse) => {
        const errorMsg = this.SetError(error);
        console.log(error);
        this.alertify.error(errorMsg);
        return throwError(errorMsg);
      })

    );

  }
      // Retry the request in case of error

  retryRequest(error: Observable<unknown>, retryCount: number): Observable<unknown>{
    return  error.pipe(
      concatMap((checkErr: HttpErrorResponse, count: number) => {
        if (count <= retryCount) {
          switch (checkErr.status) {
            case ErrorCode.serverDown:
              // Retry in case WebAPIS is down
              return of(checkErr);
          //   case ErrorCode.unauthorised:
          //     // Retry in case WebAPIS is unauthorised
          //       return of(checkErr);
           }
        }
        // // Retry in case WebAPIS is down
        // if (checkErr.status === ErrorCode.serverDown && count <=retryCount) {
        //   return of(checkErr);
        // }
        // if (checkErr.status === ErrorCode.unauthorised && count <=retryCount) {
        //   return of(checkErr);
        // }
 
        return throwError(checkErr);
      })
    )


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
