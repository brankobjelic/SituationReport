using System.Drawing;

namespace SituationReport.Interfaces
{
    public interface IFileRepository
    {
        void Save(string file);
        string Sha256Hash(byte[] file);
        byte[] ResizeImage(Image data);
        string GetImageName(string data);
        bool FindImageInFolder(string image);
    }
}
