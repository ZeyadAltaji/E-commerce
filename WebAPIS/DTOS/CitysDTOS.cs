using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIS.DTOS
{
    public class CitysDTOS
    {
        public int ID { get; set; }
        [Required (ErrorMessage = "Name is mandatory field")]
        [StringLength(50,MinimumLength =2)]
        [RegularExpression(".*[a-zA-Z]+.*",ErrorMessage ="Only Numerics are not allowed")]
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }
    }
}
