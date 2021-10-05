import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) {}
    // here i will define POST<GE<PUT<DELETE
    //create Reastaurant Using Post Method
    postRestauarnt(data:any){
      return this._http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
        return res;
      }))
    }
    //get restuarant data using GET Method
    getRestaurant(){
      return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
        return res;
      }))
    }
    //Update restaurant using PUT
   updateRestaurant(data:any,id:number){
     return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res;
     }))
   }

   //Delete Restaurant using DELETE Method
   deleteRestaurant(id:number){
     return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
       return res;
     }))
   }
}
