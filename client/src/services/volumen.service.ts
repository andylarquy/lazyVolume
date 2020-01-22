import { REST_SERVER_URL } from 'src/services/ServerConfiguration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class VolumenService {

    constructor(public http: HttpClient) { }

    async getVolumen(): Promise<number> {
        const asd = await this.http.get<number>(REST_SERVER_URL + '/volume').toPromise();
        console.log(asd);
        return asd;
    }

    async setVolumen(newVolume): Promise<void> {
        const callback: any = await this.http.post(REST_SERVER_URL + '/volume/', newVolume).toPromise();
        console.log(callback);
        return callback;
    }

}