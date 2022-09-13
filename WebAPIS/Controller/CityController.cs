using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.Data;
using WebAPIS.Data.Reop;
using WebAPIS.DTOS;
using WebAPIS.Interfaces;
using WebAPIS.Models;

namespace WebAPIS.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        public CityController (IUnitOfWork uow ,IMapper mapper)
        {
            this.mapper = mapper;
            this.uow = uow;
        }
      

        [HttpGet]
       public async Task<IActionResult> Getcities()
        {
            var cities =await uow.CityReop.GetCitesAsync();

            var citiesDto = mapper.Map<IEnumerable<CitysDTOS>>(cities);
        
            return Ok(cities);
        }
        // post api/city/post --post the data in json format

        [HttpPost("post")]

        public async Task<IActionResult> AddCities(CitysDTOS citysDTOS)
        {
            var city = mapper.Map<City>(citysDTOS);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;
            //var city = new City
            //{
            //    Name = citysDTOS.Name,
            //    LastUpdatedBy = 1,
            //    LastUpdatedOn = DateTime.Now
            //}; 

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
