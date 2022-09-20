using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.Interfaces;
using WebAPIS.Models;

namespace WebAPIS.Data.Reop
{
    public class PropertyTypeRepository : IPropertyTypeRepository
    {
        private readonly DataContext dc;
        public PropertyTypeRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<IEnumerable<PropertyType>> GetPropertyTypesAsync()
        {
            var returndata = await dc.PropertyTypes.ToListAsync();
            return returndata;
        }
    }
}
