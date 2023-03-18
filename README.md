# SituationReport
ASP.NET Web API (.NET 6) on the backend and a SPA made with the React library on the frontend make a Web application for reporting utility and other problems and situations to authorities.

On the frontend, Oauth is used to sign in via a Google account. On sign-in, check against the Users table in the SituationReportDB database is performed, and if not existing, a new user is created.

The user then can browse earlier reports and make a new one via form. Up to three photos can be attached to the report. The user will be able to send report to the appropriate authority using email or other available channels of communication.
