﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIS.Models
{
    public class City : BaseEntity
    {

        public string Name { get; set; }
        [Required]
        public string country { get; set; }
 
    }
}
