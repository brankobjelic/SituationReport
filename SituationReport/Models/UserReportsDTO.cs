﻿namespace SituationReport.Models
{
    public class UserReportsDTO
    {
        public int Id { get; set; }
        public DateTime DateAndTime { get; set; }
        public string? Institution { get; set; }
        public int CauseId { get; set; }
        public string? CauseDescription { get; set; }
        public string? Location { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
    }
}
