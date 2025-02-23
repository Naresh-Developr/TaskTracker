using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

public class Project
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int Status { get; set; }  // e.g., 0 = Pending, 1 = In Progress, 2 = Completed

    public ICollection<UserProject> UserProjects { get; set; } = new List<UserProject>();
    public ICollection<Task> Tasks { get; set; } = new List<Task>();
}
