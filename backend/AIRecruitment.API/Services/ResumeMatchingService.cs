using AIRecruitment.API.Interfaces;
using AIRecruitment.API.Models;
using System.Text.RegularExpressions;

namespace AIRecruitment.API.Services
{
    public class ResumeMatchingService
        : IResumeMatchingService
    {
        private static readonly List<string> SkillCatalog =
            new()
            {
                "html",
                "css",
                "javascript",
                "typescript",
                "react",
                "angular",
                "vue",
                "node.js",
                "express",
                "c#",
                ".net",
                "asp.net",
                "java",
                "spring boot",
                "python",
                "django",
                "flask",
                "php",
                "laravel",
                "sql",
                "mysql",
                "sql server",
                "postgresql",
                "mongodb",
                "firebase",
                "git",
                "github",
                "docker",
                "kubernetes",
                "azure",
                "aws",
                "google cloud",
                "rest api",
                "graphql",
                "entity framework",
                "tailwind css",
                "bootstrap",
                "figma",
                "selenium",
                "postman",
                "jira",
                "agile",
                "scrum",
                "linux",
                "networking",
                "cybersecurity",
                "machine learning",
                "artificial intelligence",
                "data analysis",
                "power bi",
                "excel"
            };

        public ResumeMatchResult CalculateMatch(
            string? resumeText,
            string? jobDescription)
        {
            var result = new ResumeMatchResult();

            if (string.IsNullOrWhiteSpace(jobDescription))
            {
                return result;
            }

            var normalizedResume =
                NormalizeText(resumeText ?? string.Empty);

            var normalizedJob =
                NormalizeText(jobDescription);

            var requiredSkills = SkillCatalog
                .Where(skill =>
                    ContainsSkill(normalizedJob, skill))
                .Distinct(
                    StringComparer.OrdinalIgnoreCase
                )
                .ToList();

            if (requiredSkills.Count == 0)
            {
                return result;
            }

            result.MatchedSkills = requiredSkills
                .Where(skill =>
                    ContainsSkill(normalizedResume, skill))
                .ToList();

            result.MissingSkills = requiredSkills
                .Where(skill =>
                    !ContainsSkill(normalizedResume, skill))
                .ToList();

            result.MatchScore = Math.Round(
                (double)result.MatchedSkills.Count /
                requiredSkills.Count * 100,
                2
            );

            return result;
        }

        private static string NormalizeText(string text)
        {
            return Regex.Replace(
                text.ToLowerInvariant(),
                @"\s+",
                " "
            ).Trim();
        }

        private static bool ContainsSkill(
            string text,
            string skill)
        {
            var escapedSkill =
                Regex.Escape(skill.ToLowerInvariant());

            var pattern =
                $@"(?<![a-z0-9]){escapedSkill}(?![a-z0-9])";

            return Regex.IsMatch(
                text,
                pattern,
                RegexOptions.IgnoreCase
            );
        }
    }
}