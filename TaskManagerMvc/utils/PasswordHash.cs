using BCrypt.Net;


public static class PasswordHasher{

    public static string HashPassword(string password){
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public static bool verifyPassword(string password, string HashedPassword){
        return BCrypt.Net.BCrypt.Verify(password,HashedPassword);
    }
}