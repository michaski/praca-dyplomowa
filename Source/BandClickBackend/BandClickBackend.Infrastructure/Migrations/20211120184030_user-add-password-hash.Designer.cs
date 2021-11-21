﻿// <auto-generated />
using System;
using BandClickBackend.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace BandClickBackend.Infrastructure.Migrations
{
    [DbContext(typeof(BandClickDbContext))]
    [Migration("20211120184030_user-add-password-hash")]
    partial class useraddpasswordhash
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.12")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("BandClickBackend.Domain.Entities.AccentedBeats", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("AccentedBeat")
                        .HasColumnType("integer");

                    b.Property<Guid?>("MetreId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("MetreId");

                    b.ToTable("AccentedBeats");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.Band", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Bands");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.BandRole", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("BandRoles");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.Metre", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("BeatsPerBar")
                        .HasColumnType("integer");

                    b.Property<Guid?>("RhythmicUnitId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("RhythmicUnitId");

                    b.ToTable("Metres");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.MetronomeSettings", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("CreatedById")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsShared")
                        .HasColumnType("boolean");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("LastModifiedById")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("MetreId")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int?>("NegativeRaitingCount")
                        .HasColumnType("integer");

                    b.Property<int>("NumberOdMeasures")
                        .HasColumnType("integer");

                    b.Property<int?>("PositiveRaitingCount")
                        .HasColumnType("integer");

                    b.Property<int>("Tempo")
                        .HasColumnType("integer");

                    b.Property<Guid?>("TypeId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("LastModifiedById");

                    b.HasIndex("MetreId");

                    b.HasIndex("TypeId");

                    b.ToTable("MetronomeSettings");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.MetronomeSettingsComment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("CreatedById")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("LastModifiedById")
                        .HasColumnType("uuid");

                    b.Property<Guid>("MetronomeSettingsId")
                        .HasColumnType("uuid");

                    b.Property<string>("Text")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("LastModifiedById");

                    b.HasIndex("MetronomeSettingsId");

                    b.ToTable("MetronomeSettingsComments");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.MetronomeSettingsInPlaylist", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("MetronomeSettingsId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("PlaylistId")
                        .HasColumnType("uuid");

                    b.Property<int>("PositionInPlaylist")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("MetronomeSettingsId");

                    b.HasIndex("PlaylistId");

                    b.ToTable("MetronomeSettingsInPlaylists");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.MetronomeSettingsType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("MetronomeSettingsTypes");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.Playlist", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("CreatedById")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsShared")
                        .HasColumnType("boolean");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("LastModifiedById")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int?>("NegativeRaitingCount")
                        .HasColumnType("integer");

                    b.Property<int?>("PositiveRaitingCount")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("LastModifiedById");

                    b.ToTable("Playlists");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.PlaylistComment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("CreatedById")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("LastModified")
                        .HasColumnType("timestamp without time zone");

                    b.Property<Guid>("LastModifiedById")
                        .HasColumnType("uuid");

                    b.Property<Guid>("PlaylistId")
                        .HasColumnType("uuid");

                    b.Property<string>("Text")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("LastModifiedById");

                    b.HasIndex("PlaylistId");

                    b.ToTable("PlaylistsComments");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.PlaylistsSharedInBand", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("BandId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("PlaylistId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("BandId");

                    b.HasIndex("PlaylistId");

                    b.ToTable("PlaylistsSharedInBands");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.RhythmicUnit", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("DisplayName")
                        .HasColumnType("text");

                    b.Property<int>("NumericValue")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.ToTable("RhythmicUnits");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.SystemRole", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("SystemRoles");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("Surname")
                        .HasColumnType("text");

                    b.Property<Guid?>("SystemRoleId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("SystemRoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.UserInBands", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("BandId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("BandRoleId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("MemberId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("BandId");

                    b.HasIndex("BandRoleId");

                    b.HasIndex("MemberId");

                    b.ToTable("UsersInBands");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.AccentedBeats", b =>
                {
                    b.HasOne("BandClickBackend.Domain.Entities.Metre", "Metre")
                        .WithMany("AccentedBeats")
                        .HasForeignKey("MetreId");

                    b.Navigation("Metre");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.Metre", b =>
                {
                    b.HasOne("BandClickBackend.Domain.Entities.RhythmicUnit", "RhythmicUnit")
                        .WithMany()
                        .HasForeignKey("RhythmicUnitId");

                    b.Navigation("RhythmicUnit");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.MetronomeSettings", b =>
                {
                    b.HasOne("BandClickBackend.Domain.Entities.User", "CreatedBy")
                        .WithMany("MetronomeSettings")
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BandClickBackend.Domain.Entities.User", "LastModifiedBy")
                        .WithMany()
                        .HasForeignKey("LastModifiedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BandClickBackend.Domain.Entities.Metre", "Metre")
                        .WithMany()
                        .HasForeignKey("MetreId");

                    b.HasOne("BandClickBackend.Domain.Entities.MetronomeSettingsType", "Type")
                        .WithMany()
                        .HasForeignKey("TypeId");

                    b.Navigation("CreatedBy");

                    b.Navigation("LastModifiedBy");

                    b.Navigation("Metre");

                    b.Navigation("Type");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.MetronomeSettingsComment", b =>
                {
                    b.HasOne("BandClickBackend.Domain.Entities.User", "CreatedBy")
                        .WithMany("MetronomeSettingsComment")
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BandClickBackend.Domain.Entities.User", "LastModifiedBy")
                        .WithMany()
                        .HasForeignKey("LastModifiedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BandClickBackend.Domain.Entities.MetronomeSettings", "MetronomeSettings")
                        .WithMany("Comments")
                        .HasForeignKey("MetronomeSettingsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreatedBy");

                    b.Navigation("LastModifiedBy");

                    b.Navigation("MetronomeSettings");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.MetronomeSettingsInPlaylist", b =>
                {
                    b.HasOne("BandClickBackend.Domain.Entities.MetronomeSettings", "MetronomeSettings")
                        .WithMany("Playlists")
                        .HasForeignKey("MetronomeSettingsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BandClickBackend.Domain.Entities.Playlist", "Playlist")
                        .WithMany("MetronomeSettings")
                        .HasForeignKey("PlaylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("MetronomeSettings");

                    b.Navigation("Playlist");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.Playlist", b =>
                {
                    b.HasOne("BandClickBackend.Domain.Entities.User", "CreatedBy")
                        .WithMany("Playlists")
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BandClickBackend.Domain.Entities.User", "LastModifiedBy")
                        .WithMany()
                        .HasForeignKey("LastModifiedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreatedBy");

                    b.Navigation("LastModifiedBy");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.PlaylistComment", b =>
                {
                    b.HasOne("BandClickBackend.Domain.Entities.User", "CreatedBy")
                        .WithMany("PlaylistComments")
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BandClickBackend.Domain.Entities.User", "LastModifiedBy")
                        .WithMany()
                        .HasForeignKey("LastModifiedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BandClickBackend.Domain.Entities.Playlist", "Playlist")
                        .WithMany("Comments")
                        .HasForeignKey("PlaylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CreatedBy");

                    b.Navigation("LastModifiedBy");

                    b.Navigation("Playlist");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.PlaylistsSharedInBand", b =>
                {
                    b.HasOne("BandClickBackend.Domain.Entities.Band", "Band")
                        .WithMany("Playlists")
                        .HasForeignKey("BandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BandClickBackend.Domain.Entities.Playlist", "Playlist")
                        .WithMany("Bands")
                        .HasForeignKey("PlaylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Band");

                    b.Navigation("Playlist");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.User", b =>
                {
                    b.HasOne("BandClickBackend.Domain.Entities.SystemRole", "SystemRole")
                        .WithMany()
                        .HasForeignKey("SystemRoleId");

                    b.Navigation("SystemRole");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.UserInBands", b =>
                {
                    b.HasOne("BandClickBackend.Domain.Entities.Band", "Band")
                        .WithMany("Members")
                        .HasForeignKey("BandId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BandClickBackend.Domain.Entities.BandRole", "BandRole")
                        .WithMany()
                        .HasForeignKey("BandRoleId");

                    b.HasOne("BandClickBackend.Domain.Entities.User", "Member")
                        .WithMany("Bands")
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Band");

                    b.Navigation("BandRole");

                    b.Navigation("Member");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.Band", b =>
                {
                    b.Navigation("Members");

                    b.Navigation("Playlists");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.Metre", b =>
                {
                    b.Navigation("AccentedBeats");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.MetronomeSettings", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Playlists");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.Playlist", b =>
                {
                    b.Navigation("Bands");

                    b.Navigation("Comments");

                    b.Navigation("MetronomeSettings");
                });

            modelBuilder.Entity("BandClickBackend.Domain.Entities.User", b =>
                {
                    b.Navigation("Bands");

                    b.Navigation("MetronomeSettings");

                    b.Navigation("MetronomeSettingsComment");

                    b.Navigation("PlaylistComments");

                    b.Navigation("Playlists");
                });
#pragma warning restore 612, 618
        }
    }
}