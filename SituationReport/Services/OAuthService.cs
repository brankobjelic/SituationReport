using Google.Apis.Auth;

namespace SituationReport.Services
{
    public static class OAuthService
    {
        public static async Task<GoogleJsonWebSignature.Payload?> VerifyGoogleTokenId(string token)
        {
            try
            {
                // uncomment these lines if you want to add settings: 
                // var validationSettings = new GoogleJsonWebSignature.ValidationSettings
                // { 
                //     Audience = new string[] { "yourServerClientIdFromGoogleConsole.apps.googleusercontent.com" }
                // };
                // Add your settings and then get the payload
                // GoogleJsonWebSignature.Payload payload =  await GoogleJsonWebSignature.ValidateAsync(token, validationSettings);

                // Or Get the payload without settings.
                GoogleJsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(token);

                return payload;
            }
            catch (System.Exception)
            {
                return null;
            }
        }
    }
}
