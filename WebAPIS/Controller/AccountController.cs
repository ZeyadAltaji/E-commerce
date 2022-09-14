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
   
    public class AccountController : BaseController
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
            var user = await uow.userReop.Authenticate(loginReqdto.UserName, loginReqdto.Password);
            if(user == null)
            {
                return Unauthorized();
            }
            return Ok(user);
        }
    }
}
