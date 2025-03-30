using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AcquisitionsAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddIsActiveToAcquisition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Acquisitions",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Acquisitions");
        }
    }
}
