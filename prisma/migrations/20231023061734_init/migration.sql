/*
  Warnings:

  - Made the column `ho_ten` on table `nguoi_dung` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `nguoi_dung` MODIFY `ho_ten` VARCHAR(191) NOT NULL;
