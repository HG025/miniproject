import { Component, inject, OnInit } from '@angular/core';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
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

  // onContextMenuSelect(event: any) {
  //   const selectedItem = event.item.text;
  //   console.log(selectedItem,"selectedItem ")
  //   if(selectedItem == "Add Client") {
  //     this.showClientDialog = true
  //     console.log("add client selectd ")
  //     console.log(selectedItem,"add selectedItem ")
  //   }else if(selectedItem == "Edit Client"){


  //   }else if(selectedItem == "Delete Client"){
  //     this.deleteClientDialog = true;
  //   }
  // }

  onContextMenuSelect(event: any): void {
    const action = event.item.text;
  
    switch (action) {
      case 'Delete Client':
        if (this.selectedClient) {
          this.deleteClientDialog = true; // Show confirmation
        } else {
          alert('Please select a client to delete.');
        }
        break;
  
      case 'Edit Client':
        if (this.selectedClient) {
          this.isNew = false;
          this.showClientDialog = true;
        } else {
          alert('Please select a client to edit.');
        }
        break;
  
      case 'Add Client':
        this.isNew = true;
        // this.clientObj = {};
        this.showClientDialog = true;
        break;
  
      default:
        break;
    }
  }

  

  onGridSelectionChange(event: any): void {
    this.selectedClient = event.selectedRow[0].dataItem;
    console.log(this.selectedClient,"this.selectedClient");
    this.clientObj = {...this.selectedClient};
    console.log(this.clientObj ,"this.clientObj ")

  }

  onClose() {
    this.showClientDialog = false;
    this.deleteClientDialog = false;
  }

  onSubmit() {
    console.log("submit pressed")
    this.clientService.addUpdateClient(this.clientObj).subscribe((res:APIResponseModel)=>{
      if(res.result){
        alert("Client Created  SuccessFully!!");
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

  onDeleteClient(clientId: number){
    this.clientService.deleteClient(clientId).subscribe((res: APIResponseModel)=> {
    console.log(res.message,"res.message")
    })
  }








  ngOnInit(): void {
   this.getAllClient();
  }

}
