using System.ComponentModel.DataAnnotations;

namespace SituationReport.Models
{
    public class Cause
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [EmailAddress]
        public string Email { get; set; }
    }
}
