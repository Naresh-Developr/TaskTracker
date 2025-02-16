using Microsoft.EntityFrameworkCore;


public class AppDbContext : DbContext
{
    public DbSet<Task> Tasks {get; set;}

    public DbSet<User> Users {get; set;}
    
    public DbSet<Roles> Roles {get; set;}

    public AppDbContext(DbContextOptions<AppDbContext> options) :base(options){}

    // protected override void OnModelCreating(ModelBuilder modelBuilder)
    // {
    //     base.OnModelCreating(modelBuilder);

    //     modelBuilder.Entity<Roles>().HasData(
    //         new Roles {RoleId = 1, RoleName = "user"},
    //         new Roles {RoleId = 2, RoleName="admin"}
    //     );

    //     modelBuilder.Entity<User>()
    //             .Property(u => u.RoleId)
    //             .HasDefaultValue(1);
    // }

}