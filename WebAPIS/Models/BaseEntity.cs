using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIS.Models
{
    public class BaseEntity
    {
        public int ID { get; set; }
        public DateTime LastUpdatedOn { get; set; } = DateTime.Now;

        public int LastUpdatedBy { get; set; }
    }
}
