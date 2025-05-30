export interface BusinessVerticalTypeAttributes {
    id: number,
    name: string,
    location: string,
    verticalCode: string,
    createdBy: string,
    businessDivisionId?: number,
    departmentIds: number[]
}

export interface BusinessDivisionTypeAttributes {
    id?: number,
    name: string;
    code: string;
    description: string;
    createdBy: string;
    departmentIds?: number[];
    businessVerticalIds?: number[]; 

}