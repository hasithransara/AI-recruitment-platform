using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AIRecruitment.API.Migrations
{
    /// <inheritdoc />
    public partial class AddApplicationMatchResults : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "MatchScore",
                table: "Applications",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MatchedSkills",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MissingSkills",
                table: "Applications",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MatchScore",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "MatchedSkills",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "MissingSkills",
                table: "Applications");
        }
    }
}
