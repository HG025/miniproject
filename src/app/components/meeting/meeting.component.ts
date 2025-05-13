import { Component, inject, OnInit } from '@angular/core';
import { EditEvent, KENDO_GRID, KENDO_GRID_EXCEL_EXPORT, RemoveEvent } from '@progress/kendo-angular-grid';
import { IMeeting } from '../../model/interface/meeting';
import { MeetingService } from '../../services/meeting.service';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { APIResponseModel } from '../../model/interface/role';
import { DialogModule, KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meeting } from '../../model/class/meeting';
import { KENDO_LAYOUT, KENDO_TABSTRIP } from '@progress/kendo-angular-layout';
import { fileExcelIcon, SVGIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [KENDO_GRID,ContextMenuModule, KENDO_DIALOG, TranslateModule, CommonModule, FormsModule,DialogModule, ReactiveFormsModule, KENDO_TABSTRIP, KENDO_LAYOUT, KENDO_GRID_EXCEL_EXPORT],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent implements OnInit{

  public excelSvg : SVGIcon = fileExcelIcon;

  public createMeetingDialog: boolean = false;

  meetingList: IMeeting[] = [];

  filteredMeetingList: IMeeting[] =[];

  meetingData: any[] = [];

  filteredMeetingData: any[] = [];  

  MeetingObj: Meeting = new Meeting(); 

  meetingService = inject(MeetingService);

  public isNew: boolean | undefined ;

  // public meetingForm: FormGroup = new FormGroup ({
  //   meetingDate : new FormControl(),
  //   meetingTitle: new FormControl(Validators.required),
  //   meetingMedium: new FormControl(Validators.required),
  //   projectMeetingId: new FormControl(Validators.required),
  //   startTime: new FormControl(),
  //   endTime: new FormControl(),
  //   projectName: new FormControl(Validators.required),
  //   companyName: new FormControl(Validators.required),
  //   clientId: new FormControl(Validators.required),
  //   clientPersonNames: new FormControl(Validators.required),
  //   leadByEmployeName: new FormControl(Validators.required),
  //   projectId: new FormControl(Validators.required),
  //   meetingLeadByEmpId: new FormControl(Validators.required),
  //   isRecordingAvailable: new FormControl(Validators.required),
  //   recordingUrl: new FormControl(Validators.required),
  //   meetingNotes: new FormControl(Validators.required),
  // }); 

  onClose(status: string): void {
    console.log("close click")
    this.createMeetingDialog = false;
    this.MeetingObj = new Meeting();
  }

  onCreateMeeting() {
    this.isNew = true;
    console.log("Create Meeting Button Pressed");
    this.createMeetingDialog = true;
    this.MeetingObj = new Meeting();
  }

  onSubmit() {
    console.log(this.MeetingObj,"meeting object")
    console.log("Submit Button Pressed");
    this.meetingService.addUpdateMeeting(this.MeetingObj).subscribe((res: APIResponseModel)=> {
      console.log(res,"res")
      if (res.result) {
        if(this.isNew == true){
          alert("Meeting Created Successfully!");          
        }else {
          alert("Meeting Updated Successfully!");
        }
        this.getAllMeetings();
        this.createMeetingDialog = false;
      } else {
        alert("Meeting Update Failed!");
        console.log(res.data,"res.data")
        console.log(res.message,"res.msg")
        console.log(res.result,"res.result")
      }
    })
  }

  getMeetingByProjectId(projectId: number) {
    this.meetingService.getMeetingByProjectId(projectId).subscribe((res:APIResponseModel)=>{
      console.log(projectId,"projectId")
      this.filteredMeetingList = res.data;
      if(this.filteredMeetingList && this.filteredMeetingList.length){
        const item = this.filteredMeetingList[0];
        this.filteredMeetingData = [
          {
          
            meetingDate: item.meetingDate,
            meetingTitle: item.meetingTitle,
            meetingMedium: item.meetingMedium,
            projectMeetingId: item.projectMeetingId,
            startTime: item.startTime,
            endTime: item.endTime,
            projectName: item.projectName,
            companyName: item.companyName,
            clientId: item.clientId,
            clientPersonNames: item.clientPersonNames,
            leadByEmployeName: item.leadByEmployeName,
            meetingStatus: item.meetingStatus,
            meetingLeadByEmpId: item.meetingLeadByEmpId,
            projectId: item.projectId, 
            isRecordingAvailable: item.isRecordingAvailable, 
            recordingUrl: item.recordingUrl, 
            meetingNotes: item.meetingNotes, 
          }
        ]

      }
      console.log(res.data,"res.data in getMeetingByProjectId")
    })
  }

  

  getAllMeetings() {
    this.meetingService.getAllMeetings().subscribe((res: APIResponseModel)=> {
     this.meetingList = res.data;
     if(this.meetingList && this.meetingList.length){
      const item = this.meetingList[0];
      this.meetingData = [
        {
          
          meetingDate: item.meetingDate,
          meetingTitle: item.meetingTitle,
          meetingMedium: item.meetingMedium,
          projectMeetingId: item.projectMeetingId,
          startTime: item.startTime,
          endTime: item.endTime,
          projectName: item.projectName,
          companyName: item.companyName,
          clientId: item.clientId,
          clientPersonNames: item.clientPersonNames,
          leadByEmployeName: item.leadByEmployeName,
          meetingStatus: item.meetingStatus,
          meetingLeadByEmpId: item.meetingLeadByEmpId,
          projectId: item.projectId, 
          isRecordingAvailable: item.isRecordingAvailable, 
          recordingUrl: item.recordingUrl, 
          meetingNotes: item.meetingNotes, 
        }
      ]
      console.log(this.meetingData,"meetingData")
     }
     console.log( this.meetingList," this.meetingList")
     console.log( this.MeetingObj," this.MeetingObj")
     console.log(res.data,"res.data")
    })
  }

  editMeeting(event: EditEvent) {
    this.isNew = false;
    this.createMeetingDialog = true;
    const meetingId = event.dataItem.projectMeetingId;

    this.meetingService.getMeetingById(meetingId).subscribe((res:APIResponseModel)=>{
      if(res.data){
        this.MeetingObj = res.data;
        if(this.MeetingObj.meetingDate){
          const date = new Date(this.MeetingObj.meetingDate);
          this.MeetingObj.meetingDate = date.toISOString().split('T')[0];
        }
        this.createMeetingDialog = true;
        console.log(this.MeetingObj,"this.MeetingObj")
      }else {
        alert("No Data Found")
      }
    })
  }


  onTabChange(event: any) {
    console.log(event,"event")
    if(event.index !== 1){
    this.MeetingObj.projectId = 0;
    console.log(this.MeetingObj.projectId,"this.MeetingObj.projectId")
    this.filteredMeetingList = []  
    console.log(event.index,"event.index")
    }

  }

  deleteMeeting(id: number) {
    const isDelete = "Are You Sure You Want To Delete?"
    console.log(id,"id in delete")
    if(isDelete){
      this.meetingService.deleteMeeting(id).subscribe((res: APIResponseModel)=>{
        if(res.result){
          alert("Meeting id" + id + "Deleted Successfully")
          console.log(res.result,"res. result")
          this.getAllMeetings();
        } else {
          alert("Meeting Not Deleted")
          console.log("else")
        }
      })
    }  
  }





  ngOnInit(): void {
    this.getAllMeetings();
  }

}
