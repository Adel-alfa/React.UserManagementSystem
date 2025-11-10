namespace Management.Api.Domain.Entities
{
    public class Message:BaseEntity<Guid>
    {
        public string Sender { get; set; } = string.Empty;
        public string Recipient { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public DateTime SentDate { get; private set; } = DateTime.UtcNow;
        public bool IsRead { get; private set; } = false;
        public void MarkAsRead()
        {
            IsRead = true;
            MarkUpdated();
        }
    }
}
