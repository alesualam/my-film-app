import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ImagesService {

    BASE_URL = 'https://www.googleapis.com/customsearch/v1?';
    API_KEY = 'key=AIzaSyBXONWopocqNm7nzuYGaKzrtcUfwwrU6aQ';
    CSE = '&cx=001072997329821042011:l-ehbvqmkg0';
    type = '&searchType=image';
    imageUrl = '';

    imageUrlObservable = new Subject<string>();

    constructor(private httpClient: HttpClient) {}

    getImage(query, i) {

        query = '&q=' + query.split(' ').join('+');

        const url = this.BASE_URL + this.API_KEY + this.CSE + this.type + query; 
        
        this.httpClient.get(url, {
        })
        .subscribe(
            (response) => {
                this.imageUrl = response['items'][i]['link'];
                this.imageUrlObservable.next(this.imageUrl);
            }
        )
    }
}