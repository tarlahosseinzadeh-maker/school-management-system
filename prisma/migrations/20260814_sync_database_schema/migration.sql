-- Add teacher relation to classsubjects

ALTER TABLE `classsubjects`
ADD COLUMN `teacherId` INTEGER NOT NULL DEFAULT 1;


CREATE INDEX `classsubjects_teacherId_idx`
ON `classsubjects`(`teacherId`);


CREATE UNIQUE INDEX `classsubjects_classId_subjectId_teacherId_key`
ON `classsubjects`
(`classId`, `subjectId`, `teacherId`);



CREATE TABLE `grades` (

    `gradeId` INTEGER NOT NULL AUTO_INCREMENT,

    `studentId` INTEGER NOT NULL,

    `classSubjectId` INTEGER NOT NULL,

    `score` DOUBLE NOT NULL,

    `examType` VARCHAR(50) NOT NULL,

    `examDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`gradeId`)

);



CREATE TABLE `assignments` (

    `assignmentId` INTEGER NOT NULL AUTO_INCREMENT,

    `classSubjectId` INTEGER NOT NULL,

    `title` VARCHAR(200) NOT NULL,

    `description` TEXT NULL,

    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    `deadline` DATETIME(3) NOT NULL,

    `status` VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`assignmentId`)

);



CREATE TABLE `educationalfiles` (

    `fileId` INTEGER NOT NULL AUTO_INCREMENT,

    `classSubjectId` INTEGER NOT NULL,

    `title` VARCHAR(200) NOT NULL,

    `fileName` VARCHAR(255) NOT NULL,

    `fileType` VARCHAR(50) NOT NULL,

    `filePath` VARCHAR(500) NOT NULL,

    `description` TEXT NULL,

    `uploadDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`fileId`)

);