namespace Management.Api.Domain.TypeSafe
{
    //Constants
    public enum RoleType
    {
        Admin,
        User,
        Manager
    }

    public static class StaticRoles
    {
        public const string Owner = "OWNER";
        public const string Admin = "ADMIN";
        public const string User = "USER";      
        public const string Manager = "MANAGER";

        public const string OwnerAdmin = "OWNER,ADMIN";
        
        public const string OwnerAdminManager = Manager + "," + Admin + "," + Manager;
        public const string All = Owner + "," + Admin + "," + Manager + ","  + User; 

    }
}
