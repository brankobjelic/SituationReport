using SituationReport.Extensions;
using SituationReport.Interfaces;
using System.Collections;
using System.Drawing;
using System.Security.Cryptography;
using System.Text;
using static System.Net.Mime.MediaTypeNames;
using Image = System.Drawing.Image;

namespace SituationReport.Repository
{
    public class FileRepository : IFileRepository
    {
        public bool FindImageInFolder(string image)
        {
            string[] files = Directory.GetFiles(@"Content\Images\", image);
            if (files.Length != 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        //file data from http request converts to byte array and returns hash
        public string GetImageName(string data)
        {
            string base64 = data.Substring(data.IndexOf(',') + 1);
            byte[] imageBytes = Convert.FromBase64String(base64);
            return Sha256Hash(imageBytes);
        }

        public byte[] ResizeImage(Image image)
        {
            //using (var ms = new MemoryStream(data))
            //{
                //var image = Image.FromStream(ms);

                var ratioX = (double)1024 / image.Width;
                var ratioY = (double)1024 / image.Height;

                var ratio = Math.Min(ratioX, ratioY);

                var width = (int)(image.Width * ratio);
                var height = (int)(image.Height * ratio);

                var newImage = new Bitmap(width, height);

                Graphics.FromImage(newImage).DrawImage(image, 0, 0, width, height);

                Bitmap bmp = new Bitmap(newImage);

                ImageConverter converter = new ImageConverter();

                return (byte[])converter.ConvertTo(bmp, typeof(byte[]));

                //return "data:image/*;base64," + Convert.ToBase64String(data);
            //}
        }

        

        public void Save(string file)
        {
            string newFileName = GetImageName(file);
            bool found = FindImageInFolder(newFileName);
            if (!found) 
            { 
                String path = Path.GetFullPath("~/Content/Images").Replace("~\\", "");

                //Check if directory exist
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path); //Create directory if it doesn't exist
                }

                //string imageName = Sha256Hash(file);

                //set the image path
                //string imgPath = Path.Combine(path, imageName);

                string base64 = file.Substring(file.IndexOf(',') + 1);
                //base64 = base64.Trim('\0');

                byte[] imageBytes = Convert.FromBase64String(base64);
                var stream1 = new MemoryStream(imageBytes);
                System.Drawing.Image img1 = new Bitmap(stream1);
                img1.ExifRotate();

                byte[] resizedImageBytes = ResizeImage(img1);

                string imageName = Sha256Hash(resizedImageBytes);
                string imgPath = Path.Combine(path, imageName);
                var stream = new MemoryStream(resizedImageBytes);
                System.Drawing.Image img = new Bitmap(stream);
                img.Save(imgPath, System.Drawing.Imaging.ImageFormat.Jpeg);

                //File.WriteAllBytes(imgPath, imageBytes);
            
            }

        }

        public string Sha256Hash(byte[] file)
        {
            StringBuilder Sb = new StringBuilder();

            using (SHA256 hash = SHA256.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(file);

                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }

            return Sb.ToString();
        }
    }
}
