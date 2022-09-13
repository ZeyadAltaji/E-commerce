using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.DTOS;
using WebAPIS.Models;

namespace WebAPIS.Helpers
{
    public class AutomapperPropfiles :Profile
    {
        public AutomapperPropfiles()
        {
            CreateMap<City, CitysDTOS>().ReverseMap();
            CreateMap<City, CitysUpdatedDTOS>().ReverseMap();

        }
    }
}
