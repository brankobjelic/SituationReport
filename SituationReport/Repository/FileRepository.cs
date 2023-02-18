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

        public static string MD5Hash(string text)
        {
            MD5 md5 = new MD5CryptoServiceProvider();

            //compute hash from the bytes of text  
            md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(text));


            //get hash result after compute it  
            byte[] result = md5.Hash;

            StringBuilder strBuilder = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                //change it into 2 hexadecimal digits  
                //for each byte  
                strBuilder.Append(result[i].ToString("x2"));
            }

            return strBuilder.ToString();
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
