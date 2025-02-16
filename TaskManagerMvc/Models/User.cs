using System.ComponentModel.DataAnnotations.Schema;

public class User 
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string passwordHash { get; set; }

    public int RoleId { get; set; } = 1;

    // Use the same name as the table or just 'Role'
    [ForeignKey(nameof(RoleId))]
    public Roles? Role { get; set; }

    public ICollection<Task> Tasks { get; set; } = new List<Task>();
}


    public class SignInRequest
    {
        public string Email { get; set; }
        public string passwordHash { get; set; }
    }

