using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.Data;
using WebAPIS.Data.Reop;
using WebAPIS.Interfaces;
using WebAPIS.Models;

namespace WebAPIS.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        public CityController (IUnitOfWork uow)
        {
            this.uow = uow;
        }
        //public CityController( uow)
        //{
        //    this.uow = uow;
        //}
        

        [HttpGet]
       public async Task<IActionResult> Getcities()
        {
            var cities =await uow.CityReop.GetCitesAsync();
            return Ok(cities);
        }
        // post api/city/post --post the data in json format

        [HttpPost("post")]

        public async Task<IActionResult> AddCities(City city)
        {

            uow.CityReop.AddCity(city);
            await uow.CityReop.SaveAsync();
            return StatusCode(201);
        }
        [HttpDelete("Delete/{id}")]

        public async Task<IActionResult> DeleteCities(int id)
        {
            uow.CityReop.DeleteCity(id);
             await uow.SaveAsync();
            return Ok(id);
        }
    
    }
}
