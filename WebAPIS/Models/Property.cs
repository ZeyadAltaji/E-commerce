using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIS.Models
{
    public class Property :BaseEntity
    {
        public int SellRent { get; set; }
        public string Name { get; set; }
        public int PropertyTypeId { get; set; }
        public PropertyType Ptype { get; set; }
        public int FurnishingTypeId { get; set; }
        public FurnishingType Ftype { get; set; }
        public int price { get; set; }
        public int BHK { get; set; }
        public int builtArea { get; set; }
        public int CityId { get; set; }
        public City city { get; set; }
        public bool readyToMove { get; set; }
        public int carpetArea { get; set; }
        public string address { get; set; }
        public string address2 { get; set; }
        public int floorNo { get; set; }
        public int totalFloors { get; set; }
        public string mainEntrance { get; set; }
        public int Security { get; set; }
        public bool gated { get; set; }
        public int maintenance { get; set; }
        public DateTime estPossessionOn { get; set; }
        public int age { get; set; }
        public string description { get; set; }

        public ICollection<Photo> Image { get; set; }

        public DateTime PostedOn { get; set; } = DateTime.Now;
        [ForeignKey("User")]

        public int PostedBy { get; set; }
        public User User { get; set; }
    }
}
