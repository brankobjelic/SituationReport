using System.ComponentModel.DataAnnotations;

namespace SituationReport.Models
{
    public class ReportDTO
    {
        [Required]
        public string? userEmail { get; set; }
        [Required]
        public int causeId { get; set; }
        public string? Location { get; set; }
        public string? Title { get; set; }
        [Required]
        public string? Description { get; set; }
        public string? Pic1 { get; set; }
        public string? Pic2 { get; set; }
        public string? Pic3 { get; set; }
    }
}
