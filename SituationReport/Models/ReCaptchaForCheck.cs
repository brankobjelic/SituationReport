namespace SituationReport.Models
{
    public class ReCaptchaForCheck
    {
        public string? Secret { get; set; }
        public string? Response { get; set; }   //token from frontend
    }
}
