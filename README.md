# SituationReport
ASP.NET Web API (.NET 6) on backend and SPA made with React library on frontend make a Web application for reporting utility and other problems and situations to authorities.  

On the frontend Oauth is used to sign in via Google account. On sign-in, check against the Users table in the SituationReportDB database is performed, and if not existing, a new user is created.  

The user then can browse earlier reports and make a new one via form. The user will be able to send report to appropriate authority using email or other available channels of communication.
