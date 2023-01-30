using SituationReport.Interfaces;
using SituationReport.Models;
using System.Data;
using System.Data.SqlClient;

namespace SituationReport.Repository
{
    public class UserRepository : IUserRepository
    {
        IConfiguration Configuration { get; }
        public UserRepository(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void Create(User user)
        {
            string query = "INSERT INTO Users(Name, Email) values " +
                            "(@Name, @Email)";

            string connectionString = Configuration.GetConnectionString("AppConnectionString");

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();

            connection.Open();

            command.CommandText = query;
            command.Parameters.AddWithValue("@Name", user.Name);
            command.Parameters.AddWithValue("@Email", user.Email);

            command.ExecuteNonQuery();

            command.Dispose();
            connection.Close();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public User Get(int id)
        {
            throw new NotImplementedException();
        }

        public List<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(User user)
        {
            throw new NotImplementedException();
        }

        //public User GetByEmail(string email)
        //{
        //    string query = "select * from Users where Email=" + email;

        //    string connectionString = Configuration.GetConnectionString("AppConnectionString");

        //    SqlConnection connection = new SqlConnection(connectionString);
        //    SqlCommand command = connection.CreateCommand();

        //    connection.Open();

        //    command.CommandText = query;

        //    DataSet ds = new DataSet();
        //    DataTable dt = new DataTable();

        //    SqlDataAdapter adapter = new SqlDataAdapter();
        //    adapter.SelectCommand = command;

        //    adapter.Fill(ds, "Users");
        //    dt = ds.Tables["Users"];

        //    command.Dispose();
        //    connection.Close();



        //    User u = new User();
        //    foreach (DataRow dr in dt.Rows)
        //    {
        //        u.Id = int.Parse(dr["Id"].ToString());
        //        u.Name = dr["Name"].ToString();
        //        u.Email = dr["Email"].ToString();
        //    }
        //    return u;
        //}

        public User getByEmail(string email)
        {
            string query = "select * from Users where Email='" + email + "'";

            string connectionString = Configuration.GetConnectionString("AppConnectionString");

            SqlConnection connection = new SqlConnection(connectionString);
            SqlCommand command = connection.CreateCommand();

            connection.Open();

            command.CommandText = query;

            DataSet ds = new DataSet();
            DataTable dt = new DataTable();

            SqlDataAdapter adapter = new SqlDataAdapter();
            adapter.SelectCommand = command;

            adapter.Fill(ds, "Users");
            dt = ds.Tables["Users"];

            command.Dispose();
            connection.Close();



            User u = new User();
            foreach (DataRow dr in dt.Rows)
            {
                u.Id = int.Parse(dr["Id"].ToString());
                u.Name = dr["Name"].ToString();
                u.Email = dr["Email"].ToString();
            }
            return u;
        }
    }
}
