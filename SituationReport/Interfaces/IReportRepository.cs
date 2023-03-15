using SituationReport.Models;

namespace SituationReport.Interfaces
{
    public interface IReportRepository
    {
        Report Get(int id);
        List<Report> GetAll();
        int Create(Report report);
        void Update(Report report);
        void Delete(int id);
        List<UserReportsDTO> GetAllByUserEmail(string email);
        PagedList<UserReportsDTO> GetPaginatedByUserEmail(PaginationParameters paginationParameters, string email);

    }
}
