using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SituationReport.Interfaces;
using System.Net;

namespace SituationReport.Filters
{

    public class CustomAuthorizeAttribute : ServiceFilterAttribute
    {
        public CustomAuthorizeAttribute()
            : base(typeof(CustomAuthorizeFilter))
        {

        }
    }
    public class CustomAuthorizeFilter : IAuthorizationFilter
    {
        private readonly IUserRepository userRepository;
        public CustomAuthorizeFilter(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // skip authorization if action is decorated with [AllowAnonymous] attribute
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
            if (allowAnonymous)
                return;

            var result = true;
            if(!context.HttpContext.Request.Headers.ContainsKey("Authorization"))
                result = false;

            string token = string.Empty;
            string email = string.Empty;
            if (result)
            {
                token = context.HttpContext.Request.Headers.First(x => x.Key == "Authorization").Value;
                token = token.Remove(0, 7);
                email = context.HttpContext.Request.Headers.First(x => x.Key == "From").Value;
                if(userRepository.GetUserToken(email) != token)
                {
                    result = false;
                }
            }
            if (!result)
            {
                context.ModelState.AddModelError("Unauthorized", "You are not authorized.");
                context.Result = new UnauthorizedObjectResult(context.ModelState);
            }
        }
    }
}
