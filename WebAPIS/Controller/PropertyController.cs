using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.DTOS;
using WebAPIS.Interfaces;

namespace WebAPIS.Controller
{
    [Route("api_Property/[controller]")]
    [ApiController]
    public class PropertyController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public PropertyController (IUnitOfWork uow ,IMapper mapper)
        {
            this.mapper = mapper;
            this.uow = uow;
        }
        [HttpGet("List/{sellRent}")]
        [AllowAnonymous]

        public async Task<IActionResult> GetPropertyList(int sellRent)
        {
            var prop= await uow.propertyRepository.GetPropertiesAsync(sellRent);
            var proplistDTO = mapper.Map<IEnumerable<PropertyListDto>>(prop);
            return Ok(proplistDTO);
        }

        [HttpGet("Detail/{id}")]
        [AllowAnonymous]

        public async Task<IActionResult> GetPropertyDetail(int ID)
        {
            var property = await uow.propertyRepository.GetPropertyDetailAsync(ID);
            var propDTO = mapper.Map<PropertyDetailDto>(property);
            return Ok(propDTO);
        }
    }
}
