using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SituationReport.Interfaces;
using SituationReport.Models;
using SituationReport.Repository;

namespace SituationReport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;
        private readonly IUserRepository _userRepository;
        public ReportsController(IReportRepository reportRepository, IUserRepository userRepository)
        {
            _reportRepository = reportRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        [Route("~/api/reports/allbyuser")]
        public IActionResult GetReportsByUSerEmail(string email)
        {
            List<UserReportsDTO> reports= new List<UserReportsDTO>();
            reports = _reportRepository.GetAllByUserEmail(email);
            return Ok(reports);
        }
        [HttpGet]
        [Route("~/api/reports/getreport")]
        public IActionResult GetReport(int id)
        {
            var report = _reportRepository.Get(id);
            if (report == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(report);
            }
        }

        [HttpPost]
        public IActionResult AddReport(ReportDTO reportDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            User user = _userRepository.getByEmail(reportDTO.userEmail);
            if (user == null)
            {
                return BadRequest(ModelState);
            }
            Report report = new Report()
            {
                CauseId = reportDTO.causeId,
                UserId = user.Id,
                Title = reportDTO.Title,
                Description = reportDTO.Description
            };
            _reportRepository.Create(report);
            return CreatedAtAction("GetReport", new {  Id = report.Id }, report);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteReport(int id)
        {
            var report = _reportRepository.Get(id);
            if (report == null)
            {
                return NotFound();
            }
            _reportRepository.Delete(id);
            return Ok();    //moze i return NoContent();
        }
    }
}
