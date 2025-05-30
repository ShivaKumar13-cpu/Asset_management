export interface Brand {
    id: number | null;
    name: string | null;
    description: string | null;
    createdBy: string | null;
}

export interface Model {
    id: 0,
    modelName: string,
    modelCode: string,
    description: string,
    brandId: 0,
    brandName?: string,
    createdBy: string
}
export interface Vendor {
    id: 0,
    name: string,
    description: string,
    createdBy: string
}
export interface AssetCustomField {

    id: 0,
    fieldName: string,
    fieldType: string,
    fieldValue: string,
    assetId: 0,
    createdBy: string

}
export interface Warrenty {
    id: number,
    warrantyType: string,
    durationInMonths: number,
    coverageDetails: string,
    warrantyStartDate: string,
    warrantyEndDate: string,
    active: true,
    createdBy: string,
    warrantyCode: string
}

export interface CustomFields {
    id: number,
    fieldName: string,
    fieldType: string,
    fieldValue: string,
    assetInstanceId: number,
    createdBy: string
}