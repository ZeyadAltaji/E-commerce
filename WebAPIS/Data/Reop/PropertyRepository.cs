using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.Interfaces;
using WebAPIS.Models;

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
            throw new NotImplementedException();
        }

        public void DeleteProperty(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Property>> GetPropertiesAsync(int SellRent)
        {
            var prop = await dc.Properties.ToListAsync();
            return prop;
        }
    }
}
