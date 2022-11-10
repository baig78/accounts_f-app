import {
  HttpBackend,
  HttpErrorResponse,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
// import { ServerConfigurations } from 'src/app/config';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
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

  public getData(apiName: any) {
    const apiBaseUrl = this.BackendApiBaseUrl + apiName;
    return this.httpClient.get(apiBaseUrl);
  }

  public insertData(apiName: any, payload: any) {

    const apiBaseUrl = this.BackendApiBaseUrl + apiName
    // return this.httpClient
    //   .post<any>(apiBaseUrl, payload)
    //   .pipe(catchError(this.handleError));

      return this.httpClient.post<any>(apiBaseUrl, payload, httpOptions)
      .pipe(catchError(this.handleError));

      


  }
  public editData(apiName: any, payload: any) {

    const apiBaseUrl = this.BackendApiBaseUrl + apiName
    // return this.httpClient
    //   .post<any>(apiBaseUrl, payload)
    //   .pipe(catchError(this.handleError));

      return this.httpClient.put<any>(apiBaseUrl, payload, httpOptions)
      .pipe(catchError(this.handleError));

      


  }

  public deleteData(apiName: any, id: any) {

    const apiBaseUrl = this.BackendApiBaseUrl + apiName +'/'+ id
    // return this.httpClient
    //   .post<any>(apiBaseUrl, payload)
    //   .pipe(catchError(this.handleError));

      return this.httpClient.delete<any>(apiBaseUrl, httpOptions)
      .pipe(catchError(this.handleError));

      


  }
  public getDataById(apiName: any, id: any) {

    const apiBaseUrl = this.BackendApiBaseUrl + apiName +'/'+ id

      return this.httpClient.get<any>(apiBaseUrl, httpOptions)
      .pipe(catchError(this.handleError));
  }





  downloadFile(fileName: any): Observable<any> {
    const apiBaseUrl =
      this.BackendApiBaseUrl + 'process-management/api/v1/file/' + fileName;

    return this.httpClient.get(apiBaseUrl, { responseType: 'blob' });
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
