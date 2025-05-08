import { Component, inject } from '@angular/core';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { IMeeting } from '../../model/interface/meeting';
import { MeetingService } from '../../services/meeting.service';

@Component({
  selector: 'app-meeting',
  imports: [KENDO_GRID],
  templateUrl: './meeting.component.html',
  styleUrl: './meeting.component.css'
})
export class MeetingComponent {

  meetingList: IMeeting[] = [];

  meetingService = inject(MeetingService);

}
