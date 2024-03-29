USE [master]
GO
/****** Object:  Database [SituationReportDB]    Script Date: 19.6.2023. 18:16:58 ******/
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
/****** Object:  Table [dbo].[Causes]    Script Date: 19.6.2023. 18:16:58 ******/
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
/****** Object:  Table [dbo].[Institutions]    Script Date: 19.6.2023. 18:16:58 ******/
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
/****** Object:  Table [dbo].[Reports]    Script Date: 19.6.2023. 18:16:58 ******/
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
	[Latitude] [decimal](12, 9) NULL,
	[Longitude] [decimal](12, 9) NULL,
	[Title] [nvarchar](150) NULL,
	[Description] [nvarchar](2048) NOT NULL,
	[Pic1] [nvarchar](80) NULL,
	[Pic2] [nvarchar](80) NULL,
	[Pic3] [nvarchar](80) NULL,
 CONSTRAINT [PK__Reports__3214EC07D77B958A] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 19.6.2023. 18:16:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](150) NULL,
	[Username] [nvarchar](150) NULL,
	[Email] [nvarchar](150) NOT NULL,
	[Token] [nvarchar](2048) NULL,
 CONSTRAINT [PK__Users__3214EC0797D84D6B] PRIMARY KEY CLUSTERED 
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

INSERT [dbo].[Institutions] ([Id], [Name], [Email], [Phone]) VALUES (1, N'Gradska komunalna inspekcija', N'1komunalna.policija@inspekcija.novisad.rs', N'021/4872 544')
INSERT [dbo].[Institutions] ([Id], [Name], [Email], [Phone]) VALUES (2, N'JKP Gradsko zelenilo Novi Sad', N'2marketing@zelenilo.com', N'021 21 00 266')
INSERT [dbo].[Institutions] ([Id], [Name], [Email], [Phone]) VALUES (3, N'JKP Zoohigijena i veterina Novi Sad', N'3prihvatiliste.novisad@zoohigijenans.co.rs', N'021 640 3220')
SET IDENTITY_INSERT [dbo].[Institutions] OFF
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
USE [master]
GO
ALTER DATABASE [SituationReportDB] SET  READ_WRITE 
GO
