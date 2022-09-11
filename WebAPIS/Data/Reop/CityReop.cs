using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.Models;

namespace WebAPIS.Data.Reop
{
    public class CityReop : ICityReop
    {
        private readonly DataContext dc;
        public CityReop(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddCity(City city)
        {
            dc.Cities.AddAsync(city);
        }

        public void DeleteCity(int CityID)
        {
         var city = dc.Cities.Find(CityID);
            dc.Cities.Remove(city);
        }

        public async Task<IEnumerable<City>> GetCitesAsync()
        {
            return await dc.Cities.ToListAsync();
        }

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() >0;    
        }
    }
}
