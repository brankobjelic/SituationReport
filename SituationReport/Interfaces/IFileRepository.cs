using System.Drawing;

namespace SituationReport.Interfaces
{
    public interface IFileRepository
    {
        string Save(string file);
        string Sha256Hash(byte[] file);
        Image ResizeImage(Image data);
        string GetImageName(string data);
        bool FindImageInFolder(string image);
    }
}
