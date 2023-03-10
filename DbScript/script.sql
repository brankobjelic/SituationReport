USE [SituationReportDB]
GO
/****** Object:  Table [dbo].[Causes]    Script Date: 18.2.2023. 01:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Causes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[InstitutionId] [int] NOT NULL,
	[Description] [nvarchar](2048) NULL,
 CONSTRAINT [PK__Causes__3214EC07A177DD76] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Institutions]    Script Date: 18.2.2023. 01:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Institutions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NOT NULL,
	[Email] [nvarchar](150) NULL,
	[Phone] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reports]    Script Date: 18.2.2023. 01:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reports](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[CauseId] [int] NOT NULL,
	[DateAndTime] [datetime] NOT NULL,
	[Location] [nvarchar](300) NULL,
	[Title] [nvarchar](150) NULL,
	[Description] [nvarchar](2048) NOT NULL,
	[Pic1] [nvarchar](64) NULL,
	[Pic2] [nvarchar](64) NULL,
	[Pic3] [nvarchar](64) NULL,
 CONSTRAINT [PK__Reports__3214EC07D77B958A] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 18.2.2023. 01:05:33 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NULL,
	[Email] [nvarchar](150) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Causes] ON 

INSERT [dbo].[Causes] ([Id], [InstitutionId], [Description]) VALUES (1, 1, N'Oštećena javna rasveta')
INSERT [dbo].[Causes] ([Id], [InstitutionId], [Description]) VALUES (2, 1, N'Srušen saobraćajni znak')
INSERT [dbo].[Causes] ([Id], [InstitutionId], [Description]) VALUES (3, 1, N'Nepravilno odlaganje smeća')
INSERT [dbo].[Causes] ([Id], [InstitutionId], [Description]) VALUES (4, 1, N'Druge nepravilnosti na javnoj površini')
INSERT [dbo].[Causes] ([Id], [InstitutionId], [Description]) VALUES (5, 2, N'Prijava drveta ili drugog zelenila koje predstavlja opasnost po život, zdravlje ili imovinu')
INSERT [dbo].[Causes] ([Id], [InstitutionId], [Description]) VALUES (6, 3, N'Napuštene i izgubljene životinje')
INSERT [dbo].[Causes] ([Id], [InstitutionId], [Description]) VALUES (7, 3, N'Prijava leševa životinja na javnoj površini')
INSERT [dbo].[Causes] ([Id], [InstitutionId], [Description]) VALUES (8, 3, N'Prijava prisutnosti štetnih mikroorganizama, glodara i insekata')
SET IDENTITY_INSERT [dbo].[Causes] OFF
GO
SET IDENTITY_INSERT [dbo].[Institutions] ON 

INSERT [dbo].[Institutions] ([Id], [Name], [Email], [Phone]) VALUES (1, N'Gradska komunalna inspekcija', N'komunalna.policija@inspekcija.novisad.rs', N'021/4872 544')
INSERT [dbo].[Institutions] ([Id], [Name], [Email], [Phone]) VALUES (2, N'JKP Gradsko zelenilo Novi Sad', N'marketing@zelenilo.com', N'021 21 00 266')
INSERT [dbo].[Institutions] ([Id], [Name], [Email], [Phone]) VALUES (3, N'JKP Zoohigijena i veterina Novi Sad', N'prihvatiliste.novisad@zoohigijenans.co.rs', N'021 640 3220')
SET IDENTITY_INSERT [dbo].[Institutions] OFF
GO
SET IDENTITY_INSERT [dbo].[Reports] ON 

INSERT [dbo].[Reports] ([Id], [UserId], [CauseId], [DateAndTime], [Location], [Title], [Description], [Pic1], [Pic2], [Pic3]) VALUES (1, 1, 1, CAST(N'2023-02-03T23:39:31.067' AS DateTime), N'Bukovac, Nikole Tesle', N'Ne radi ulicna rasveta', N'Nema ulicnog svetla u ulici Nikole Tesle', NULL, NULL, NULL)
INSERT [dbo].[Reports] ([Id], [UserId], [CauseId], [DateAndTime], [Location], [Title], [Description], [Pic1], [Pic2], [Pic3]) VALUES (40, 2, 5, CAST(N'2023-02-08T11:00:44.077' AS DateTime), N'Jabuka', N'Gori vatraaaaa', N'SAd u namaaaaaa', NULL, NULL, NULL)
INSERT [dbo].[Reports] ([Id], [UserId], [CauseId], [DateAndTime], [Location], [Title], [Description], [Pic1], [Pic2], [Pic3]) VALUES (58, 2, 6, CAST(N'2023-02-08T17:27:58.497' AS DateTime), N'Sr. Karlovci', N'Nestala kera.', N'Nestao crni ker. Odaziva se ne ime Bleki.', NULL, NULL, NULL)
INSERT [dbo].[Reports] ([Id], [UserId], [CauseId], [DateAndTime], [Location], [Title], [Description], [Pic1], [Pic2], [Pic3]) VALUES (1003, 2, 1, CAST(N'2023-02-18T00:30:39.180' AS DateTime), N'aa', N'aaa', N'aaaa', N'1a9c5155185f41df1ce58a5517dc7c29eebf5412a17c22df66e684a21b7d5689', N'0b20aff0cd2579941fa0eab5aa98f17ac960913176894db871afa0bcb728762c', N'cb5ad42552db8fee63cc369bfae29adbc324ec1e762c047a8146a9344b68dd10')
SET IDENTITY_INSERT [dbo].[Reports] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Name], [Email]) VALUES (1, N'joj', N'joj@example.com')
INSERT [dbo].[Users] ([Id], [Name], [Email]) VALUES (2, N'Branko Bjelic', N'branko.bjelic@gmail.com')
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[Causes]  WITH CHECK ADD  CONSTRAINT [FK__Causes__Institut__4AB81AF0] FOREIGN KEY([InstitutionId])
REFERENCES [dbo].[Institutions] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Causes] CHECK CONSTRAINT [FK__Causes__Institut__4AB81AF0]
GO
ALTER TABLE [dbo].[Reports]  WITH CHECK ADD  CONSTRAINT [FK__Reports__CauseId__412EB0B6] FOREIGN KEY([CauseId])
REFERENCES [dbo].[Causes] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Reports] CHECK CONSTRAINT [FK__Reports__CauseId__412EB0B6]
GO
ALTER TABLE [dbo].[Reports]  WITH CHECK ADD  CONSTRAINT [FK__Reports__UserId__403A8C7D] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Reports] CHECK CONSTRAINT [FK__Reports__UserId__403A8C7D]
GO
