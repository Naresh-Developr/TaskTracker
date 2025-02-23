using System;
using System.ComponentModel.DataAnnotations.Schema;

public class Task
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public int Status { get; set; }  // e.g., 0 = Pending, 1 = In Progress, 2 = Completed

    // Foreign Key to Project
    public int ProjectId { get; set; }
    [ForeignKey(nameof(ProjectId))]
    public Project? Project { get; set; }

    // Assigned User
    public int AssignedToUserId { get; set; }
    [ForeignKey(nameof(AssignedToUserId))]
    public User? AssignedUser { get; set; }
}


public class CreateTaskDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public int Status { get; set; }
    public int ProjectId { get; set; }
    public int AssignedToUserId { get; set; }
}

