import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecognitionService {
  constructor(private http: HttpClient) { }

  recognize(imgBytes: Object, changeCallback) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/upload"
      })
    };

    //TODO: mast be replaced
    this.http.post('http://localhost:8080/digit-gateway/recognize', imgBytes, httpOptions).subscribe(value =>{
        console.log('value:', value);

        changeCallback(value);
        // recognizedDigit.nativeElement.value = value;
    },
    error => {
        console.log('error', error);
        changeCallback(error);
        // recognizedDigit.nativeElement.value = value;
    });
}

private handleError(error: HttpErrorResponse) {
  console.log(error)

  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
  };
}
