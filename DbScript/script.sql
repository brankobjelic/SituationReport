USE [master]
GO
/****** Object:  Database [SituationReportDB]    Script Date: 31.1.2023. 09:50:30 ******/
CREATE DATABASE [SituationReportDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SituationReportDB', FILENAME = N'C:\Users\brank\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\mssqllocaldb\SituationReportDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SituationReportDB_log', FILENAME = N'C:\Users\brank\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\mssqllocaldb\SituationReportDB.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [SituationReportDB] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SituationReportDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SituationReportDB] SET ANSI_NULL_DEFAULT ON 
GO
ALTER DATABASE [SituationReportDB] SET ANSI_NULLS ON 
GO
ALTER DATABASE [SituationReportDB] SET ANSI_PADDING ON 
GO
ALTER DATABASE [SituationReportDB] SET ANSI_WARNINGS ON 
GO
ALTER DATABASE [SituationReportDB] SET ARITHABORT ON 
GO
ALTER DATABASE [SituationReportDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SituationReportDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SituationReportDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SituationReportDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SituationReportDB] SET CURSOR_DEFAULT  LOCAL 
GO
ALTER DATABASE [SituationReportDB] SET CONCAT_NULL_YIELDS_NULL ON 
GO
ALTER DATABASE [SituationReportDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SituationReportDB] SET QUOTED_IDENTIFIER ON 
GO
ALTER DATABASE [SituationReportDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SituationReportDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SituationReportDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SituationReportDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SituationReportDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SituationReportDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SituationReportDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SituationReportDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SituationReportDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SituationReportDB] SET RECOVERY FULL 
GO
ALTER DATABASE [SituationReportDB] SET  MULTI_USER 
GO
ALTER DATABASE [SituationReportDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SituationReportDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SituationReportDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SituationReportDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SituationReportDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SituationReportDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [SituationReportDB] SET QUERY_STORE = OFF
GO
USE [SituationReportDB]
GO
/****** Object:  Table [dbo].[Causes]    Script Date: 31.1.2023. 09:50:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Causes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NOT NULL,
	[Description] [nvarchar](2048) NULL,
	[Email] [nvarchar](150) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reports]    Script Date: 31.1.2023. 09:50:30 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reports](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[CauseId] [int] NOT NULL,
	[DateAndTime] [datetime] NULL,
	[Title] [nvarchar](150) NOT NULL,
	[Description] [nvarchar](2048) NOT NULL,
 CONSTRAINT [PK__Reports__3214EC07D77B958A] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 31.1.2023. 09:50:30 ******/
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

INSERT [dbo].[Causes] ([Id], [Name], [Description], [Email]) VALUES (1, N'Gradsko zelenilo', N'Prijava palog drveta, obolelih ili oštecenih stabala', N'prijava@zelenilo.com')
INSERT [dbo].[Causes] ([Id], [Name], [Description], [Email]) VALUES (2, N'Gradska inspekcija', N'oštecenja vertikalne signalizacije, javne rasvete, kao i svih drugih oštecenja na javnoj površini', N'inspekcija@gradnovisad.gov.rs')
SET IDENTITY_INSERT [dbo].[Causes] OFF
GO
SET IDENTITY_INSERT [dbo].[Reports] ON 

INSERT [dbo].[Reports] ([Id], [UserId], [CauseId], [DateAndTime], [Title], [Description]) VALUES (1, 1, 1, CAST(N'2023-01-21T13:56:04.497' AS DateTime), N'Palo drvo', N'Stablo se preprecilo na putu, ulica Futoška 17, kod elektro skole.')
INSERT [dbo].[Reports] ([Id], [UserId], [CauseId], [DateAndTime], [Title], [Description]) VALUES (2, 2, 2, CAST(N'2023-01-21T13:56:38.407' AS DateTime), N'Pao saobracajni znak', N'U Vojvodjanskoj ulici pao saobracajni znak koji obeležava pešacki prelaz.')
INSERT [dbo].[Reports] ([Id], [UserId], [CauseId], [DateAndTime], [Title], [Description]) VALUES (5, 2, 1, CAST(N'2023-01-21T23:23:42.763' AS DateTime), N'Trulo stablo', N'U Sremskoj ulici kod broja 9 nalazi se stablo koje je unutra trulo. Potencijalna opasnost za prolaznike.')
INSERT [dbo].[Reports] ([Id], [UserId], [CauseId], [DateAndTime], [Title], [Description]) VALUES (1005, 2, 2, CAST(N'2023-01-29T17:43:15.857' AS DateTime), N'Pokvaren semafor', N'Na semaforu u Stojana novakovica ne pali se zeleno svetlo.')
SET IDENTITY_INSERT [dbo].[Reports] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([Id], [Name], [Email]) VALUES (1, N'joj', N'joj@example.com')
INSERT [dbo].[Users] ([Id], [Name], [Email]) VALUES (2, N'Branko Bjelic', N'branko.bjelic@gmail.com')
SET IDENTITY_INSERT [dbo].[Users] OFF
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
USE [master]
GO
ALTER DATABASE [SituationReportDB] SET  READ_WRITE 
GO
