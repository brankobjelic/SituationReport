using SituationReport.Extensions;
using SituationReport.Interfaces;
using System.Collections;
using System.Drawing;
using System.Security.Cryptography;
using System.Text;
using System.Xml.Linq;
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
        public string GetImageName(string data, int userId)
        {
            string base64 = data.Substring(data.IndexOf(',') + 1);
            string hashed = Sha256Hash(base64);
            string imageName = userId.ToString() + '-' + hashed;
            return imageName;
        }

        public Image ResizeImage(Image image, int maxResolution)
        {


                var ratioX = (double)maxResolution / image.Width;
                var ratioY = (double)maxResolution / image.Height;

                var ratio = Math.Min(ratioX, ratioY);

                var width = (int)(image.Width * ratio);
                var height = (int)(image.Height * ratio);

                var newImage = new Bitmap(width, height);

                Graphics.FromImage(newImage).DrawImage(image, 0, 0, width, height);

                Image img = new Bitmap(newImage);
                return img;
        }


        public string Save(string file, int userId)
        {
            string imageName = GetImageName(file, userId);
            bool found = FindImageInFolder(imageName);
            if (!found)
            {
                String path = Path.GetFullPath("~/Content/Images").Replace("~\\", "");

                //Check if directory exist
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path); //Create directory if it doesn't exist
                }

                string base64 = file.Substring(file.IndexOf(',') + 1);

                byte[] imageBytes = Convert.FromBase64String(base64);

                var stream1 = new MemoryStream(imageBytes);
                Image img1 = new Bitmap(stream1);
                string base64String = Convert.ToBase64String(imageBytes);

                img1.ExifRotate();

                string resizedImageName = GetImageName(base64String, userId);

                Image resizedImage = ResizeImage(img1, 1024);

                string imgPath = Path.Combine(path, resizedImageName);

                resizedImage.Save(imgPath, System.Drawing.Imaging.ImageFormat.Jpeg);
                Byte[] b = System.IO.File.ReadAllBytes($@"Content\Images\{resizedImageName}");
                var base64OfFile = Convert.ToBase64String(b);
                string finalImageName = GetImageName(base64OfFile, userId);
                if (!File.Exists($@"Content\Images\{finalImageName}"))
                {
                    File.Move($@"Content\Images\{resizedImageName}", $@"Content\Images\{finalImageName}");
                    Image resizedThumbnailImage = ResizeImage(img1, 64);
                    string thumbnailImageName = finalImageName + "_tn";
                    string thumbnailImagePath = Path.Combine(path, thumbnailImageName);
                    resizedThumbnailImage.Save(thumbnailImagePath, System.Drawing.Imaging.ImageFormat.Jpeg);
                }
                else
                {
                    File.Delete($@"Content\Images\{resizedImageName}");
                }

                return finalImageName;
            }
            return imageName;
        }

        public string Sha256Hash(byte[] file)
        {
            StringBuilder Sb = new StringBuilder();

            using (SHA256 hash = SHA256.Create())
            {
                Byte[] result = hash.ComputeHash(file);

                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }

            return Sb.ToString();
        }

        public string Sha256Hash(string base64string)
        {
            StringBuilder Sb = new StringBuilder();

            using (SHA256 hash = SHA256.Create())
            {
                Byte[] result = hash.ComputeHash(Encoding.UTF8.GetBytes(base64string));

                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }

            return Sb.ToString();
        }

        public static byte[] ImageToByteArray(Image x)
        {
            ImageConverter _imageConverter = new ImageConverter();
            byte[] xByte = (byte[])_imageConverter.ConvertTo(x, typeof(byte[]));
            return xByte;
        }
    }
}
