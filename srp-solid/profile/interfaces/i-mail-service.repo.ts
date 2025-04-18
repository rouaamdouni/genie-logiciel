export interface IMailService {
    sendEmail(args: SendEmailArgs): Promise<void>
  }
  
  export type SendEmailArgs = {
    from: string
    subject: string
    text: string
    to: Array<string> | string
  }
  