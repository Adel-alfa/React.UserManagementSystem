export interface ISendMessageDto {
  recipient: string;
  subject: string;
  body: string;
}
export interface IMessageDto extends ISendMessageDto {
  id: number;
  sender: string;
  sentDate: string;
}