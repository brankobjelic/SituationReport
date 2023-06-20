using SituationReport.Models;

namespace SituationReport.Interfaces
{
    public interface IUserRepository
    {
        User Get(int id);
        List<User> GetAll();
        void Create(User user);
        void Update(User user);
        void Delete(int id);
        User getByEmail(string email);
        string GetUserToken(string email);
        void UpdateToken(string email, string token);
        void UpdateUsername(string email, string username);
    }
}
