using Microsoft.EntityFrameworkCore.Migrations;

namespace BandClickBackend.Infrastructure.Migrations
{
    public partial class FixTypoNumberOfMeasures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NumberOdMeasures",
                table: "MetronomeSettings",
                newName: "NumberOfMeasures");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NumberOfMeasures",
                table: "MetronomeSettings",
                newName: "NumberOdMeasures");
        }
    }
}
