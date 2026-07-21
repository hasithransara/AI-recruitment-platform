using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AIRecruitment.API.Migrations
{
    /// <inheritdoc />
    public partial class AddResumeTextToCandidateProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ResumeText",
                table: "CandidateProfiles",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResumeText",
                table: "CandidateProfiles");
        }
    }
}
