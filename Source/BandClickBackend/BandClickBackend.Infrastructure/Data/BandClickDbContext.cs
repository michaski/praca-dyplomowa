using System;
using System.Linq;
using System.Threading.Tasks;
using BandClickBackend.Application.Interfaces;
using BandClickBackend.Domain.Common;
using BandClickBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BandClickBackend.Infrastructure.Data
{
    public class BandClickDbContext : DbContext
    {
        public DbSet<AccentedBeats> AccentedBeats { get; set; }
        public DbSet<Band> Bands { get; set; }
        public DbSet<BandRole> BandRoles { get; set; }
        public DbSet<Metre> Metres { get; set; }
        public DbSet<MetronomeSettings> MetronomeSettings { get; set; }
        public DbSet<MetronomeSettingsComment> MetronomeSettingsComments { get; set; }
        public DbSet<MetronomeSettingsInPlaylist> MetronomeSettingsInPlaylists { get; set; }
        public DbSet<MetronomeSettingsType> MetronomeSettingsTypes { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<PlaylistComment> PlaylistsComments { get; set; }
        public DbSet<PlaylistsSharedInBand> PlaylistsSharedInBands { get; set; }
        public DbSet<RhythmicUnit> RhythmicUnits { get; set; }
        public DbSet<SystemRole> SystemRoles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserInBands> UsersInBands { get; set; }

        public BandClickDbContext(DbContextOptions<BandClickDbContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserInBands>()
                .HasOne(uib => uib.Band)
                .WithMany(b => b.Members)
                .HasForeignKey(uib => uib.BandId);
            modelBuilder.Entity<UserInBands>()
                .HasOne(uib => uib.Member)
                .WithMany(u => u.Bands)
                .HasForeignKey(uib => uib.MemberId);

            modelBuilder.Entity<MetronomeSettingsInPlaylist>()
                .HasOne(msip => msip.MetronomeSettings)
                .WithMany(ms => ms.Playlists)
                .HasForeignKey(msip => msip.MetronomeSettingsId);
            modelBuilder.Entity<MetronomeSettingsInPlaylist>()
                .HasOne(msip => msip.Playlist)
                .WithMany(p => p.MetronomeSettings)
                .HasForeignKey(msip => msip.PlaylistId);

            modelBuilder.Entity<PlaylistsSharedInBand>()
                .HasOne(psib => psib.Playlist)
                .WithMany(p => p.Bands)
                .HasForeignKey(psib => psib.PlaylistId);
            modelBuilder.Entity<PlaylistsSharedInBand>()
                .HasOne(psib => psib.Band)
                .WithMany(b => b.Playlists)
                .HasForeignKey(psib => psib.BandId);

            modelBuilder.Entity<MetronomeSettingsComment>()
                .HasOne(msc => msc.CreatedBy)
                .WithMany(u => u.MetronomeSettingsComment)
                .HasForeignKey(msc => msc.CreatedById);
            modelBuilder.Entity<MetronomeSettingsComment>()
                .HasOne(msc => msc.MetronomeSettings)
                .WithMany(ms => ms.Comments)
                .HasForeignKey(msc => msc.MetronomeSettingsId);

            modelBuilder.Entity<PlaylistComment>()
                .HasOne(pc => pc.CreatedBy)
                .WithMany(u => u.PlaylistComments)
                .HasForeignKey(pc => pc.CreatedById);
            modelBuilder.Entity<PlaylistComment>()
                .HasOne(pc => pc.Playlist)
                .WithMany(p => p.Comments)
                .HasForeignKey(pc => pc.PlaylistId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.MetronomeSettings)
                .WithOne(ms => ms.CreatedBy);
            modelBuilder.Entity<MetronomeSettings>()
                .HasOne(ms => ms.CreatedBy)
                .WithMany(u => u.MetronomeSettings);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Playlists)
                .WithOne(p => p.CreatedBy);
            modelBuilder.Entity<Playlist>()
                .HasOne(p => p.CreatedBy)
                .WithMany(u => u.Playlists);
        }

        public async Task<int> SaveChangesSignInAsync(IUserContextService userContextService)
        {
            var auditableEntities = ChangeTracker.Entries<AuditableEntity>();
            foreach (var auditableEntity in auditableEntities)
            {
                if (auditableEntity.State == EntityState.Added)
                {
                    auditableEntity.Entity.CreatedBy = Users.SingleOrDefault(u => u.Id == userContextService.UserId);
                    auditableEntity.Entity.Created = DateTime.Now;
                }
                //else if (auditableEntity.State == EntityState.Modified)
                //{
                    auditableEntity.Entity.LastModifiedBy = Users.SingleOrDefault(u => u.Id == userContextService.UserId);
                    auditableEntity.Entity.LastModifiedById = (Guid)userContextService.UserId;
                    auditableEntity.Entity.LastModified = DateTime.Now;
                //}
            }
            return await SaveChangesAsync();
        }
    }
}
