using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.Interfaces;
using WebAPIS.Models;
using System.Linq;

namespace WebAPIS.Data.Reop
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly DataContext dc;
        public PropertyRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddProperty(Property property)
        {
            dc.Properties.Add(property);
        }

        public void DeleteProperty(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Property>> GetPropertiesAsync(int SellRent)
        {
            var prop = await dc.Properties
            .Include(p=>p.Ptype)
            .Include(p => p.city)
            .Include(p => p.Ftype)
            .Where(p =>p.SellRent ==SellRent ).ToListAsync();
            return prop;
        }

        public Task<Property> GetPropertyByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Property> GetPropertyDetailAsync(int ID)
        {
            var prop = await dc.Properties
            .Include(p => p.Ptype)
            .Include(p => p.city)
            .Include(p => p.Ftype)
            .Where(p => p.ID == ID).FirstAsync();
            return prop;
        }
    }
}
