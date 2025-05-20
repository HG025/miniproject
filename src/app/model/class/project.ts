export class Project {
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

    constructor() {
        this.empId = 0;
        this.empName = '';
        this.empCode = '';
        this.empEmailId = '';
        this.empDesignation = '';
        this.projectName = '';
        this.startDate = '';
        this.expectedEndDate = '';
        this.clientName = '';
        this.clientProjectId = 0; 
    }
}


export class ProjectChanges {
    projectChangeId: number
    projectId: number
    changeDetails: string
    changeDate: string
    approvedByEmpId: number

    // projectName: string
    // companyName: string
    // changeApprovedBy: string

    constructor() {
        this.changeDate= '';
        this.changeDetails= '';
        this.projectChangeId= 0;
        // this.projectName= '';
        // this.companyName= '';
        // this.changeApprovedBy= '';
        this.projectId= 0;
        this.approvedByEmpId= 0;
    }
}