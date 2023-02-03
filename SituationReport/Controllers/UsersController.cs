using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SituationReport.Interfaces;
using SituationReport.Models;

namespace SituationReport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost]
        [Route("~/api/users/check")]
        public IActionResult CheckUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            User? u = _userRepository.getByEmail(user.Email);
            if (u.Email is null)
            {
                _userRepository.Create(user);
                return Ok();
            }
            else
            {
                return Ok();
            }

        }
    }
}
