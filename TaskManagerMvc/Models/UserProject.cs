public class UserProject
{
    public int UserId { get; set; }
    public User User { get; set; }

    public int ProjectId { get; set; }
    public Project Project { get; set; }
}

public class AssignProjectRequest
    {
        public int ProjectId { get; set; }
        public List<int> UserIds { get; set; }
    }
