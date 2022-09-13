using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
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
            uow.CityReop.AddCity(city);
            await uow.CityReop.SaveAsync();
            return StatusCode(201);
        }

        [HttpPut("updated/{ID}")]
        public async Task<IActionResult> UpdatedCities(int id,CitysDTOS citysDTOS)
        {
            var CityFormDB = await uow.CityReop.FindCity(id);
            CityFormDB.LastUpdatedBy = 1;
            CityFormDB.LastUpdatedOn = DateTime.Now;
            mapper.Map(citysDTOS, CityFormDB);
            await uow.SaveAsync();
            return this.StatusCode(200);
        }

        [HttpPatch("updated/{ID}")]
        public async Task<IActionResult> UpdatedCitiesPatch(int id, JsonPatchDocument<City> citysToPatch)
        {
            var CityFormDB = await uow.CityReop.FindCity(id);
            CityFormDB.LastUpdatedBy = 1;
            CityFormDB.LastUpdatedOn = DateTime.Now;
            citysToPatch.ApplyTo(CityFormDB, ModelState);
            await uow.SaveAsync();
            return this.StatusCode(200);
        }

        [HttpPut("updatedCityID/{ID}")]
        public async Task<IActionResult> UpdatedCities(int id, CitysUpdatedDTOS cud)
        {
            var CityFormDB = await uow.CityReop.FindCity(id);
            CityFormDB.LastUpdatedBy = 1;
            CityFormDB.LastUpdatedOn = DateTime.Now;
            mapper.Map(cud, CityFormDB);
            await uow.SaveAsync();
            return this.StatusCode(200);
        }


        [HttpDelete("Delete/{ID}")]
        public async Task<IActionResult> DeleteCities(int id)
        {
            uow.CityReop.DeleteCity(id);
            await uow.SaveAsync();
            return Ok(id);
        }
    
    }
}

