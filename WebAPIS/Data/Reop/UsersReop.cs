using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.Interfaces;
using WebAPIS.Models;

namespace WebAPIS.Data.Reop
{
    public class UsersReop : IUserReop
    {
        private readonly DataContext dc;
        public UsersReop(DataContext dc)
        {
            this.dc = dc;
        }
        public async Task<User> Authenticate(string userName, string password)
        {
            return await dc.Users.FirstOrDefaultAsync(x => x.UserName == userName 
            && x.Password ==password);
        }
    }
}
