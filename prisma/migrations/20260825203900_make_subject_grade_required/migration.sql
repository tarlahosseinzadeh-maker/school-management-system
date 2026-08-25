-- Make gradeLevel required in subjects table
ALTER TABLE `subjects` MODIFY COLUMN `gradeLevel` VARCHAR(30) NOT NULL;
