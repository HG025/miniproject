import { Component, inject, OnInit } from '@angular/core';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { IMeeting, meeting } from '../../model/interface/meeting';
import { MeetingService } from '../../services/meeting.service';
import { ContextMenuModule } from '@progress/kendo-angular-menu';
import { APIResponseModel } from '../../model/interface/role';
import { DialogModule, KENDO_DIALOG } from '@progress/kendo-angular-dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-meeting',
  standalone: true,
  imports: [KENDO_GRID,ContextMenuModule, KENDO_DIALOG, TranslateModule, CommonModule, FormsModule,DialogModule],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent implements OnInit{

  public createMeetingDialog: boolean = false;


  meetingList: IMeeting[] = [];

  meetingData: any[] = [];

  MeetingObj: meeting = new meeting(); 

  meetingService = inject(MeetingService);

  onClose(status: string): void {
    console.log("close click")
    this.createMeetingDialog = false;
  }

  onCreateMeeting() {
    console.log("Create Meeting Button Pressed");
    this.createMeetingDialog = true;
  }

  onSubmit() {
    console.log("Submit Button Pressed");
    this.meetingService.addMeeting(this.MeetingObj).subscribe((res: APIResponseModel)=> {
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
        }
      ]
      console.log(this.meetingData,"meetingData")
     }
     console.log( this.meetingList," this.meetingList")
     console.log(res.data,"res.data")
    })
  }


  ngOnInit(): void {
    this.getAllMeetings();
  }

}
