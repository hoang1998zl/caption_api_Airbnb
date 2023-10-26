-- DropForeignKey
ALTER TABLE `nguoi_dung` DROP FOREIGN KEY `nguoi_dung_gioi_tinh_id_fkey`;

-- DropForeignKey
ALTER TABLE `nguoi_dung` DROP FOREIGN KEY `nguoi_dung_role_id_fkey`;

-- AlterTable
ALTER TABLE `nguoi_dung` MODIFY `gioi_tinh_id` INTEGER NULL,
    MODIFY `role_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `nguoi_dung` ADD CONSTRAINT `nguoi_dung_gioi_tinh_id_fkey` FOREIGN KEY (`gioi_tinh_id`) REFERENCES `gioi_tinh`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nguoi_dung` ADD CONSTRAINT `nguoi_dung_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
