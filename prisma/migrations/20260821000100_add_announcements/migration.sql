CREATE TABLE `announcements` (
    `announcementId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(200) NOT NULL,
    `content` TEXT NOT NULL,
    `coverImage` VARCHAR(500) NOT NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`announcementId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE `announcementimages` (
    `imageId` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(500) NOT NULL,
    `announcementId` INTEGER NOT NULL,

    PRIMARY KEY (`imageId`),

    CONSTRAINT `announcementImages_announcementId_fkey`
        FOREIGN KEY (`announcementId`)
        REFERENCES `announcements` (`announcementId`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);