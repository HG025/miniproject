

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

    meetingLeadByEmpId: number
    projectId: number 
    isRecordingAvailable: boolean 
    recordingUrl: string 
    meetingNotes: string 
}
