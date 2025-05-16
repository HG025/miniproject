import { Component, inject, OnInit } from '@angular/core';
import { EditEvent, KENDO_GRID } from '@progress/kendo-angular-grid';
import { IClient } from '../../model/interface/client';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '@progress/kendo-angular-icons';
import { searchIcon, SVGIcon } from '@progress/kendo-svg-icons';
import { Client } from '../../model/class/client';
import { KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { KENDO_CONTEXTMENU } from '@progress/kendo-angular-menu';

@Component({
  selector: 'app-client',
  imports: [KENDO_GRID, TranslateModule, CommonModule, ReactiveFormsModule, FormsModule, KENDO_DIALOG, KENDO_CONTEXTMENU],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{

  public showClientDialog: boolean = false;

  public deleteClientDialog: boolean = false;

  public isNew: boolean | undefined;

  clientList: IClient[] =[];
  filteredclientList: IClient[] =[];

  public selectedClient: any;

  clientService = inject(ClientService);

  clientObj: Client = new Client();

  public filterIcon: SVGIcon = searchIcon;
  
  getAllClient() {
    this.clientService.getAllClient().subscribe((res: APIResponseModel)=> {
      this.clientList = res.data;
      // if(this.clientList && this.clientList.length){
      //   const item = this.clientList[0];
      //   this.clientList = [
      //     {
      //       address: item.address,
      //       city: item.city,
      //       clientId: item.clientId,
      //       companyName: item.companyName,
      //       contactNo: item.contactNo,
      //       contactPersonName: item.contactPersonName,
      //       employeeStrength: item.employeeStrength,
      //       gstNo: item.gstNo,
      //       pincode: item.pincode,
      //       regNo: item.regNo,
      //       state: item.state
      //     }
      //   ]
      //   console.log(this.clientList ,"yjssd")
      //   console.log(res.data,"res.data")
      // }
      console.log(res.data,"res.data")
      this.clientObj = new Client();
    })
  }

  getClientById(clientId: number) {
    this.clientService.getClientById(clientId).subscribe((res: APIResponseModel)=> {
      const item = res.data;

      this.clientList = [
              {
                address: item.address,
                city: item.city,
                clientId: item.clientId,
                companyName: item.companyName,
                contactNo: item.contactNo,
                contactPersonName: item.contactPersonName,
                employeeStrength: item.employeeStrength,
                gstNo: item.gstNo,
                pincode: item.pincode,
                regNo: item.regNo,
                state: item.state
              }
            ]
      console.log("getClientById")
      console.log(res.data,"res.data")
    })
  }

   onClose() {
    this.showClientDialog = false;
    this.deleteClientDialog = false;
    this.clientObj = new Client();
  }

  onSubmit() {
    console.log("submit pressed")
    this.clientService.addUpdateClient(this.clientObj).subscribe((res:APIResponseModel)=>{
      if(res.result){
        if(this.isNew){
          alert("Client Created  SuccessFully!!");
        }else{
          alert("Client Updated  SuccessFully!!");
        }
        
        this.showClientDialog = false
        this.getAllClient();

      }else {
        alert("Client Not Created")
      }
      res.data;
      console.log("add update [pressed")
      console.log(res.data,"res.data")
    })
  }

  onContextMenuSelect(event: any) {
    const selectedItem = event.item.text;
    console.log(selectedItem,"selectedItem ")
    if(selectedItem == "Add Client") {
      this.isNew = true
      this.showClientDialog = true
      console.log("add client selectd ")
      console.log(selectedItem,"add selectedItem ")
    }else if(selectedItem == "Edit Client"){
      this.editClient(event);
      // this.isNew = false;
      // this.showClientDialog = true;
    }else if(selectedItem == "Delete Client"){
      this.deleteClientDialog = true;
      if(this.selectedClient && this.selectedClient.clientId){
        this.onDeleteClient(this.selectedClient.clientId);
      }else {
        alert("No ClientId is selected")
      }
    }
  }


  onGridSelectionChange(event:any): void {
    this.selectedClient = event.selectedRow[0].dataItem;
    console.log(this.selectedClient,"this.selectedClient")
  }

  onClickForContextMenu(event: MouseEvent){
    const targetRow = (event.target as HTMLElement).closest('kendo-grid-list tr');
    console.log(targetRow,"targetRow");

    if(targetRow){
      const rowIndex = Array.from(targetRow.parentElement!.children).indexOf(targetRow);
      console.log(rowIndex,"rowIndex")

      this.selectedClient = this.clientList[rowIndex];
      console.log(this.selectedClient,"this.selectedClient")

       const objet = this.selectedClient.clientId;
      console.log(objet,"objet")

    }
  }



  onDeleteClient(clientId: number){
    const isDelete = confirm("ARE YOU SURE YOU WANT TO DELETE?")
    console.log(clientId,"clientId")
    if(isDelete){
       this.clientService.deleteClient(clientId).subscribe((res: APIResponseModel)=> {
      console.log(res,"res")
      if(res.result){
        alert("Deleted Successfully!")
        this.getAllClient();
      }else {
        alert(res.message + "Delete Failed" )
        this.getAllClient();
      }
    })
    } else {
      this.deleteClientDialog = false;
    }
  }


  editClient(event: EditEvent) {
    this.isNew = false;
    const clientId = this.selectedClient.clientId;
     this.clientService.getClientById(clientId).subscribe((res:APIResponseModel)=>{
      this.clientObj = res.data
      this.showClientDialog = true;
    })
  }

  resetFilter() {
    this.clientObj.clientId = 0;
    this.getAllClient();
  }








  ngOnInit(): void {
   this.getAllClient();
  }

}
