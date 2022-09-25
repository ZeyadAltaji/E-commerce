using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPIS.DTOS;
using WebAPIS.Interfaces;
using WebAPIS.Models;
using System.Security.Claims;

namespace WebAPIS.Controller
{
    [Route("api_Property/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        protected int GetUserID()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        }
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;
        public PropertyController(IUnitOfWork uow, IMapper mapper, IPhotoService photoService)
        {
            this.mapper = mapper;
            this.uow = uow;
            this.photoService = photoService;
        }
        [HttpGet("List/{sellRent}")]
        [AllowAnonymous]

        public async Task<IActionResult> GetPropertyList(int sellRent)
        {
            var prop = await uow.propertyRepository.GetPropertiesAsync(sellRent);
            var proplistDTO = mapper.Map<IEnumerable<PropertyListDto>>(prop);
            return Ok(proplistDTO);
        }

        [HttpGet("Detail/{id}")]
        [AllowAnonymous]

        public async Task<IActionResult> GetPropertyDetail(int ID)
        {
            var property = await uow.propertyRepository.GetPropertyDetailAsync(ID);
            var propDTO = mapper.Map<PropertyDetailDto>(property);

            return Ok(propDTO);
        }
        [HttpPost("ADD-list")]
        //[AllowAnonymous]
        [Authorize]
        public async Task<IActionResult> AddProperty(PropertyDto propertyDto)
        {
            var property = mapper.Map<Property>(propertyDto);
            var userID = GetUserID();
            property.PostedBy = userID;
            property.LastUpdatedBy = userID;
            uow.propertyRepository.AddProperty(property);
            await uow.SaveAsync();
            return StatusCode(201);
        }
        [HttpPost("ADD-list/photo/{id}")]
        [Authorize]
        public async Task<IActionResult> AddPropertyPhoto(IFormFile file, int ID)
        {
            var res = await photoService.UploadPhotoAsync(file);
            if (res.Error != null)
            {
                return BadRequest(res.Error.Message);

            }
            var property = await uow.propertyRepository.GetPropertyByIdAsync(ID);
            var photo = new Photo
            {
                ImageUrl = res.SecureUrl.AbsoluteUri,
                publicID = res.PublicId
            };
            if (property.Image.Count == 0)
            {
                photo.IsPrimary = true;
            }
            property.Image.Add(photo);
            await uow.SaveAsync();

            return StatusCode(201);
        }
        [HttpPost("set-primary-photo/photo/{id}/{photoPublicId}")]
        [Authorize]
        public async Task<IActionResult> SetPrimaryPhoto(string photoPublicId, int ID)
        {
            var userID = GetUserID();
            var property = await uow.propertyRepository.GetPropertyByIdAsync(ID);
           if (property.PostedBy != userID)
              return BadRequest("You are not authorised to change the photo");
            if (property == null || property.PostedBy != userID)
                return BadRequest("No such property or photo exists");
            var photo = property.Image.FirstOrDefault(p => p.publicID == photoPublicId);
            if (photo == null)
                return BadRequest("No such property or photo exists");
            if (photo.IsPrimary)
                return BadRequest("This is already a primary photo");
            var currentPrimary = property.Image.FirstOrDefault(p => p.IsPrimary);
            if (currentPrimary != null)
                currentPrimary.IsPrimary = false;
            photo.IsPrimary = true;

            if (await uow.SaveAsync())
                return NoContent();

            return BadRequest("Failed to set primary photo");

        }
    }
}

