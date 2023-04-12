namespace SituationReport.Interfaces
{
    public interface IReCaptchaService
    {
        Task<bool> CheckToken(string token);
    }
}
