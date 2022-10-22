import {
  HttpBackend,
  HttpErrorResponse,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
// import { ServerConfigurations } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  customHttpClient: HttpClient;
  constructor(public httpClient: HttpClient, backend: HttpBackend) {
    this.customHttpClient = new HttpClient(backend);
  }

    private product$ = new BehaviorSubject<any>({});
    selectedProduct$ = this.product$.asObservable();

    setProduct(product: any) {
      this.product$.next(product);
    }



   BackendApiBaseUrl = 'http://localhost:5000/';

  public get(apiName:any) {
    const apiBaseUrl =
      this.BackendApiBaseUrl +
      apiName;
    return this.httpClient.get(apiBaseUrl);
  }


public post(param:any){
  const apiBaseUrl =
  this.BackendApiBaseUrl +
  'process-management/api/v1/unit-master';
return this.httpClient
  .post<any>(apiBaseUrl, param)
  .pipe(catchError(this.handleError));
}


  downloadFile(fileName: any): Observable<any> {
    const apiBaseUrl =
      this.BackendApiBaseUrl +
      'process-management/api/v1/file/' +
      fileName;

    return this.httpClient.get(apiBaseUrl, { responseType: 'blob' });
  }


  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
