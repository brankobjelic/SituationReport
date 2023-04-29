using Google.Apis.Auth;

namespace SituationReport.Interfaces
{
    public interface IOAuthService
    {
        Task<GoogleJsonWebSignature.Payload?> VerifyGoogleTokenId(string token);
    }
}
