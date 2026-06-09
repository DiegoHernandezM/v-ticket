/*
  Warnings:

  - A unique constraint covering the columns `[companyId,slug]` on the table `ticket_statuses` will be added. If there are existing duplicate values, this will fail.
  - Made the column `companyId` on table `ticket_statuses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ticket_statuses` DROP FOREIGN KEY `ticket_statuses_companyId_fkey`;

-- DropIndex
DROP INDEX `ticket_statuses_companyId_fkey` ON `ticket_statuses`;

-- AlterTable
ALTER TABLE `ticket_statuses` MODIFY `companyId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tickets` ADD COLUMN `help_desk_team_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `help_desk_teams` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `help_desk_teams_companyId_name_key`(`companyId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `help_desk_team_members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teamId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `help_desk_team_members_teamId_userId_key`(`teamId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ticket_statuses_companyId_slug_key` ON `ticket_statuses`(`companyId`, `slug`);

-- AddForeignKey
ALTER TABLE `ticket_statuses` ADD CONSTRAINT `ticket_statuses_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_help_desk_team_id_fkey` FOREIGN KEY (`help_desk_team_id`) REFERENCES `help_desk_teams`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `help_desk_teams` ADD CONSTRAINT `help_desk_teams_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `help_desk_team_members` ADD CONSTRAINT `help_desk_team_members_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `help_desk_teams`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `help_desk_team_members` ADD CONSTRAINT `help_desk_team_members_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
