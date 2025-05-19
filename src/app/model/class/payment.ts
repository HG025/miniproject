export class Payment {
     amount: number 
    paymentDate: string
    paymentMode: string
    projectPaymentId: number
    naration: string
    projectName: string
    companyName: string
    clientId: number
    projectId: number

    constructor() {
        this.amount = 0;
        this.paymentDate = '';
        this.paymentMode = '';
        this.projectPaymentId = 0;
        this.naration = '';
        this.projectName = '';
        this.companyName = '';
        this.clientId = 0;
        this.projectId = 0;
    }
}
