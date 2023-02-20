﻿using Microsoft.Extensions.Configuration;
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
        IFileRepository FileRepository { get; }
        public ReportRepository(IConfiguration configuration, IFileRepository fileRepository)
        {
            Configuration = configuration;
            FileRepository = fileRepository;
        }
        public void Create(Report report)
        {
            string query = "INSERT INTO Reports(CauseId, UserId, DateAndTime, Location, Title, Description, Pic1, Pic2, Pic3) " +
                "values (@CauseId, @UserId, CURRENT_TIMESTAMP, @Location, @Title, @Description, @Pic1, @Pic2, @Pic3)";

            string connectionString = Configuration.GetConnectionString("AppConnectionString");

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();

            connection.Open();

            command.CommandText = query;
            command.Parameters.AddWithValue("@CauseId", report.CauseId);
            command.Parameters.AddWithValue("@UserId", report.UserId);
            command.Parameters.AddWithValue("@Location", report.Location);
            command.Parameters.AddWithValue("@Title", report.Title);
            command.Parameters.AddWithValue("@Description", report.Description);
            command.Parameters.AddWithValue("@Pic1", string.IsNullOrEmpty(report.Pic1) ? (object)DBNull.Value : FileRepository.Sha256Hash(report.Pic1));
            command.Parameters.AddWithValue("@Pic2", string.IsNullOrEmpty(report.Pic2) ? (object)DBNull.Value : FileRepository.Sha256Hash(report.Pic2));
            command.Parameters.AddWithValue("@Pic3", string.IsNullOrEmpty(report.Pic3) ? (object)DBNull.Value : FileRepository.Sha256Hash(report.Pic3));

            command.ExecuteNonQuery();

            command.Dispose();
            connection.Close();
        }

        public void Delete(int id)
        {
            string query = "DELETE FROM Reports WHERE id=@Id;";

            string connectionString = Configuration.GetConnectionString("AppConnectionString");

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();
            command.Parameters.AddWithValue("@Id", id);
            connection.Open();
            command.CommandText = query;
            command.ExecuteNonQuery();
            command.Dispose();
            connection.Close();
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
            string query = "select Reports.Id As Id, Institutions.name as Institution, CauseId, Causes.Description " +
                "as CauseDescription, DateAndTime, Location, Title, Reports.Description as Description " +
                "from reports left join causes on causeid = causes.id left join institutions " +
                "on causes.InstitutionId = institutions.id left join users on userid = users.id " +
                "where users.email = @email";

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
                ur.CauseId = Int32.Parse(dr["CauseId"].ToString());
                ur.CauseDescription = dr["CauseDescription"].ToString();
                ur.Location = dr["Location"].ToString();
                ur.Title = dr["Title"].ToString();
                ur.Description = dr["Description"].ToString();
                reports.Add(ur);
            }
            return reports;
        }

        public void Update(Report report)
        {
            string query = "Update Reports set CauseId=@CauseId, DateAndTime=CURRENT_TIMESTAMP, Title=@Title, Location=@Location, Description=@Description where Id=@Id;";

            string connectionString = Configuration.GetConnectionString("AppConnectionString");

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();

            connection.Open();

            command.CommandText = query;
            command.Parameters.AddWithValue("@CauseId", report.CauseId);
            command.Parameters.AddWithValue("@Title", report.Title);
            command.Parameters.AddWithValue("@Location", report.Location);
            command.Parameters.AddWithValue("@Description", report.Description);
            command.Parameters.AddWithValue("@Id", report.Id);

            command.ExecuteNonQuery();

            command.Dispose();
            connection.Close();
        }
    }
}
