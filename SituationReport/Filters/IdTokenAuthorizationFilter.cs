using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SituationReport.Interfaces;

namespace SituationReport.Filters
{

    public class CustomAuthorizeAttribute : ServiceFilterAttribute
    {
        public CustomAuthorizeAttribute()
            : base(typeof(CustomAuthorizeFilter))
        {

        }
    }
    public class CustomAuthorizeFilter : Attribute, IAuthorizationFilter
    {
        private readonly IUserRepository userRepository;
        public CustomAuthorizeFilter(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var result = true;
            if(!context.HttpContext.Request.Headers.ContainsKey("Authorization"))
                result = false;

            string token = string.Empty;
            string email = string.Empty;
            if (result)
            {
                token = context.HttpContext.Request.Headers.First(x => x.Key == "Authorization").Value;
                email = context.HttpContext.Request.Headers.First(x => x.Key == "Email").Value;
                if(userRepository.GetUserToken(email) != token)
                {
                    result = false;
                }
                if (!result)
                {
                    context.ModelState.AddModelError("Unauthorized", "You are not authorized.");
                    context.Result = new UnauthorizedObjectResult(context.ModelState);
                }
            }
        }
    }
}
