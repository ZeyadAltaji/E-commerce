using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIS.Interfaces
{
    interface IUnitOfWork
    {
        ICityReop CityReop { get; }
        Task<bool> SaveAsync();
    }
}
