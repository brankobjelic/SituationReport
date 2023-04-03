namespace SituationReport.Interfaces
{
    public interface IEmailService
    {
        void Send(string name, string senderEmailAddress, string body);
    }
}
