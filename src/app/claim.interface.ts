export interface IClaim {
    claimId: number;
    DOS: string;
    serviceTypeID: number;
    NHI: string,
    amountExclGST: number;
    claimStatusID: number;
    summary: string,
}

export interface IServiceType {
    id: number;
    desc: string;
}

export interface IClaimStatus {
    id: number;
    desc: string;
}
