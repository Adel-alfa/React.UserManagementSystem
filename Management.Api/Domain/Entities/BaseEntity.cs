using Management.Api.Domain.Interfaces;

namespace Management.Api.Domain.Entities
{
    public class BaseEntity<TId> : IEntity<TId>
    {
        public TId Id { get; set; } = default!;
        public DateTime CreationDate { get; private set; } = DateTime.UtcNow;
        public DateTime? LastModifiedDate { get; private set; }
        public bool IsDeleted { get; private set; } =false;
        public bool IsActive { get; private set; } = true;

        public void MarkUpdated()
        {
            LastModifiedDate = DateTime.UtcNow;
        }
        public void SoftDelete()
        {
            IsDeleted = true;
            MarkUpdated();
        }
        public void Deactivate()
        {
            IsActive = false;
            MarkUpdated();
        }
        public void Activate()
        {
            IsActive = true;
            MarkUpdated();
        }
    }
}
