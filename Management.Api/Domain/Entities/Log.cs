namespace Management.Api.Domain.Entities
{
    public class Log :BaseEntity<Guid>
    {
        public string? UserName { get; set; }
        public string Description { get; set; }
    }
}
