import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {workers} from "../models/workers.model";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Checks} from "../models/checks.model";
import {Env} from "../models/env.model";

@Injectable({
  providedIn: 'root'
})
export class ChecksService{
  private baseURL="https://localhost:5001/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) {
  }
  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  getChecks(): Observable<Checks[]> {
    return this.httpClient.get<Checks[]>(this.baseURL + '/checks/getChecks')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getEnvs(): Observable<Env[]> {
    return this.httpClient.get<Env[]>(this.baseURL + '/checks/getEnvs')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getCheckById(id: number): Observable<Checks> {
    return this.httpClient.get<Checks>(this.baseURL + '/checks/getCheckById/' + id)
      .pipe(
        catchError(this.errorHandler)
      );

  }
  AddCheck(checks: Checks): Observable<Checks> {
    return this.httpClient.post<Checks>(this.baseURL + '/checks/Create', checks, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  UpdateCheck(id:number, checks: Checks): Observable<Checks> {
    const test =JSON.stringify(checks)
    console.log(test)
    return this.httpClient.put<Checks>(this.baseURL + '/checks/UpdateCheck/' + id,checks, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  DeleteCheck(id:number) :Promise<void>{
    return this.httpClient.delete<void>(this.baseURL + '/checks/DeleteCheck/' + id, this.httpOptions)
      .toPromise();
  }


}