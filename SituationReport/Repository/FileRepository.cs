using SituationReport.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace SituationReport.Repository
{
    public class FileRepository : IFileRepository
    {
        public void Save(string file)
        {
            String path = Path.GetFullPath("~/Content/Images").Replace("~\\", "");

            //Check if directory exist
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path); //Create directory if it doesn't exist
            }

            string imageName = Sha256Hash(file);

            //set the image path
            string imgPath = Path.Combine(path, imageName);

            string base64 = file.Substring(file.IndexOf(',') + 1);
            //base64 = base64.Trim('\0');

            byte[] imageBytes = Convert.FromBase64String(base64);

            File.WriteAllBytes(imgPath, imageBytes);
        }

        public string Sha256Hash(string file)
        {
            StringBuilder Sb = new StringBuilder();

            using (SHA256 hash = SHA256.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(file));

                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }

            return Sb.ToString();
        }
    }
}
