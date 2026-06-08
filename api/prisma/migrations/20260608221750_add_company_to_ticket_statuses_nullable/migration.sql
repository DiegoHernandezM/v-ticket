-- DropIndex
DROP INDEX `ticket_statuses_slug_key` ON `ticket_statuses`;

-- AlterTable
ALTER TABLE `ticket_statuses` ADD COLUMN `companyId` INTEGER NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isDefault` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `ticket_statuses` ADD CONSTRAINT `ticket_statuses_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
