﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIS.DTOS
{
    public class PropertyListDto
    {
        public int id { get; set; }
        public int sellRent { get; set;}
        public string Name { get; set; }
        public string Ptype { get; set; }
        public string Ftype { get; set; }
        public int Price { get; set; }
        public int BHK { get; set; }
        public int BuiltArea { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public bool ReadyToMove { get; set; }
        public string Image { get; set; }

    }
}
