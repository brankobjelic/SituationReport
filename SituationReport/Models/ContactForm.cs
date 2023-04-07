using System.ComponentModel.DataAnnotations;

namespace SituationReport.Models
{
    public class ContactForm
    {
        [Required]
        [StringLength(200)]
        public string? Name { get; set; }
        [Required]
        [StringLength(200)]
        [EmailAddress]
        public string? EmailAddress { get; set; }
        [Required]
        public string? MessageContent { get; set; }
    }
}
