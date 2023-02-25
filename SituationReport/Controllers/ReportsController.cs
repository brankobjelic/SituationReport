﻿using Microsoft.AspNetCore.Http;
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
        public IActionResult GetReportsByUserEmail(string email)
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

        [HttpGet]
        [Route("~/api/reports/getimage")]
        public IActionResult GetImage(string name)
        {
            Byte[] b = System.IO.File.ReadAllBytes($@"Content\Images\{name}");        
            return File(b, "image/jpeg");
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
            };
            if (reportDTO.Pic1 != null)
            {
                string name1 = _fileRepository.GetImageName(reportDTO.Pic1);
                if (!System.IO.File.Exists($@"Content\Images\{name1}"))
                {
                    report.Pic1 = _fileRepository.Save(reportDTO.Pic1);

                }
                else
                {
                    report.Pic1 = name1;
                }

            }
            if (reportDTO.Pic2 != null)
            {
                string name1 = _fileRepository.GetImageName(reportDTO.Pic2);
                if (!System.IO.File.Exists($@"Content\Images\{name1}"))
                {
                    report.Pic2 = _fileRepository.Save(reportDTO.Pic2);

                }
                else
                {
                    report.Pic2 = name1;
                }

            }
            if (reportDTO.Pic3 != null)
            {
                string name1 = _fileRepository.GetImageName(reportDTO.Pic3);
                if (!System.IO.File.Exists($@"Content\Images\{name1}"))
                {
                    report.Pic3 = _fileRepository.Save(reportDTO.Pic3);

                }
                else
                {
                    report.Pic3 = name1;
                }

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
                Description = reportDTO.Description,
                Pic1= reportDTO.Pic1,
                Pic2= reportDTO.Pic2,
                Pic3= reportDTO.Pic3
            };

            if (report.Pic1 != null)
            {
                string name1 = _fileRepository.GetImageName(report.Pic1);
                if (name1 != r.Pic1)
                {
                    report.Pic1 = _fileRepository.Save(reportDTO.Pic1); //save file to disk
                }
                else
                {
                    report.Pic1 = r.Pic1;
                }
            }
            if (report.Pic2 != null)
            {
                string name2 = _fileRepository.GetImageName(report.Pic2);

                if (name2 != r.Pic2)
                {
                    report.Pic2 = _fileRepository.Save(reportDTO.Pic2); //save file to disk
                }
                else
                {
                    report.Pic2 = r.Pic2;
                }
            }
            if (report.Pic3 != null)
            {
                string name3 = _fileRepository.GetImageName(report.Pic3);

                if (name3 != r.Pic3)
                {
                    report.Pic3 = _fileRepository.Save(reportDTO.Pic3); //save file to disk
                }
                else
                {
                    report.Pic3 = r.Pic3;
                }
            }
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
