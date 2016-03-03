namespace Reference.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TrackerPendingChanges : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Assignments", "Description", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Assignments", "Description", c => c.String());
        }
    }
}
