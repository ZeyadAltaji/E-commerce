﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.Models;

namespace WebAPIS.Interfaces
{
    public interface IUserReop
    {
        Task<User> Authenticate(string userName, string password);
        void Register(string userName, string password);
        Task<bool> UserAlreadyExists(string userName);

    }
}
