using System.Drawing;

namespace SituationReport.Interfaces
{
    public interface IFileRepository
    {
        string Save(string file, int userId);
        string Sha256Hash(byte[] file);
        Image ResizeImage(Image data, int maxResolution);
        string GetImageName(string data, int userId);
        bool FindImageInFolder(string image);
    }
}
