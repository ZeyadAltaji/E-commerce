using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIS.Controller
{
    public class CityController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
