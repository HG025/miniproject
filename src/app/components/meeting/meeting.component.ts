import { Component, inject, OnInit } from '@angular/core';
import { EditEvent, KENDO_GRID, RemoveEvent } from '@progress/kendo-angular-grid';
import { IMeeting, meeting } from '../../model/interface/meeting';
import { MeetingService } from '../../services/meeting.service';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { APIResponseModel } from '../../model/interface/role';
import { DialogModule, KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [KENDO_GRID,ContextMenuModule, KENDO_DIALOG, TranslateModule, CommonModule, FormsModule,DialogModule, ReactiveFormsModule],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent implements OnInit{

  public createMeetingDialog: boolean = false;


  meetingList: IMeeting[] = [];

  meetingData: any[] = [];

  MeetingObj: meeting = new meeting(); 

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
    this.MeetingObj = new meeting();
  }

  onCreateMeeting() {
    this.isNew = true;
    console.log("Create Meeting Button Pressed");
    this.createMeetingDialog = true;
    this.MeetingObj = new meeting();
  }

  onSubmit() {
    console.log(this.MeetingObj,"meeting object")
    console.log("Submit Button Pressed");
    this.meetingService.addUpdateMeeting(this.MeetingObj).subscribe((res: APIResponseModel)=> {
      if(res.data){
        alert("meeting Created Successfully!!");
        this.getAllMeetings();
        this.createMeetingDialog = false;
      } else {
        alert("meeting not Created!!");
        console.log(res.data,"res.data")
        console.log(res.message,"res.msg")
        console.log(res.result,"res.result")
      }
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

  editMeeting(event: EditEvent) {
    this.isNew = false;
    this.createMeetingDialog = true;
    console.log(event.dataItem,"event.dataItem");
     this.meetingData = event.dataItem;
    console.log("edit event hit")

  }


  ngOnInit(): void {
    this.getAllMeetings();
  }

}
