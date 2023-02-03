using System.ComponentModel.DataAnnotations;

namespace SituationReport.Models
{
    public class Institution
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [EmailAddress]
        public string? Email { get; set; }
        public string? Phone { get; set; }
    }
}
