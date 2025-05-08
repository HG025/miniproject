

export interface Item {
    text: string
    value: string
}


export class employee {

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
        startDate: Date;
        endDate: Date;
        designation: string;
        projectsWorkedOn: string;
    }[];


// initialinzing properties
    constructor() {
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
        this.ErpEmployeeSkills = [];
        this.ErmEmpExperiences = [];
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


export const mockEmployees: employee[] = [
    (() => {
        const emp = new employee();
        emp.roleId = 1;
        emp.userName = 'john.doe';
        emp.empCode = 'EMP001';
        emp.empId = 101;
        emp.empName = 'John Doe';
        emp.empEmailId = 'john.doe@example.com';
        emp.empDesignationId = 2;
        emp.empContactNo = '1234567890';
        emp.empCity = 'New York';
        emp.empState = 'NY';
        emp.empPinCode = '10001';
        emp.empAddress = '123 Main St';
        emp.password = 'securePass123';
        emp.ErpEmployeeSkills = [
            {
                empSkillId: 1,
                empId: 101,
                skill: 'Angular',
                totalYearExp: 3,
                lastVersionUsed: '15'
            }
        ];
        emp.ErmEmpExperiences = [
            {
                empExpId: 1,
                empId: 101,
                companyName: 'ABC Corp',
                startDate: new Date('2020-01-01'),
                endDate: new Date('2022-12-31'),
                designation: 'Frontend Developer',
                projectsWorkedOn: 'Internal Dashboard'
            }
        ];
        return emp;
    })()
];
