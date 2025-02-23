using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    { }

    public DbSet<User> Users { get; set; }
    public DbSet<Roles> Roles { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Task> Tasks { get; set; }
    public DbSet<UserProject> UserProjects { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure composite key for UserProject (if using many-to-many join table)
        modelBuilder.Entity<UserProject>()
            .HasKey(up => new { up.UserId, up.ProjectId });

        // Configure relationships if needed
    }
}
