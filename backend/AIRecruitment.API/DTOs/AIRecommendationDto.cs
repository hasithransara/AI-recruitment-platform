public class AIRecommendationDto
{
    public string Recommendation { get; set; } = "";

    public string Level { get; set; } = "";

    public List<string> Strengths { get; set; } = new();

    public List<string> Weaknesses { get; set; } = new();
}