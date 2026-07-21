using AIRecruitment.API.Data;
using AIRecruitment.API.DTOs;
using AIRecruitment.API.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Text;
using UglyToad.PdfPig;
using UglyToad.PdfPig.DocumentLayoutAnalysis.TextExtractor;

namespace AIRecruitment.API.Repositories
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public ProfileRepository(
            ApplicationDbContext context,
            IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task<ProfileDto?> GetProfileAsync(int userId)
        {
            var profile = await _context.CandidateProfiles
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.UserId == userId);

            if (profile == null)
                return null;

            return new ProfileDto
            {
                FullName = profile.User!.FullName,
                Email = profile.User.Email,
                Phone = profile.Phone,
                Address = profile.Address,
                City = profile.City,
                Country = profile.Country,
                LinkedIn = profile.LinkedIn,
                GitHub = profile.GitHub,
                Portfolio = profile.Portfolio,
                AboutMe = profile.AboutMe,
                ResumeUrl = profile.ResumeUrl,
                ProfileImage = profile.ProfileImage
            };
        }

        public async Task<bool> UpdateProfileAsync(
            int userId,
            UpdateProfileDto dto)
        {
            var profile = await _context.CandidateProfiles
                .FirstOrDefaultAsync(x => x.UserId == userId);

            if (profile == null)
                return false;

            profile.Phone = dto.Phone;
            profile.Address = dto.Address;
            profile.City = dto.City;
            profile.Country = dto.Country;
            profile.LinkedIn = dto.LinkedIn;
            profile.GitHub = dto.GitHub;
            profile.Portfolio = dto.Portfolio;
            profile.AboutMe = dto.AboutMe;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<string?> UploadResumeAsync(
            int userId,
            IFormFile file)
        {
            var profile = await _context.CandidateProfiles
                .FirstOrDefaultAsync(x => x.UserId == userId);

            if (profile == null)
                return null;

            if (file == null || file.Length == 0)
                return null;

            var extension = Path
                .GetExtension(file.FileName)
                .ToLowerInvariant();

            if (extension != ".pdf")
            {
                throw new InvalidOperationException(
                    "Only PDF files are allowed."
                );
            }

            // Maximum file size: 5 MB
            const long maximumFileSize = 5 * 1024 * 1024;

            if (file.Length > maximumFileSize)
            {
                throw new InvalidOperationException(
                    "Resume file size cannot exceed 5 MB."
                );
            }

            var webRootPath = _environment.WebRootPath;

            if (string.IsNullOrWhiteSpace(webRootPath))
            {
                webRootPath = Path.Combine(
                    _environment.ContentRootPath,
                    "wwwroot"
                );
            }

            var uploadsFolder = Path.Combine(
                webRootPath,
                "uploads",
                "resumes"
            );

            Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}.pdf";

            var filePath = Path.Combine(
                uploadsFolder,
                fileName
            );

            try
            {
                await using (var stream = new FileStream(
                    filePath,
                    FileMode.Create,
                    FileAccess.Write,
                    FileShare.None))
                {
                    await file.CopyToAsync(stream);
                }

                var extractedText = ExtractTextFromPdf(filePath);

                if (string.IsNullOrWhiteSpace(extractedText))
                {
                    DeleteFileIfExists(filePath);

                    throw new InvalidOperationException(
                        "No readable text was found in the PDF. " +
                        "Please upload a text-based PDF resume."
                    );
                }

                // Remove the previous resume file after the new file
                // has been saved and read successfully.
                DeleteOldResume(profile.ResumeUrl, webRootPath);

                profile.ResumeUrl =
                    $"/uploads/resumes/{fileName}";

                profile.ResumeText = extractedText;

                await _context.SaveChangesAsync();

                return profile.ResumeUrl;
            }
            catch
            {
                DeleteFileIfExists(filePath);
                throw;
            }
        }

        private static string ExtractTextFromPdf(string filePath)
        {
            var textBuilder = new StringBuilder();

            using var document = PdfDocument.Open(filePath);

            foreach (var page in document.GetPages())
            {
                var pageText =
                    ContentOrderTextExtractor.GetText(page);

                if (!string.IsNullOrWhiteSpace(pageText))
                {
                    textBuilder.AppendLine(pageText);
                }
            }

            return NormalizeText(textBuilder.ToString());
        }

        private static string NormalizeText(string text)
        {
            if (string.IsNullOrWhiteSpace(text))
                return string.Empty;

            var lines = text
                .Replace("\r\n", "\n")
                .Replace('\r', '\n')
                .Split('\n')
                .Select(line => line.Trim())
                .Where(line => !string.IsNullOrWhiteSpace(line));

            return string.Join(
                Environment.NewLine,
                lines
            );
        }

        private static void DeleteOldResume(
            string? resumeUrl,
            string webRootPath)
        {
            if (string.IsNullOrWhiteSpace(resumeUrl))
                return;

            var relativePath = resumeUrl
                .TrimStart('/')
                .Replace(
                    '/',
                    Path.DirectorySeparatorChar
                );

            var oldFilePath = Path.Combine(
                webRootPath,
                relativePath
            );

            DeleteFileIfExists(oldFilePath);
        }

        private static void DeleteFileIfExists(
            string filePath)
        {
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }
    }
}