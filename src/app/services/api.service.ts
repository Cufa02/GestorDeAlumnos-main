import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  postAlumno(data : any){
    return this.http.post<any>("http://localhost:3000/alumnoList/", data)
  }
  getAlumno(){
    return this.http.get<any>("http://localhost:3000/alumnoList/");
  }
  putAlumno(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/alumnoList/"+id, data)
  }
  borrarAlumno(id:number){
    return this.http.delete<any>("http://localhost:3000/alumnoList/"+id)
  }
}
