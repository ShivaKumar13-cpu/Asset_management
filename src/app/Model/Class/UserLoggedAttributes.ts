export interface UserAttribute {
    id: 1,
    name: string,
    username: string,
    email: string,
    password: string,
    employeeCode: string,
    mobileNumber: string,
    description: string,
    isActive: boolean,
    createdDate: string,
    businessVerticalIds: number[],
    departmentId: number[],
    roleIds: number[]
}