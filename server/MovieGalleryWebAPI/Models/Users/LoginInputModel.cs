﻿using System.ComponentModel.DataAnnotations;

using static MovieGalleryWebAPI.Data.Constant;

namespace MovieGalleryWebAPI.Models.Users
{
    public class LoginInputModel
    {
        [Required]
        [StringLength(UserNameMaxLength, MinimumLength = UserNameMinLength,
            ErrorMessage = "The field {0} is not valid! Must be between of {2} and {1} symbols.")]
        public string? Username { get; set; }        

        [Required]
        [StringLength(UserPasswordMaxLength, MinimumLength = UserPasswordMinLength,
            ErrorMessage = "The field {0} is not valid! Must be between of {2} and {1} symbols.")]
        public string? Password { get; set; }
    }
}
