using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.Models;

namespace WebAPIS.Interfaces
{
   public interface ICityReop
    {
        Task<IEnumerable<City>> GetCitesAsync();
        void AddCity(City city);
        void DeleteCity(int CityID);
        Task<bool> SaveAsync();
    }
}
