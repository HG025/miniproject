export class Meeting {
    projectId: number 
    meetingLeadByEmpId: number 
    meetingDate: string 
    meetingTitle: string 
    meetingMedium: string 
    projectMeetingId: number 
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
        this.meetingLeadByEmpId = 0;
        this.meetingNotes = '';
        this.recordingUrl = '';
        this.meetingDate= '';
        this.meetingTitle= '';
        this.meetingMedium= '';
        this.projectMeetingId= 0;
        this.startTime= '';
        this.endTime='';
        this.clientPersonNames= '';
        this.meetingStatus= '';
    }
}