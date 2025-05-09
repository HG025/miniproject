

export interface IMeeting  {
    meetingDate: string
    meetingTitle: string
    meetingMedium: string
    projectMeetingId: string
    startTime: string
    endTime:string
    projectName: string
    companyName: string
    clientId: string
    clientPersonNames: string
    leadByEmployeName: string
    meetingStatus: string
}

export class meeting {
    projectId: number 
    meetingLeadByEmpId: string 
    meetingDate: string 
    meetingTitle: string 
    meetingMedium: string 
    projectMeetingId: string 
    startTime: string 
    endTime:string 
    clientPersonNames: string 
    meetingStatus: string 
    isRecordingAvailable: boolean 
    recordingUrl: string 
    meetingNotes: string 

    constructor() {
        this.projectId = 0;
        this.isRecordingAvailable = false;
        this.meetingLeadByEmpId = '';
        this.meetingNotes = '';
        this.recordingUrl = '';
        this.meetingDate= '';
        this.meetingTitle= '';
        this.meetingMedium= '';
        this.projectMeetingId= '';
        this.startTime= '';
        this.endTime='';
        this.clientPersonNames= '';
        this.meetingStatus= '';
    }
}