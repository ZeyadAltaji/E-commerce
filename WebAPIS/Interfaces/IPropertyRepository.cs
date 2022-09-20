 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.Models;

namespace WebAPIS.Interfaces
{
    public  interface IPropertyRepository
    {
        Task<IEnumerable<Property>> GetPropertiesAsync(int SellRent);

        Task<Property> GetPropertyDetailAsync(int ID);

        void AddProperty(Property property);

        void DeleteProperty(int id);
    }
}
