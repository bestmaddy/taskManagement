import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getTask(): Observable<any[]> {
    return this.httpClient.get<any[]>("http://localhost:3000/getTask")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  saveTask(data:any): Observable<any[]> {
    const saveTask = this.httpClient.post<any[]>("http://localhost:3000/SaveTask", data)
      .pipe(
        catchError(this.errorHandler)
      )
      return (saveTask)
  }
  updateTask(data:any): Observable<any[]> {
    console.log(data)
    const updateTask = this.httpClient.put<any[]>("http://localhost:3000/updateTask", data)
      .pipe(
        catchError(this.errorHandler)
      )
      return(updateTask)
  }
  deleteTask(data:string): Observable<any> {
    const deleteTask = this.httpClient.delete<string>(`http://localhost:3000/deleteTask/${data}`)
      .pipe(
        catchError(this.errorHandler)
      )
      return(deleteTask)
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
