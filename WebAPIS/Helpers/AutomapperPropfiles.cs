﻿using AutoMapper;
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
            CreateMap<Property, PropertyListDto>()
                .ForMember(d => d.City, opt => opt.MapFrom(src => src.city.Name))
                .ForMember(d => d.Country, opt => opt.MapFrom(src => src.city.country))
                .ForMember(d => d.Ptype, opt => opt.MapFrom(src => src.Ptype.Name))
                .ForMember(d => d.Ftype, opt => opt.MapFrom(src => src.Ftype.Name));



            CreateMap<Property, PropertyDetailDto>()
                 .ForMember(d => d.City, opt => opt.MapFrom(src => src.city.Name))
                .ForMember(d => d.Country, opt => opt.MapFrom(src => src.city.country))
                .ForMember(d => d.Ptype, opt => opt.MapFrom(src => src.Ptype.Name))
                .ForMember(d => d.Ftype, opt => opt.MapFrom(src => src.Ftype.Name));
            //.ForMember(d => d.Country, opt => opt.MapFrom(src => src.city.country))
            //.ForMember(d => d.Ptype, opt => opt.MapFrom(src => src.Ptype.Name))
            //.ForMember(d => d.Ftype, opt => opt.MapFrom(src => src.Ftype.Name));

            CreateMap<PropertyType, KeyValuePairDto>().ReverseMap();
        }
    }
}
