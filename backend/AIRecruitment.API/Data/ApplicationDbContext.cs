using AIRecruitment.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AIRecruitment.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext>
                options
        ) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<CandidateProfile>
            CandidateProfiles
        { get; set; }

        public DbSet<Job> Jobs { get; set; }

        public DbSet<Application>
            Applications
        { get; set; }

        public DbSet<InterviewFeedback>
            InterviewFeedbacks
        { get; set; }

        protected override void OnModelCreating(
            ModelBuilder modelBuilder
        )
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CandidateProfile>()
                .HasOne(profile => profile.User)
                .WithOne(user =>
                    user.CandidateProfile
                )
                .HasForeignKey<CandidateProfile>(
                    profile => profile.UserId
                );

            modelBuilder.Entity<Application>()
                .HasOne(application =>
                    application.User
                )
                .WithMany()
                .HasForeignKey(application =>
                    application.UserId
                )
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Application>()
                .HasOne(application =>
                    application.Job
                )
                .WithMany()
                .HasForeignKey(application =>
                    application.JobId
                )
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<InterviewFeedback>()
                .HasOne(feedback =>
                    feedback.Application
                )
                .WithOne(application =>
                    application.InterviewFeedback
                )
                .HasForeignKey<InterviewFeedback>(
                    feedback =>
                        feedback.ApplicationId
                )
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<InterviewFeedback>()
                .HasOne(feedback =>
                    feedback.HiringManager
                )
                .WithMany()
                .HasForeignKey(feedback =>
                    feedback.HiringManagerUserId
                )
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<InterviewFeedback>()
                .HasIndex(feedback =>
                    feedback.ApplicationId
                )
                .IsUnique();

            modelBuilder.Entity<InterviewFeedback>()
                .Property(feedback =>
                    feedback.Recommendation
                )
                .HasDefaultValue("Pending");

            modelBuilder.Entity<InterviewFeedback>()
                .Property(feedback =>
                    feedback.Decision
                )
                .HasDefaultValue("Pending");
        }
    }
}