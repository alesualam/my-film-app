import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ImagesService {

    BASE_URL = 'https://www.googleapis.com/customsearch/v1?';
    API_KEY = 'key=AIzaSyBXONWopocqNm7nzuYGaKzrtcUfwwrU6aQ';
    CSE = '&cx=001072997329821042011:l-ehbvqmkg0';
    type = '&searchType=image';
    result;
    imageUrl = '';

    imageUrlObservable = new Subject<any>();

    constructor(private httpClient: HttpClient) {}

    getImage(query) {

        query = '&q=' + query.split(' ').join('+');

        const url = this.BASE_URL + this.API_KEY + this.CSE + this.type + query; 
        
        this.httpClient.get(url, {
        })
        .subscribe(
            (response) => {
                this.result = response['items'];
                console.log(this.result);
                this.imageUrlObservable.next(this.result);
            }
        )
    }
}