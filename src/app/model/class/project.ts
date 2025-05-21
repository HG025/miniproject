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
    changeDate: string
    changeDetails: string
    projectChangeId: number
    projectId: number
    approvedByEmpId: number

    constructor() {
        this.changeDate = '';
        this.changeDetails = '';
        this.projectChangeId = 0;
        this.projectId = 0;
        this.approvedByEmpId = 0;
    }
}