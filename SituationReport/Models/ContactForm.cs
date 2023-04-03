using System.ComponentModel.DataAnnotations;

namespace SituationReport.Models
{
    public class ContactForm
    {
        [Required]
        public string? Name { get; set; }
        [Required]
        public string? EmailAddress { get; set; }
        [Required]
        public string? MessageContent { get; set; }
    }
}
