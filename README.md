# SituationReport
ASP.NET Web API (.NET 6) on the backend and a SPA made with the React library on the frontend make a Web application for reporting utility and other problems and situations to authorities.

On the frontend, Google Identity Services is used to sign in via a Google account. Web API on the backend performs verification of the received id token, after which a check against the Users table in the SituationReportDB database is performed, and if not existing, a new user is created. The token is saved for authorization of subsequent requests.

The user then can browse earlier reports and make a new one via form. Up to three photos can be attached to the report. The user can also provide his/her GPS coordinates in the report by pressing the Geolocation button on the form. After filling in the form, the user can save the created report to send it later or send it immediately to the appropriate authority by email. When choosing this option, the application opens the user's default mail application and creates an email with filled-in report text and links to google maps with location and attached photos. The user just needs to press Send button.
