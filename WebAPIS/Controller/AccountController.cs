using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.DTOS;
using WebAPIS.Interfaces;

namespace WebAPIS.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController :ControllerBase
    {
        private readonly IUnitOfWork uow;
        public AccountController (IUnitOfWork uow)
        {
            this.uow = uow;
        }
        //api/account/login
        [HttpPost("login")]
        public async Task<IActionResult>Login(loginReqDto loginReqdto)
        {
 
            var user = await uow.UserRepository.Authenticate(loginReqdto.UserName, loginReqdto.Password);
            if(user == null)
            {
                return Unauthorized();
            }
            //var loginRes = new loginResDto();
            //loginRes.UserName = user.UserName;
            //loginRes.Token = "Token to be generated";
            return Ok(user);
        }
    }
}
