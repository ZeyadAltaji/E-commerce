using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIS.Models
{
    public class City
    {
        public int ID { get; set; }
        [Required]
        
        
        public string Name { get; set; }
        [Required]
        public string country { get; set; }
        public DateTime LastUpdatedOn{ get; set; }
        public int LastUpdatedBy { get; set; }
    }
}
