import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ApiService
{

    constructor( public http: HttpClient ){

    }

    public getproductDetails<T>(): Observable<any>
    {
        return this.http.get('https://fakestoreapi.com/products')
    }

    public deleteProduct(productId: number): Observable<any>
    {
        return this.http.delete(`https://fakestoreapi.com/products/${productId}`)
    }

    public addNewProduct(requestBody: any)
    {
        return this.http.post('https://fakestoreapi.com/products', requestBody, { headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })})
    }
}