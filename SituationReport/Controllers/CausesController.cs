using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SituationReport.Interfaces;
using SituationReport.Models;
using SituationReport.Repository;

namespace SituationReport.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CausesController : ControllerBase
    {
        private readonly ICauseRepository _causeRepository;
        public CausesController(ICauseRepository causeRepository)
        {
            _causeRepository = causeRepository;
        }

        [HttpGet]
        public IActionResult GetAllCauses() 
        {
            List<Cause> causes = new List<Cause>();
            causes = _causeRepository.GetAll();
            return Ok(causes);
        }

        [HttpGet]
        [Route("~/api/InstitutionByCauseId")]
        public IActionResult GetInstitutionByCauseId(int id) 
        {
            Institution institution = new Institution();
            institution = _causeRepository.GetInstitutionByCauseId(id);
            return Ok(institution);
        }

        [HttpGet]
        [Route("~/api/FrequentCauses")]
        public IActionResult GetFrequentCauses()
        {
            List<Cause> frequentCauses = new List<Cause>();
            frequentCauses = _causeRepository.GetFrequent();
            return Ok(frequentCauses);
        }
    }
}
