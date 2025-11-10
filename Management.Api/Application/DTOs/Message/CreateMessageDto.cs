namespace Management.Api.Application.DTOs.Message
{
    public class CreateMessageDto
    {
        public string Recipient { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
}
