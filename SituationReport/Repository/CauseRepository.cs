using Microsoft.Extensions.Configuration;
using SituationReport.Interfaces;
using SituationReport.Models;
using System.Data.SqlClient;
using System.Data;

namespace SituationReport.Repository
{
    public class CauseRepository : ICauseRepository
    {
        IConfiguration Configuration { get; }
        public CauseRepository(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void Create(Cause cause)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Cause Get(int id)
        {
            throw new NotImplementedException();
        }

        public List<Cause> GetAll()
        {
            string query = "select * from Causes";

            string connectionString = Configuration.GetConnectionString("AppConnectionString");

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();

            connection.Open();

            command.CommandText = query;

            DataSet ds = new DataSet();
            DataTable dt = new DataTable();

            SqlDataAdapter adapter = new SqlDataAdapter();
            adapter.SelectCommand = command;

            adapter.Fill(ds, "Causes");
            dt = ds.Tables["Causes"];

            command.Dispose();
            connection.Close();


            List<Cause> causes = new List<Cause>();

            foreach (DataRow dr in dt.Rows)
            {
                Cause c = new Cause();
                c.Id = (int)dr["Id"];
                c.Name = dr["Name"].ToString();
                c.Email = dr["Email"].ToString();
                c.Description = dr["Description"].ToString();
                causes.Add(c);
            }
            return causes;
        }

        public void Update(Cause cause)
        {
            throw new NotImplementedException();
        }
    }
}
