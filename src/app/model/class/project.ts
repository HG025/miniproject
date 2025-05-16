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
