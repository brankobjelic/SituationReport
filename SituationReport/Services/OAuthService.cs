using Google.Apis.Auth;
using SituationReport.Interfaces;

namespace SituationReport.Services
{
    public  class OAuthService : IOAuthService
    {
        IConfiguration Configuration { get; }

        public OAuthService(IConfiguration configuration) {
            Configuration = configuration;
        }
        public  async Task<GoogleJsonWebSignature.Payload?> VerifyGoogleTokenId(string token)
        {
            try
            {
                 var validationSettings = new GoogleJsonWebSignature.ValidationSettings
                 {
                     Audience = new string[] { Configuration["Google:ClientId"] }
                 };
                //Add settings and then get the payload
                 GoogleJsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(token, validationSettings);

                // Or Get the payload without settings.
                //GoogleJsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(token);

                return payload;
            }
            catch (System.Exception)
            {
                return null;
            }
        }
    }
}
