﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIS.Models
{
    public class User
    {
        public int ID { get; set; }
        
        public string UserName { get; set; }
      
        public byte[] Password { get; set; }

        public byte[] PasswordKey { get; set; }

    }
}
