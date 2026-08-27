CREATE TABLE `timetables` (
    `timetableId` INTEGER NOT NULL AUTO_INCREMENT,
    `classSubjectId` INTEGER NOT NULL,
    `classId` INTEGER NOT NULL,
    `dayOfWeek` INTEGER NOT NULL,
    `period` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`timetableId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE UNIQUE INDEX `timetables_classId_dayOfWeek_period_key`
ON `timetables` (`classId`, `dayOfWeek`, `period`);

CREATE INDEX `timetables_classSubjectId_idx`
ON `timetables` (`classSubjectId`);

ALTER TABLE `timetables` ADD CONSTRAINT `timetables_classSubjectId_fkey` FOREIGN KEY (`classSubjectId`) REFERENCES `classsubjects`(`classSubjectId`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `timetables` ADD CONSTRAINT `timetables_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `physicalclasses`(`classId`) ON DELETE CASCADE ON UPDATE CASCADE;
