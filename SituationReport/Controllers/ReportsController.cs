using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SituationReport.Interfaces;
using SituationReport.Models;
using SituationReport.Services;
using SituationReport.Repository;
using System.Text.Json;
using SituationReport.Filters;
using Microsoft.AspNetCore.Authorization;

namespace SituationReport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [CustomAuthorize]
    public class ReportsController : ControllerBase
    {
        private readonly IReportRepository _reportRepository;
        private readonly IUserRepository _userRepository;
        private readonly IFileRepository _fileRepository;
        private readonly IEmailService _emailService;
        private readonly IReCaptchaService _reCaptchaService;
        public ReportsController(IReportRepository reportRepository, IUserRepository userRepository, IFileRepository fileRepository, IEmailService emailService, IReCaptchaService reCaptchaService)
        {
            _reportRepository = reportRepository;
            _userRepository = userRepository;
            _fileRepository = fileRepository;
            _emailService = emailService;
            _reCaptchaService = reCaptchaService;
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
        [Route("~/api/reports/paginatedbyuser")]

        public IActionResult GetPaginatedReportsByUserEmail([FromQuery]PaginationParameters paginationParameters, string email)
        {
            var reports = _reportRepository.GetPaginatedByUserEmail(paginationParameters, email);
            var metadata = new
            {
                reports.TotalCount,
                reports.PageSize,
                reports.CurrentPage,
                reports.TotalPages,
                reports.HasNext,
                reports.HasPrevious
            };
            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(metadata));
            Response.Headers.Add("Access-Control-Expose-Headers", "X-Pagination");
            return Ok(reports);
        }

        [HttpGet("{id}")]
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
        [AllowAnonymous]
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
            if (reportDTO.ReCaptchaToken != null)
            {
                var isValid = _reCaptchaService.CheckToken(reportDTO.ReCaptchaToken).Result;
                if (isValid)
                {
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
                        Latitude = reportDTO.Latitude,
                        Longitude = reportDTO.Longitude,
                        Description = reportDTO.Description,
                    };
                    if (reportDTO.Pic1 != null)
                    {
                        string name1 = _fileRepository.GetImageName(reportDTO.Pic1, user.Id);
                        if (!System.IO.File.Exists($@"Content\Images\{name1}"))
                        {
                            report.Pic1 = _fileRepository.Save(reportDTO.Pic1, user.Id);
                        }
                        else
                        {
                            report.Pic1 = name1;
                        }

                    }
                    if (reportDTO.Pic2 != null)
                    {
                        string name1 = _fileRepository.GetImageName(reportDTO.Pic2, user.Id);
                        if (!System.IO.File.Exists($@"Content\Images\{name1}"))
                        {
                            report.Pic2 = _fileRepository.Save(reportDTO.Pic2, user.Id);

                        }
                        else
                        {
                            report.Pic2 = name1;
                        }

                    }
                    if (reportDTO.Pic3 != null)
                    {
                        string name1 = _fileRepository.GetImageName(reportDTO.Pic3, user.Id);
                        if (!System.IO.File.Exists($@"Content\Images\{name1}"))
                        {
                            report.Pic3 = _fileRepository.Save(reportDTO.Pic3, user.Id);

                        }
                        else
                        {
                            report.Pic3 = name1;
                        }

                    }
                    int newId = _reportRepository.Create(report);
                    string uri = $"https://localhost:7281/api/Reports/{newId}";
                    //return CreatedAtAction("GetReport", new {  id = newId }, report);
                    return Created(uri, new {Id = newId});

                }
                else
                {
                    return BadRequest("reCaptcha token not received from contact form.");

                }
            }
            else
            {
                return BadRequest("Contact form not received.");
            }

        }

        [HttpPut("{id}")]

        public IActionResult PutReport(int id, ReportDTO reportDTO)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (reportDTO.ReCaptchaToken != null)
            {
                var isValid = _reCaptchaService.CheckToken(reportDTO.ReCaptchaToken).Result;
                if (isValid)
                {
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
                        Latitude = reportDTO.Latitude,
                        Longitude = reportDTO.Longitude,
                        Description = reportDTO.Description,
                        Pic1 = reportDTO.Pic1,
                        Pic2 = reportDTO.Pic2,
                        Pic3 = reportDTO.Pic3
                    };

                    if (report.Pic1 != null)
                    {
                        string name1 = _fileRepository.GetImageName(report.Pic1, user.Id);
                        if (name1 != r.Pic1)
                        {
                            report.Pic1 = _fileRepository.Save(reportDTO.Pic1, user.Id); //save file to disk
                        }
                        else
                        {
                            report.Pic1 = r.Pic1;
                        }
                    }
                    if (report.Pic2 != null)
                    {
                        string name2 = _fileRepository.GetImageName(report.Pic2, user.Id);

                        if (name2 != r.Pic2)
                        {
                            report.Pic2 = _fileRepository.Save(reportDTO.Pic2, user.Id); //save file to disk
                        }
                        else
                        {
                            report.Pic2 = r.Pic2;
                        }
                    }
                    if (report.Pic3 != null)
                    {
                        string name3 = _fileRepository.GetImageName(report.Pic3, user.Id);

                        if (name3 != r.Pic3)
                        {
                            report.Pic3 = _fileRepository.Save(reportDTO.Pic3, user.Id); //save file to disk
                        }
                        else
                        {
                            report.Pic3 = r.Pic3;
                        }
                    }
                    _reportRepository.Update(report);
                    return Ok(report);

                }
                else
                {
                    return BadRequest("reCaptcha token not received from contact form.");

                }
            }
            else
            {
                return BadRequest("Contact form not received.");
            }           
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
            return Ok();    //or return NoContent();
        }

        [HttpPost]
        [Route("~/api/contactForm")]
        [AllowAnonymous]
        public IActionResult SendEmail(ContactForm contactForm)
        {
            if (contactForm != null)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (contactForm.ReCaptchaToken != null)
                {
                    var isValid = _reCaptchaService.CheckToken(contactForm.ReCaptchaToken).Result;
                    if (isValid)
                    {
                        _emailService.Send(contactForm.Name, contactForm.EmailAddress, contactForm.MessageContent);
                        return Ok();
                    }
                    else
                    {
                        return BadRequest("Token not found.");
                    }

                }
                else
                {
                    return BadRequest("reCaptcha token not received from contact form.");
                }
            }
            else
            {
                return BadRequest("Contact form not received.");
            }
        }
    }
}
