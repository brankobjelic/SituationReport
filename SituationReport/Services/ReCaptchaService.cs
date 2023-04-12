using SituationReport.Interfaces;
using SituationReport.Models;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace SituationReport.Services
{
    public class ReCaptchaService: IReCaptchaService
    {
        IConfiguration Configuration { get; }
        private static readonly HttpClient _httpClient = new HttpClient();
        public ReCaptchaService(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public async Task<bool> CheckToken(string token)
        {
            ReCaptchaForCheck reCaptchaForCheckObj = new ReCaptchaForCheck
            {
                Secret = Configuration["MailSettings:SecretKey"],
                Response = token
            };
            var reCaptchaForCheckJson = JsonSerializer.Serialize(reCaptchaForCheckObj);
            var request = new HttpRequestMessage(HttpMethod.Post, $"https://www.google.com/recaptcha/api/siteverify?secret={reCaptchaForCheckObj.Secret}&response={reCaptchaForCheckObj.Response}");
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            //request.Content = new StringContent(reCaptchaForCheckJson, Encoding.UTF8);
            //request.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();
            string responseContent = await response.Content.ReadAsStringAsync();
            JsonNode responseContentJson = JsonSerializer.Deserialize<JsonNode>(responseContent);
            if (responseContentJson["success"].GetValue<bool>() == true)
            {
                return true;
            }
            else
            {
                return false;
            }
        }


    }   
}

