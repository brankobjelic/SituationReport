﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SituationReport.Filters;
using SituationReport.Interfaces;
using SituationReport.Models;
using SituationReport.Services;

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
        [Route("~/api/users/signin")]
        public async Task<IActionResult> CheckUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            string token = Request.Headers["Authorization"].ToString().Remove(0, 7); //remove Bearer 

            var payload = await OAuthService.VerifyGoogleTokenId(token);
            if (payload == null)
            {
                return BadRequest("Invalid token");
            }

            User? u = _userRepository.getByEmail(user.Email);
            if (u.Email is null)
            {
                _userRepository.Create(user);
                _userRepository.UpdateToken(user.Email, token);
                return Ok();
            }
            else
            {
                _userRepository.UpdateToken(user.Email, token);
                return Ok();
            }

        }

        [HttpPost("verify")]
        public async Task<IActionResult> Verify()
        {

            string token = Request.Headers["Authorization"].ToString().Remove(0, 7); //remove Bearer 
            var payload = await OAuthService.VerifyGoogleTokenId(token);
            if (payload == null)
            {
                return BadRequest("Invalid token");
            }


            return Ok(payload);
        }
    }
}
