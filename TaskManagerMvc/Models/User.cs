

    public class User {

        public int Id {get; set;}
        public string Name {get; set;}
        public string Email {get; set;}
        public string passwordHash {get; set;}

        public ICollection<Task> Tasks {get; set;}  = new List<Task>();
    }


    public class SignInRequest
    {
        public string Email { get; set; }
        public string passwordHash { get; set; }
    }

