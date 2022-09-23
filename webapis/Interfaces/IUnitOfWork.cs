using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIS.Interfaces
{
    public interface IUnitOfWork
    {
        ICityReop CityReop { get; }
        IUserReop UserRepository { get; }
        IPropertyRepository propertyRepository { get; }
        IPropertyTypeRepository PropertyTypeRepository { get; }
        IFurnishingTypeRepository FurnishingTypeRepository { get; }

        Task<bool> SaveAsync();
    }
}
