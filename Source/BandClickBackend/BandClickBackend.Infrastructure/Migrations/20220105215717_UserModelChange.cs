using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BandClickBackend.Infrastructure.Migrations
{
    public partial class UserModelChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccentedBeats_Metres_MetreId",
                table: "AccentedBeats");

            migrationBuilder.DropColumn(
                name: "Surname",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Users",
                newName: "Username");

            migrationBuilder.AlterColumn<Guid>(
                name: "MetreId",
                table: "AccentedBeats",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AccentedBeats_Metres_MetreId",
                table: "AccentedBeats",
                column: "MetreId",
                principalTable: "Metres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccentedBeats_Metres_MetreId",
                table: "AccentedBeats");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Users",
                newName: "Surname");

            migrationBuilder.AddColumn<string>(
                name: "Surname",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "MetreId",
                table: "AccentedBeats",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddForeignKey(
                name: "FK_AccentedBeats_Metres_MetreId",
                table: "AccentedBeats",
                column: "MetreId",
                principalTable: "Metres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
