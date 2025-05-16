

export interface IProject {
    empId: number
    empName: string
    empCode: string
    empEmailId: string
    empDesignation: string
    projectName: string
    startDate: string
    expectedEndDate: string
    clientName: string
    clientProjectId: number


    leadByEmpId: number
    completedDate: null
    contactPerson: string
    contactPersonContactNo: string
    totalEmpWorking: number
    projectCost: number
    projectDetails: string
    contactPersonEmailId: string
    clientId: number

}

export interface IProject2 {
    projectName: string
    startDate: string
    expectedEndDate: string
    clientProjectId: number
    leadByEmpId: number
    completedDate: null
    contactPerson: string
    contactPersonContactNo: string
    totalEmpWorking: number
    projectCost: number
    projectDetails: string
    contactPersonEmailId: string
    clientId: number

}
