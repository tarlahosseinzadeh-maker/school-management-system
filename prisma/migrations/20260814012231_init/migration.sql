-- CreateTable
CREATE TABLE `users` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `nationalCode` VARCHAR(10) NOT NULL,
    `phoneNumber` VARCHAR(20) NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `users_nationalCode_key`(`nationalCode`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `students` (
    `userId` INTEGER NOT NULL,
    `studentCode` VARCHAR(20) NOT NULL,
    `birthDate` DATETIME(3) NULL,
    `classId` INTEGER NULL,

    UNIQUE INDEX `students_studentCode_key`(`studentCode`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teachers` (
    `userId` INTEGER NOT NULL,
    `specialization` VARCHAR(100) NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `principals` (
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `physicalclasses` (
    `classId` INTEGER NOT NULL AUTO_INCREMENT,
    `className` VARCHAR(100) NOT NULL,
    `gradeLevel` VARCHAR(30) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `academicYear` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`classId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subjects` (
    `subjectId` INTEGER NOT NULL AUTO_INCREMENT,
    `subjectName` VARCHAR(100) NOT NULL,
    `gradeLevel` VARCHAR(30) NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`subjectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `classsubjects` (
    `classSubjectId` INTEGER NOT NULL AUTO_INCREMENT,
    `classId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,

    INDEX `classsubjects_subjectId_idx`(`subjectId`),
    UNIQUE INDEX `classsubjects_classId_subjectId_key`(`classId`, `subjectId`),
    PRIMARY KEY (`classSubjectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `preregistrations` (
    `preRegistrationId` INTEGER NOT NULL AUTO_INCREMENT,
    `studentFirstName` VARCHAR(50) NOT NULL,
    `studentLastName` VARCHAR(50) NOT NULL,
    `fatherName` VARCHAR(50) NULL,
    `phoneNumber` VARCHAR(20) NOT NULL,
    `requestedGrade` VARCHAR(30) NOT NULL,
    `description` TEXT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`preRegistrationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `physicalclasses`(`classId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `principals` ADD CONSTRAINT `principals_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classsubjects` ADD CONSTRAINT `classsubjects_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `physicalclasses`(`classId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classsubjects` ADD CONSTRAINT `classsubjects_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `subjects`(`subjectId`) ON DELETE RESTRICT ON UPDATE CASCADE;
