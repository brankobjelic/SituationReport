using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using SituationReport.Interfaces;
using MailKit.Net.Smtp;

namespace SituationReport.Services
{
    public class EmailService : IEmailService
    {

        IConfiguration Configuration { get; }

        public EmailService(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public void Send(string name, string senderEmailAddress, string body)
        {
            // create message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(Configuration["MailSettings:From"]));
            email.To.Add(MailboxAddress.Parse(Configuration["MailSettings:From"]));
            email.ReplyTo.Add(MailboxAddress.Parse(senderEmailAddress));
            email.Subject = Configuration["MailSettings:DisplayName"];
            email.Body = new TextPart(TextFormat.Html) 
                { Text = $"<p>Pošiljalac: {name} (<a href='mailto:{senderEmailAddress}'>{senderEmailAddress}</a>)</p><p>{body}</p>" };

            // send email
            using var smtp = new SmtpClient();
            smtp.Connect(Configuration["MailSettings:Host"], int.Parse(Configuration["MailSettings:Port"]), SecureSocketOptions.StartTls);
            smtp.Authenticate(Configuration["MailSettings:UserName"], Configuration["MailSettings:Password"]);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
