CREATE TABLE `users` (
  `Id` integer PRIMARY KEY,
  `UserType` varchar(255),
  `FirstName` varchar(255),
  `LastName` varchar(255),
  `UserName` varchar(255),
  `OfficeEmailId` varchar(255),
  `Mobile` varchar(255),
  `Password` varchar(255),
  `Customerid` integer,
  `JoiningDate` date,
  `ConsultantType` varchar(255),
  `Position` varchar(255),
  `DateOfBirth` date,
  `Status` bool,
  `Locked` varchar(255),
  `Language` varchar(255),
  `Created_at` datetime,
  `Modifiedat` datetime,
  `Createdby` int,
  `Modifiedby` int
);

CREATE TABLE `customers` (
  `Id` integer PRIMARY KEY,
  `CustomerName` varchar(255),
  `CustomerNameHebrew` varchar(255),
  `Email` varchar(255),
  `PhoneNumber` varchar(255),
  `Country` varchar(255),
  `ProjectType` varchar(255),
  `SiteLocation` varchar(255),
  `DistanceInKm` varchar(255),
  `SAPVersion` varchar(255),
  `SAPCode` varchar(255),
  `ControlCenterUser` varchar(255),
  `ControlCenterPass` varchar(255),
  `InstallationCredentials` varchar(255),
  `Status` bool,
  `Created_at` datetime,
  `Modifiedat` datetime,
  `Createdby` int,
  `Modifiedby` int
);

CREATE TABLE `contacts` (
  `Id` integer PRIMARY KEY,
  `Customerid` int,
  `ContactName` varchar(255),
  `Email` varchar(255),
  `Phone` varchar(255),
  `Extension` varchar(255),
  `Cellular` varchar(255),
  `Position` varchar(255),
  `AccessPortal` bool,
  `SendEmail` bool,
  `Locked` varchar(255),
  `Status` bool,
  `isPrimary` bool,
  `Created_at` datetime,
  `Modifiedat` datetime,
  `Createdby` int,
  `Modifiedby` int
);

CREATE TABLE `projects` (
  `Id` integer PRIMARY KEY,
  `ProjectType` varchar(255),
  `FromDate` date,
  `ToDate` date,
  `Customerid` int,
  `ContactId` int,
  `ProjectName` varchar(255),
  `ProjectNameHebrew` varchar(255),
  `ProjectMethod` varchar(255),
  `Budget` varchar(255),
  `Status` bool,
  `Created_at` datetime,
  `Modifiedat` datetime,
  `Createdby` int,
  `Modifiedby` int
);

CREATE TABLE `tasks` (
  `Id` integer PRIMARY KEY,
  `TicketNumber` integer,
  `ProjectId` int,
  `TaskName` varchar(255),
  `TaskNameHebrew` varchar(255),
  `Status` varchar(255),
  `Comments` varchar(255),
  `ApprovedHours` varchar(255),
  `Priority` varchar(255),
  `Description` varchar(255),
  `AssignTouser` varchar(255),
  `Created_at` datetime,
  `Modifiedat` datetime,
  `Createdby` int,
  `Modifiedby` int
);

CREATE TABLE `timeEntries` (
  `Id` integer PRIMARY KEY,
  `StartDate` date,
  `StartTime` time,
  `EndDate` date,
  `EndTime` time,
  `Task` varchar(255),
  `Description` varchar(255),
  `IsBillable` bool,
  `InternalNotes` varchar(255),
  `Status` bool,
  `Created_at` datetime,
  `Modifiedat` datetime,
  `Createdby` int,
  `Modifiedby` int
);

CREATE TABLE `customerConnections` (
  `Id` Interger PRIMARY KEY,
  `CustomerId` int,
  `ConnectionType` varchar(255),
  `VpnType` varchar(255),
  `Address` varchar(255),
  `User` varchar(255),
  `Password` varchar(255),
  `Comments` varchar(255),
  `Status` bool,
  `Created_at` datetime,
  `Modifiedat` datetime,
  `Createdby` int,
  `Modifiedby` int
);

CREATE TABLE `projectHours` (
  `Id` Interger PRIMARY KEY,
  `ProjectId` int,
  `ConnectionType` varchar(255),
  `OrderNumber` varchar(255),
  `Hours` float,
  `Comments` varchar(255),
  `Status` bool,
  `Created_at` datetime,
  `Modifiedat` datetime,
  `Createdby` int,
  `Modifiedby` int
);

CREATE TABLE `taskAttachments` (
  `Id` Interger PRIMARY KEY,
  `TaskId` int,
  `FileName` varchar(255),
  `Path` varchar(255),
  `Comments` varchar(255),
  `Status` bool,
  `Created_at` datetime,
  `Modifiedat` datetime,
  `Createdby` int,
  `Modifiedby` int
);

CREATE TABLE `taskChat` (
  `Id` Interger PRIMARY KEY,
  `TaskId` int,
  `ChatNote` varchar(255),
  `Emoji` varchar(255),
  `Flaged` bool,
  `Status` bool,
  `TagUserId` varchar(255),
  `ParentChat` int,
  `Created_at` datetime,
  `Modifiedat` datetime,
  `Createdby` int,
  `Modifiedby` int
);

ALTER TABLE `contacts` ADD FOREIGN KEY (`Id`) REFERENCES `projects` (`ContactId`);

ALTER TABLE `users` ADD FOREIGN KEY (`Id`) REFERENCES `tasks` (`AssignTouser`);

ALTER TABLE `projects` ADD FOREIGN KEY (`Id`) REFERENCES `tasks` (`ProjectId`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`Id`) REFERENCES `timeEntries` (`Task`);

ALTER TABLE `customers` ADD FOREIGN KEY (`Id`) REFERENCES `projects` (`Customerid`);

ALTER TABLE `customers` ADD FOREIGN KEY (`Id`) REFERENCES `users` (`Customerid`);

ALTER TABLE `customers` ADD FOREIGN KEY (`Id`) REFERENCES `contacts` (`Customerid`);

ALTER TABLE `customers` ADD FOREIGN KEY (`Id`) REFERENCES `customerConnections` (`CustomerId`);

ALTER TABLE `projects` ADD FOREIGN KEY (`Id`) REFERENCES `projectHours` (`ProjectId`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`Id`) REFERENCES `taskAttachments` (`TaskId`);

ALTER TABLE `tasks` ADD FOREIGN KEY (`Id`) REFERENCES `taskChat` (`TaskId`);
