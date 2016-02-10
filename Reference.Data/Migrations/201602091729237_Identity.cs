namespace Reference.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Identity : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AppRoles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Role = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.AppUserRoles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        AppUserId = c.Int(nullable: false),
                        AppRoleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AppRoles", t => t.AppRoleId)
                .ForeignKey("dbo.AppUsers", t => t.AppUserId)
                .Index(t => t.AppUserId)
                .Index(t => t.AppRoleId);
            
            CreateTable(
                "dbo.AppUsers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SamAccountName = c.String(nullable: false),
                        UserPrincipalName = c.String(nullable: false),
                        UserGuid = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.AppUserRoles", "AppUserId", "dbo.AppUsers");
            DropForeignKey("dbo.AppUserRoles", "AppRoleId", "dbo.AppRoles");
            DropIndex("dbo.AppUserRoles", new[] { "AppRoleId" });
            DropIndex("dbo.AppUserRoles", new[] { "AppUserId" });
            DropTable("dbo.AppUsers");
            DropTable("dbo.AppUserRoles");
            DropTable("dbo.AppRoles");
        }
    }
}
