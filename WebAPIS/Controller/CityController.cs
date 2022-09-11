using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.Data;
using WebAPIS.Models;

namespace WebAPIS.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly DataContext dc;
        public CityController(DataContext dc)
        {
            this.dc = dc;
        }

        [HttpGet]
       public async Task<IActionResult> Getcities()
        {
            var cities =await dc.Cities.ToListAsync();
            return Ok(cities);
        }
        // post api/city/add?cityname=amman
        [HttpPost("add")]
        public async Task<IActionResult> AddCities(string CityName)
        {
            City city = new City();
            city.Name = CityName;
            await dc.Cities.AddAsync(city);
            await dc.SaveChangesAsync();
            return Ok(city);
        }
    }
}
