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
        private readonly IFileRepository _fileRepository;
        public ReportsController(IReportRepository reportRepository, IUserRepository userRepository, IFileRepository fileRepository)
        {
            _reportRepository = reportRepository;
            _userRepository = userRepository;
            _fileRepository = fileRepository;
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
                Location = reportDTO.Location,
                Description = reportDTO.Description,
                Pic1 = reportDTO.Pic1,
                Pic2= reportDTO.Pic2,
                Pic3= reportDTO.Pic3
            };
            if (reportDTO.Pic1 != null)
            {
                _fileRepository.Save(reportDTO.Pic1);
            }
            if (reportDTO.Pic2 != null)
            {
                _fileRepository.Save(reportDTO.Pic2);
            }
            if (reportDTO.Pic3 != null)
            {
                _fileRepository.Save(reportDTO.Pic3);
            }
            _reportRepository.Create(report);
            return CreatedAtAction("GetReport", new {  Id = report.Id }, report);
        }

        [HttpPut]
        public IActionResult PutReport(int id, ReportDTO reportDTO)
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

            Report r = _reportRepository.Get(id);
            if (r == null)
            {
                return BadRequest(ModelState);
            }
            Report report = new Report()
            {
                Id = id,
                CauseId = reportDTO.causeId,
                Title = reportDTO.Title,
                Location = reportDTO.Location,
                Description = reportDTO.Description
            };
            _reportRepository.Update(report);
            return Ok();
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
