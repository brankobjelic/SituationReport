using System.ComponentModel.DataAnnotations;

namespace SituationReport.Models
{
    public class Report
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int CauseId { get; set; }
        [Required]
        public Cause? Cause { get; set; }
        public string? Location { get; set; }
        public Decimal? Latitude { get; set; }
        public Decimal? Longitude { get; set; }
        public string? Title { get; set; }
        [Required]
        public string? Description { get; set; }
        public string? Pic1 { get; set; }
        public string? Pic2 { get; set; }
        public string? Pic3 { get; set; }
    }
}
