

export interface APIResponseModel {
    message: string,
    result: boolean,
    data: any
}

export interface iAllRoles {
    roleId: string,
    role: string
}

export interface IDashboardData {
    totalClient: string,
    totalEmployee: string,
    totalDesignation: string
}