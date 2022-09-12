﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIS.Models
{
    public class City
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime LastUpdatedOn{ get; set; }
        public int LastUpdatedBy { get; set; }
    }
}
