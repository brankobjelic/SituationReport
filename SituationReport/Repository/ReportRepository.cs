using Microsoft.Extensions.Configuration;
using SituationReport.Interfaces;
using SituationReport.Models;
using System.Data.SqlClient;
using System.Data;
using Microsoft.VisualBasic;

namespace SituationReport.Repository
{
    public class ReportRepository : IReportRepository
    {
        IConfiguration Configuration { get; }
        public ReportRepository(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public void Create(Report report)
        {
            string query = "INSERT INTO Reports(CauseId, UserId, DateAndTime, Title, Description) " +
                "values (@CauseId, @UserId, CURRENT_TIMESTAMP, @Title, @Description)";

            string connectionString = Configuration.GetConnectionString("AppConnectionString");

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();

            connection.Open();

            command.CommandText = query;
            command.Parameters.AddWithValue("@CauseId", report.CauseId);
            command.Parameters.AddWithValue("@UserId", report.UserId);
            command.Parameters.AddWithValue("@Title", report.Title);
            command.Parameters.AddWithValue("@Description", report.Description);

            command.ExecuteNonQuery();

            command.Dispose();
            connection.Close();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Report Get(int id)
        {
            string query = "SELECT * FROM Reports WHERE Id = @Id;";

            string connectionString = Configuration.GetConnectionString("AppConnectionString");

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            command.Parameters.AddWithValue("@Id", id);

            connection.Open();

            command.CommandText = query;

            DataSet ds = new DataSet();
            DataTable dt = new DataTable();

            SqlDataAdapter adapter = new SqlDataAdapter();
            adapter.SelectCommand = command;

            adapter.Fill(ds, "Reports");
            dt = ds.Tables["Reports"];

            command.Dispose();
            connection.Close();

            Report r = new Report();

            foreach (DataRow dr in dt.Rows)
            {
                r.Id = int.Parse(dr["Id"].ToString());
                r.CauseId = int.Parse(dr["CauseId"].ToString());
                r.UserId = int.Parse(dr["UserId"].ToString());
                r.Title = dr["Title"].ToString();
                r.Description = dr["Description"].ToString();
            }

            return r;
        }

        public List<Report> GetAll()
        {
            throw new NotImplementedException();
        }

        public List<UserReportsDTO> GetAllByUserEmail(string email)
        {
            string query = "select Reports.Id As Id, DateAndTime, Causes.Name as Institution, Title, Reports.Description as Description " +
                "from reports left join causes on causeid=causes.id " +
                "left join users on userid=users.id where users.email=@email";

            string connectionString = Configuration.GetConnectionString("AppConnectionString");

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            command.Parameters.AddWithValue("@email", email);


            connection.Open();

            command.CommandText = query;

            DataSet ds = new DataSet();
            DataTable dt = new DataTable();

            SqlDataAdapter adapter = new SqlDataAdapter();
            adapter.SelectCommand = command;

            adapter.Fill(ds, "Reports");
            dt = ds.Tables["Reports"];

            command.Dispose();
            connection.Close();


            List<UserReportsDTO> reports = new List<UserReportsDTO>();

            foreach (DataRow dr in dt.Rows)
            {
                UserReportsDTO ur = new UserReportsDTO();
                ur.Id = Int32.Parse(dr["Id"].ToString());
                ur.DateAndTime = DateTime.Parse(dr["DateAndTime"].ToString());
                ur.Institution = dr["Institution"].ToString();
                ur.Title = dr["Title"].ToString();
                ur.Description = dr["Description"].ToString();
                reports.Add(ur);
            }
            return reports;
        }

        public void Update(Report report)
        {
            throw new NotImplementedException();
        }
    }
}
