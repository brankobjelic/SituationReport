﻿using System.ComponentModel.DataAnnotations;

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
        public string? Title { get; set; }
        [Required]
        public string? Description { get; set; }
    }
}
