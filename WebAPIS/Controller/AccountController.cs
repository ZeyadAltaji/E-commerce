using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebAPIS.DTOS;
using WebAPIS.Errors;
using WebAPIS.Extensions;
using WebAPIS.Interfaces;
using WebAPIS.Models;

namespace WebAPIS.Controller
{
    [Route("apis/[controller]")]
    [ApiController]
    public class AccountController: ControllerBase
    {
        ApiError apiError = new ApiError();
        private readonly IUnitOfWork uow;
        private readonly IConfiguration configuration;
        public AccountController (IUnitOfWork uow , IConfiguration configuration)
        {
            this.configuration = configuration;

            this.uow = uow;
        }
        // api/Account/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(loginReqDto loginReq)
        {
            var user = await uow.UserRepository.Authenticate(loginReq.UserName, loginReq.Password);

            if (user == null)
            {
                apiError.ErrorCode = Unauthorized().StatusCode;
                apiError.ErrorMessage = "Invalid user name or password";
                apiError.ErrorDetails = "This error appear when provided user id or password does not exists";
                return Unauthorized(apiError);
            }

            var loginRes = new loginResDto();
            loginRes.UserName = user.UserName;
            loginRes.Token = CreateJWT(user);
            return Ok(loginRes);
        }
        // api/Account/Register
        [HttpPost("Register")]
        public async Task<IActionResult> Register(loginReqDto loginReq)
        {
             if (loginReq.UserName.IsEmpty() || loginReq.Password.IsEmpty())
             {
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "User name or password can not be blank";
                return BadRequest(apiError);
             }
            if (await uow.UserRepository.UserAlreadyExists(loginReq.UserName))
            {
                apiError.ErrorCode = BadRequest().StatusCode;
                apiError.ErrorMessage = "User Already Exists , please try something else";
                return BadRequest(apiError);
            }
            uow.UserRepository.Register(loginReq.UserName, loginReq.Password);
            await uow.SaveAsync();
            return StatusCode(201);
        }
        private string CreateJWT(User user)
        {
            var secretKey = configuration.GetSection("AppSettings:key").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(secretKey));

            var clasims = new Claim[]
            {
                new Claim(ClaimTypes.Name,user.UserName),new Claim(ClaimTypes.NameIdentifier,user.ID.ToString())
            };
            var SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(clasims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = SigningCredentials
            };
            var TokenHandler = new JwtSecurityTokenHandler();
            var token = TokenHandler.CreateToken(tokenDescriptor);
            return TokenHandler.WriteToken(token);

        }
    }
}
