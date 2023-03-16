using SituationReport.Models;

namespace SituationReport.Interfaces
{
    public interface ICauseRepository
    {
        Cause Get(int id);
        List<Cause> GetAll();
        void Create(Cause cause);
        void Update(Cause cause);
        void Delete(int id);
        Institution GetInstitutionByCauseId(int id);
    }
}
