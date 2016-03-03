namespace Reference.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Tracker : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Assignments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CategoryId = c.Int(nullable: false),
                        Description = c.String(),
                        Hours = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Categories", t => t.CategoryId)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Assignments", "CategoryId", "dbo.Categories");
            DropIndex("dbo.Assignments", new[] { "CategoryId" });
            DropTable("dbo.Categories");
            DropTable("dbo.Assignments");
        }
    }
}
