using Management.Api.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Reflection;
using System.Reflection.Emit;
namespace Management.Api.Infrastructure.DbContext
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Log> Logs { get; set; }
        public DbSet<Message> Messages { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Additional configurations can be added here
            builder.Entity<ApplicationUser>(e =>
            {
                e.ToTable("Users");
            });
            builder.Entity<IdentityUserClaim<string>>(e => {
                e.ToTable("UserClaims");
            });
            builder.Entity<IdentityUserLogin<string>>(e => {
                e.ToTable("UserLogins");
            });
            builder.Entity<IdentityUserToken<string>>(e => {
                e.ToTable("UserToken");
            });
            builder.Entity<IdentityRole>(e => {
                e.ToTable("Roles");
            });
            builder.Entity<IdentityRoleClaim<string>>(e => {
                e.ToTable("RoleClaims");
            });
            builder.Entity<IdentityUserRole<string>>(e => {
                e.ToTable("UserRoles");
            });
            builder.Entity<Log>()
            .Property(l => l.Id)
            .ValueGeneratedNever();
            // Apply global filter for all entities inheriting BaseEntity<TId>
            foreach (var entityType in builder.Model.GetEntityTypes())
            {
                if (typeof(BaseEntity<>).IsAssignableFrom(entityType.ClrType.BaseType))
                {
                    var method = typeof(AppDbContext)
                        .GetMethod(nameof(SetSoftDeleteFilter), BindingFlags.NonPublic | BindingFlags.Static)!
                        .MakeGenericMethod(entityType.ClrType);

                    method.Invoke(null, new object[] { builder });
                }
            }
        }
        private static void SetSoftDeleteFilter<TEntity>(ModelBuilder builder)
        where TEntity : BaseEntity<Guid>
        {
            builder.Entity<TEntity>().HasQueryFilter(e => !e.IsDeleted);
        }
    }
}
