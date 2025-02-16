
using System.ComponentModel.DataAnnotations;

public class Roles {
    [Key]
    public int RoleId {get; set;}
    public string RoleName {get; set;} // = new string("");
}