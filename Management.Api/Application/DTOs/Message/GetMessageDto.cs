namespace Management.Api.Application.DTOs.Message
{
    public class GetMessageDto
    {
        public string Id { get; set; }
        public string Sender { get; set; }
        public string Recipient { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public DateTime SentDate { get; set; }= DateTime.UtcNow;
    }
}
