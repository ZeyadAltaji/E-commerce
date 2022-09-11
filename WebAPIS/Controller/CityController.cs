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
        private readonly DataContext dc;
        private readonly ICityReop reop;
        public CityController(DataContext dc ,ICityReop reop)
        {
            this.reop = reop;
            this.dc = dc;
        }

        [HttpGet]
       public async Task<IActionResult> Getcities()
        {
            var cities =await reop.GetCitesAsync();
            return Ok(cities);
        }
        //// post api/city/add?cityname=amman
        //[HttpPost("add")]
        //[HttpPost("add/{CityName}")]
        //public async Task<IActionResult> AddCities(string CityName)
        //{
        //    City city = new City();
        //    city.Name = CityName;
        //    await dc.Cities.AddAsync(city);
        //    await dc.SaveChangesAsync();
        //    return Ok(city);
        //}
        // post api/city/post --post the data in json format

        [HttpPost("Post")]

        public async Task<IActionResult> AddCities(City city)
        {
            //City city = new City();
            //city.Name = CityName;
            await dc.Cities.AddAsync(city);
            await dc.SaveChangesAsync();
            return Ok(city);
        }
        [HttpDelete("Delete/{id}")]

        public async Task<IActionResult> DeleteCities(int id)
        {
            var city = await dc.Cities.FindAsync(id);
            dc.Cities.Remove(city);
             await dc.SaveChangesAsync();
            return Ok(city);
        }
    
    }
}
