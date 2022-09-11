using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.Data;
using WebAPIS.Data.Reop;
using WebAPIS.Models;

namespace WebAPIS.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
         private readonly ICityReop reop;
        public CityController(ICityReop reop)
        {
            this.reop = reop;
         }

        [HttpGet]
       public async Task<IActionResult> Getcities()
        {
            var cities =await reop.GetCitesAsync();
            return Ok(cities);
        }
        // post api/city/post --post the data in json format

        [HttpPost("post")]

        public async Task<IActionResult> AddCities(City city)
        {

            reop.AddCity(city);
            await reop.SaveAsync();
            return StatusCode(201);
        }
        [HttpDelete("Delete/{id}")]

        public async Task<IActionResult> DeleteCities(int id)
        {
            reop.DeleteCity(id);
             await reop.SaveAsync();
            return Ok(id);
        }
    
    }
}
