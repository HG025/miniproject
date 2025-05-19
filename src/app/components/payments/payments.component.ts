import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEvent, KENDO_GRID } from '@progress/kendo-angular-grid';
import { IPayment } from '../../model/interface/payment';
import { Payment } from '../../model/class/payment';
import { PaymentService } from '../../services/payment.service';
import { APIResponseModel } from '../../model/interface/role';
import { KENDO_CONTEXTMENU } from '@progress/kendo-angular-menu';
import { KENDO_DIALOG, KENDO_DIALOGS } from '@progress/kendo-angular-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { KENDO_LABEL, KENDO_LABELS } from '@progress/kendo-angular-label';
import { KENDO_DROPDOWNLIST } from '@progress/kendo-angular-dropdowns';

@Component({
  selector: 'app-payments',
  imports: [KENDO_GRID,CommonModule,FormsModule,ReactiveFormsModule, KENDO_CONTEXTMENU, KENDO_DIALOG,KENDO_DIALOGS, TranslateModule,KENDO_LABEL, KENDO_LABELS, KENDO_DROPDOWNLIST],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{


  paymentList: IPayment[] = [];

  filteredPaymentList: IPayment[] = [];

  paymentObj: Payment = new Payment();

  paymentService = inject(PaymentService);

  public selectedPayment: any;

  public isNew: boolean = false;

  public showPaymentDialog: boolean = false;

  public showFilterDialog: boolean = false;

  public filteredDialog: boolean = false;

  public windowHeight: number = window.innerHeight;
  public windowWidth: number = window.innerWidth;

  public filterOptions: Array<string> = [
    "Filter By Project ID",
    "Filter By Client ID"
  ]

  public selectedFilter: string = 'Select Filter Options';
  

  getAllPayments(){
    this.paymentService.getAllPayemnt().subscribe((res:APIResponseModel)=>{
      this.paymentList = res.data;
      console.log(res.data)
    })
  }

  editPayment(event: EditEvent) {
    const paymentId = this.selectedPayment.projectPaymentId;
    this.paymentService.getPaymentByPaymentId(paymentId).subscribe((res: APIResponseModel)=>{
      this.paymentObj = res.data;
      if(this.paymentObj.paymentDate){
        const date = new Date(this.paymentObj.paymentDate);
        this.paymentObj.paymentDate = date.toISOString().split('T')[0];
      }
    })
  }

  deletePayment(paymentId: number){
    paymentId = this.selectedPayment.projectPaymentId;
    const isDelete = "ARE YOU SURE YOU WANT TO DELETE?"
    if(isDelete){
      this.paymentService.deletePayment(paymentId).subscribe((res: APIResponseModel)=>{
        if(res.result){
          alert("Payment ID" + paymentId + "is deleted Successfully");
          this.getAllPayments();
        } else {
          alert("failed to delete payment")
        }
      })
    }
  }

 

    onSubmit() {
    this.paymentService.addUpdatePayment(this.paymentObj).subscribe((res:APIResponseModel)=>{
     if(res.result){
      if(this.isNew){
        alert("Payment Created Successfully")
      }else {
        alert("Payment Updated Successfully")
      }
      this.showPaymentDialog = false;
      this.getAllPayments();
      this.paymentObj = new Payment();
     }
     else{
      alert("Payment Failed")
     }
    })
  }

     onSubmitFilter() {
      console.log(this.selectedFilter,"selectedFilter")
    console.log("onSubmitFilter")
    if(this.selectedFilter == 'Filter By Project ID'){
      this.paymentService.getPaymentByProjectId(this.paymentObj.projectId).subscribe((res: APIResponseModel)=>{
        this.filteredPaymentList =  res.data;
        this.filteredDialog = true;
        console.log(res,"res filter")
      })
    }
    if(this.selectedFilter == 'Filter By Client ID') {
       this.paymentService.getPaymentByClientId(this.paymentObj.clientId).subscribe((res: APIResponseModel)=>{
        this.filteredPaymentList =  res.data;
        this.filteredDialog = true;
        console.log(res,"res filter")
      })
    }
  }

   onContextMenuSelect(event: any) {
    const selectedItem = event.item.text

    if(selectedItem == "Add Payment"){
      console.log("Add Payment");
      this.isNew = true;
      this.showPaymentDialog = true
    }else   if(selectedItem == "Edit Payment"){
      console.log("Edit Payment")
      this.editPayment(event);
       this.isNew = false;
      this.showPaymentDialog = true
    }else   if(selectedItem == "Delete Payment"){
      console.log("Delete Payment")
      this.deletePayment(event);
    }else  if(selectedItem == "Filter Payment"){
      console.log("Filter Payment")
      this.showFilterDialog = true;
    }
  }



  onClose() {
    this.showPaymentDialog = false;
    this.showFilterDialog = false;
    this.filteredDialog = false
    this.paymentObj = new Payment();
  }


    ngOnInit(): void {
    this.getAllPayments();
  }

  onGridSelectionChange(event: any){
    if(event.selectedRow && event.selectedRow.length > 0) {
      this.selectedPayment = event.selectedRow[0].dataItem;
    } else {
      this.selectedPayment = null;
    }
  }

  onClickForContextMenu(event: MouseEvent){
    const tragetRow = (event.target as HTMLElement).closest('kendo-grid-list tr');
    if(tragetRow){
      const rowIndex = Array.from(tragetRow.parentElement!.children).indexOf(tragetRow);
      this.selectedPayment = this.paymentList[rowIndex];
    }
  }










}
