namespace Reference.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Record : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Records",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FilePath = c.String(nullable: false),
                        FileName = c.String(nullable: false),
                        DisplayName = c.String(nullable: false),
                        UploadDate = c.DateTime(nullable: false),
                        UploadedBy = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Records");
        }
    }
}
