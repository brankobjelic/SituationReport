using SituationReport.Models;

namespace SituationReport.Interfaces
{
    public interface IReportRepository
    {
        Report Get(int id);
        List<Report> GetAll();
        void Create(Report report);
        void Update(Report report);
        void Delete(int id);
        List<UserReportsDTO> GetAllByUserEmail(string email);
    }
}
