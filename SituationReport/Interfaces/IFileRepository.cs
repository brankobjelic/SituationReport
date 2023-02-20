using System.Drawing;

namespace SituationReport.Interfaces
{
    public interface IFileRepository
    {
        void Save(string file);
        string Sha256Hash(string file);
        byte[] ResizeImage(byte[] data);
    }
}
