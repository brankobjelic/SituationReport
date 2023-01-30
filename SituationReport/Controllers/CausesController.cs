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
    }
}
