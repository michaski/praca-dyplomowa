using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BandClickBackend.Infrastructure.Migrations
{
    public partial class Raitings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NegativeRaitingCount",
                table: "Playlists");

            migrationBuilder.DropColumn(
                name: "PositiveRaitingCount",
                table: "Playlists");

            migrationBuilder.DropColumn(
                name: "NegativeRaitingCount",
                table: "MetronomeSettings");

            migrationBuilder.DropColumn(
                name: "PositiveRaitingCount",
                table: "MetronomeSettings");

            migrationBuilder.CreateTable(
                name: "MetronomeSettingsRaitings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MetronomeSettingsId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsPositive = table.Column<bool>(type: "boolean", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetronomeSettingsRaitings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MetronomeSettingsRaitings_MetronomeSettings_MetronomeSettin~",
                        column: x => x.MetronomeSettingsId,
                        principalTable: "MetronomeSettings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MetronomeSettingsRaitings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlaylistRaitings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PlaylistId = table.Column<Guid>(type: "uuid", nullable: false),
                    IsPositive = table.Column<bool>(type: "boolean", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaylistRaitings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlaylistRaitings_Playlists_PlaylistId",
                        column: x => x.PlaylistId,
                        principalTable: "Playlists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlaylistRaitings_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MetronomeSettingsRaitings_MetronomeSettingsId",
                table: "MetronomeSettingsRaitings",
                column: "MetronomeSettingsId");

            migrationBuilder.CreateIndex(
                name: "IX_MetronomeSettingsRaitings_UserId",
                table: "MetronomeSettingsRaitings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaylistRaitings_PlaylistId",
                table: "PlaylistRaitings",
                column: "PlaylistId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaylistRaitings_UserId",
                table: "PlaylistRaitings",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MetronomeSettingsRaitings");

            migrationBuilder.DropTable(
                name: "PlaylistRaitings");

            migrationBuilder.AddColumn<int>(
                name: "NegativeRaitingCount",
                table: "Playlists",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PositiveRaitingCount",
                table: "Playlists",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NegativeRaitingCount",
                table: "MetronomeSettings",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PositiveRaitingCount",
                table: "MetronomeSettings",
                type: "integer",
                nullable: true);
        }
    }
}
