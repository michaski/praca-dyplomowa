using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BandClickBackend.Infrastructure.Migrations
{
    public partial class first : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BandRoles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BandRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Bands",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MetronomeSettingsTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetronomeSettingsTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RhythmicUnits",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NumericValue = table.Column<int>(type: "integer", nullable: false),
                    DisplayName = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RhythmicUnits", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SystemRoles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Metres",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BeatsPerBar = table.Column<int>(type: "integer", nullable: false),
                    RhythmicUnitId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Metres", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Metres_RhythmicUnits_RhythmicUnitId",
                        column: x => x.RhythmicUnitId,
                        principalTable: "RhythmicUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Surname = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    SystemRoleId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_SystemRoles_SystemRoleId",
                        column: x => x.SystemRoleId,
                        principalTable: "SystemRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AccentedBeats",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MetreId = table.Column<Guid>(type: "uuid", nullable: true),
                    AccentedBeat = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccentedBeats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccentedBeats_Metres_MetreId",
                        column: x => x.MetreId,
                        principalTable: "Metres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MetronomeSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    NumberOdMeasures = table.Column<int>(type: "integer", nullable: false),
                    Tempo = table.Column<int>(type: "integer", nullable: false),
                    MetreId = table.Column<Guid>(type: "uuid", nullable: true),
                    TypeId = table.Column<Guid>(type: "uuid", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedById = table.Column<Guid>(type: "uuid", nullable: false),
                    LastModified = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifiedById = table.Column<Guid>(type: "uuid", nullable: false),
                    IsShared = table.Column<bool>(type: "boolean", nullable: false),
                    PositiveRaitingCount = table.Column<int>(type: "integer", nullable: true),
                    NegativeRaitingCount = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetronomeSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MetronomeSettings_Metres_MetreId",
                        column: x => x.MetreId,
                        principalTable: "Metres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MetronomeSettings_MetronomeSettingsTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "MetronomeSettingsTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MetronomeSettings_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MetronomeSettings_Users_LastModifiedById",
                        column: x => x.LastModifiedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Playlists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedById = table.Column<Guid>(type: "uuid", nullable: false),
                    LastModified = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifiedById = table.Column<Guid>(type: "uuid", nullable: false),
                    IsShared = table.Column<bool>(type: "boolean", nullable: false),
                    PositiveRaitingCount = table.Column<int>(type: "integer", nullable: true),
                    NegativeRaitingCount = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Playlists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Playlists_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Playlists_Users_LastModifiedById",
                        column: x => x.LastModifiedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsersInBands",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BandId = table.Column<Guid>(type: "uuid", nullable: false),
                    MemberId = table.Column<Guid>(type: "uuid", nullable: false),
                    BandRoleId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersInBands", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UsersInBands_BandRoles_BandRoleId",
                        column: x => x.BandRoleId,
                        principalTable: "BandRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UsersInBands_Bands_BandId",
                        column: x => x.BandId,
                        principalTable: "Bands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersInBands_Users_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MetronomeSettingsComments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: true),
                    MetronomeSettingsId = table.Column<Guid>(type: "uuid", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedById = table.Column<Guid>(type: "uuid", nullable: false),
                    LastModified = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifiedById = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetronomeSettingsComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MetronomeSettingsComments_MetronomeSettings_MetronomeSettin~",
                        column: x => x.MetronomeSettingsId,
                        principalTable: "MetronomeSettings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MetronomeSettingsComments_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MetronomeSettingsComments_Users_LastModifiedById",
                        column: x => x.LastModifiedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MetronomeSettingsInPlaylists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MetronomeSettingsId = table.Column<Guid>(type: "uuid", nullable: false),
                    PlaylistId = table.Column<Guid>(type: "uuid", nullable: false),
                    PositionInPlaylist = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MetronomeSettingsInPlaylists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MetronomeSettingsInPlaylists_MetronomeSettings_MetronomeSet~",
                        column: x => x.MetronomeSettingsId,
                        principalTable: "MetronomeSettings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MetronomeSettingsInPlaylists_Playlists_PlaylistId",
                        column: x => x.PlaylistId,
                        principalTable: "Playlists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlaylistsComments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Text = table.Column<string>(type: "text", nullable: true),
                    PlaylistId = table.Column<Guid>(type: "uuid", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    CreatedById = table.Column<Guid>(type: "uuid", nullable: false),
                    LastModified = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    LastModifiedById = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaylistsComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlaylistsComments_Playlists_PlaylistId",
                        column: x => x.PlaylistId,
                        principalTable: "Playlists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlaylistsComments_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlaylistsComments_Users_LastModifiedById",
                        column: x => x.LastModifiedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlaylistsSharedInBands",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BandId = table.Column<Guid>(type: "uuid", nullable: false),
                    PlaylistId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaylistsSharedInBands", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlaylistsSharedInBands_Bands_BandId",
                        column: x => x.BandId,
                        principalTable: "Bands",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlaylistsSharedInBands_Playlists_PlaylistId",
                        column: x => x.PlaylistId,
                        principalTable: "Playlists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccentedBeats_MetreId",
                table: "AccentedBeats",
                column: "MetreId");

            migrationBuilder.CreateIndex(
                name: "IX_Metres_RhythmicUnitId",
                table: "Metres",
                column: "RhythmicUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_MetronomeSettings_CreatedById",
                table: "MetronomeSettings",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_MetronomeSettings_LastModifiedById",
                table: "MetronomeSettings",
                column: "LastModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_MetronomeSettings_MetreId",
                table: "MetronomeSettings",
                column: "MetreId");

            migrationBuilder.CreateIndex(
                name: "IX_MetronomeSettings_TypeId",
                table: "MetronomeSettings",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_MetronomeSettingsComments_CreatedById",
                table: "MetronomeSettingsComments",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_MetronomeSettingsComments_LastModifiedById",
                table: "MetronomeSettingsComments",
                column: "LastModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_MetronomeSettingsComments_MetronomeSettingsId",
                table: "MetronomeSettingsComments",
                column: "MetronomeSettingsId");

            migrationBuilder.CreateIndex(
                name: "IX_MetronomeSettingsInPlaylists_MetronomeSettingsId",
                table: "MetronomeSettingsInPlaylists",
                column: "MetronomeSettingsId");

            migrationBuilder.CreateIndex(
                name: "IX_MetronomeSettingsInPlaylists_PlaylistId",
                table: "MetronomeSettingsInPlaylists",
                column: "PlaylistId");

            migrationBuilder.CreateIndex(
                name: "IX_Playlists_CreatedById",
                table: "Playlists",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Playlists_LastModifiedById",
                table: "Playlists",
                column: "LastModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_PlaylistsComments_CreatedById",
                table: "PlaylistsComments",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_PlaylistsComments_LastModifiedById",
                table: "PlaylistsComments",
                column: "LastModifiedById");

            migrationBuilder.CreateIndex(
                name: "IX_PlaylistsComments_PlaylistId",
                table: "PlaylistsComments",
                column: "PlaylistId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaylistsSharedInBands_BandId",
                table: "PlaylistsSharedInBands",
                column: "BandId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaylistsSharedInBands_PlaylistId",
                table: "PlaylistsSharedInBands",
                column: "PlaylistId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SystemRoleId",
                table: "Users",
                column: "SystemRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersInBands_BandId",
                table: "UsersInBands",
                column: "BandId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersInBands_BandRoleId",
                table: "UsersInBands",
                column: "BandRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersInBands_MemberId",
                table: "UsersInBands",
                column: "MemberId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccentedBeats");

            migrationBuilder.DropTable(
                name: "MetronomeSettingsComments");

            migrationBuilder.DropTable(
                name: "MetronomeSettingsInPlaylists");

            migrationBuilder.DropTable(
                name: "PlaylistsComments");

            migrationBuilder.DropTable(
                name: "PlaylistsSharedInBands");

            migrationBuilder.DropTable(
                name: "UsersInBands");

            migrationBuilder.DropTable(
                name: "MetronomeSettings");

            migrationBuilder.DropTable(
                name: "Playlists");

            migrationBuilder.DropTable(
                name: "BandRoles");

            migrationBuilder.DropTable(
                name: "Bands");

            migrationBuilder.DropTable(
                name: "Metres");

            migrationBuilder.DropTable(
                name: "MetronomeSettingsTypes");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "RhythmicUnits");

            migrationBuilder.DropTable(
                name: "SystemRoles");
        }
    }
}
