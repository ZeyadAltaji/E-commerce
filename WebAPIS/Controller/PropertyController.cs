using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.Interfaces;

namespace WebAPIS.Controller
{
    [Route("api_Property/[controller]")]
    [ApiController]
    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork uow;
        public PropertyController (IUnitOfWork uow)
        {
            this.uow = uow;
        }
        [HttpGet("Type/{SellRent}")]
        [AllowAnonymous]

        public async Task<IActionResult> GetPropertyList(int SellRent)
        {
            var prop= await uow.propertyRepository.GetPropertiesAsync(SellRent);
            return Ok(prop);
        }
    }
}
