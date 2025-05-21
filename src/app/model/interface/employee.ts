

export interface Item {
    text: string
    value: string
}



export class Employee {
    roleId: number;
    userName: string;
    empCode: string;
    empId: number;
    empDesignationId: number;
    empName: string;
    empEmailId: string;
    empPersonalEmailId: string;
    empContactNo: string;
    empAltContactNo: string;
    empExpTotalYear: number;
    empExpTotalMonth: number;
    empCity: string;
    empState: string;
    empPinCode: string;
    empAddress: string;
    empPerCity: string;
    empPerState: string;
    empPerPinCode: string;
    empPerAddress: string;
    password: string;
    ErpEmployeeSkills: {
        empSkillId: number;
        empId: number;
        skill: string;
        totalYearExp: number;
        lastVersionUsed: string;
    }[];

    ErmEmpExperiences: {
        empExpId: number;
        empId: number;
        companyName: string;
        startDate: string;
        endDate: string;
        designation: string;
        projectsWorkedOn: string;
    }[];

    constructor () {
        this.roleId = 0;
        this.userName = '';
        this.empCode= '';
        this.empId= 0;
        this.empName= '';
        this. empEmailId= '';
        this.empDesignationId= 0;
        this.empContactNo= '';
        this.empAltContactNo= '';
        this.empPersonalEmailId= '';
        this.empExpTotalYear= 0;
        this.empExpTotalMonth= 0;
        this.empCity= '';
        this.empState= '';
        this.empPinCode= '';
        this.empAddress= '';
        this.empPerCity= '';
        this.empPerState= '';
        this.empPerPinCode= '';
        this.empPerAddress= '';
        this.password= '';
        this.ErpEmployeeSkills = [{
            empSkillId: 0,
            empId: 0,
            skill: '',
            totalYearExp: 0,
            lastVersionUsed: ''
        }];
        this.ErmEmpExperiences = [{
            empExpId: 0,
            empId: 0,
            companyName: '',
            startDate: '',
            endDate: '',
            designation: '',
            projectsWorkedOn: ''
        }];

    }
}




export interface IEmployee {

    empName: string,
    empId:string
    empCode:string
    empEmailId:string
    empDesignation:string
    role:string
}




export interface IDesignation {
        designationId: number
        designation: string
} 

export class Designation {

    designationId: number
    designation: string

    constructor() {
        this.designationId = 0
        this.designation = ''
    }
}



export interface IRoles {
        roleId: number
        role: string
}

export class Roles {

        roleId: number
        role: string

    constructor() {
        this.roleId = 0
        this.role = ''
    }
}


