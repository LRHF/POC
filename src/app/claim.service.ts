import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IClaim } from './claim.interface';
import { IServiceType } from './claim.interface';
import { IClaimStatus } from './claim.interface';

@Injectable({
    providedIn: 'root'
})
export class ClaimService {

    private baseUrlClaims = 'api/claims.js';
    private baseUrlClaimStatus = 'api/claimStatus.js';
    private baseUrlServiceType = 'api/serviceTypes.js';

    constructor (private http: HttpClient){ }

    getClaims(): Observable<IClaim[]> {
        return this.http.get<IClaim[]>(this.baseUrlClaims);
    }

    getClaimStatus(): Observable<IClaimStatus[]> {
        return this.http.get<IClaimStatus[]>(this.baseUrlClaimStatus);
    }

    getServiceType(): Observable<IServiceType[]> {
        return this.http.get<IServiceType[]>(this.baseUrlServiceType);
    }

}