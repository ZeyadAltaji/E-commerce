﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.Data.Reop;
using WebAPIS.Interfaces;

namespace WebAPIS.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dc;
        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;
        }
        public ICityReop CityReop => new CityReop(dc);

        public IUserReop UserRepository => new UsersReop(dc);

        public IPropertyRepository propertyRepository => new PropertyRepository(dc);

        public IPropertyTypeRepository PropertyTypeRepository =>new PropertyTypeRepository(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync()>0;
        }
    }
}
