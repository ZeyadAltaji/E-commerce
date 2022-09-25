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
            .Include(p => p.Image)
            .Where(p =>p.SellRent ==SellRent ).ToListAsync();
            return prop;
        }

        public async Task<Property> GetPropertyByIdAsync(int id)
        {
            var prop = await dc.Properties

                      .Include(p => p.Image)
                      .Where(p => p.ID == id).FirstAsync();
            return prop;
        }

        public async Task<Property> GetPropertyDetailAsync(int ID)
        {
            var prop = await dc.Properties
            .Include(p => p.Ptype)
            .Include(p => p.city)
            .Include(p => p.Ftype)
                      .Include(p => p.Image)
            .Where(p => p.ID == ID).FirstAsync();
            return prop;
        }
    }
}
