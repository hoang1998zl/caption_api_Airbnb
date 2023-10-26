-- CreateTable
CREATE TABLE `gioi_tinh` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loai` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `gioi_tinh_loai_key`(`loai`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loai` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `role_loai_key`(`loai`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nguoi_dung` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ho_ten` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `mat_khau` VARCHAR(191) NOT NULL,
    `dien_thoai` VARCHAR(191) NULL,
    `ngay_sinh` VARCHAR(191) NULL,
    `gioi_tinh_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,
    `anh_dai_dien` VARCHAR(191) NULL,

    UNIQUE INDEX `nguoi_dung_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_phong` VARCHAR(191) NOT NULL,
    `phong_khach` INTEGER NOT NULL,
    `phong_ngu` INTEGER NOT NULL,
    `giuong` INTEGER NOT NULL,
    `phong_tam` INTEGER NOT NULL,
    `mo_ta` VARCHAR(191) NULL,
    `gia_tien` INTEGER NOT NULL,
    `may_giat` BOOLEAN NOT NULL,
    `ban_la` BOOLEAN NOT NULL,
    `tivi` BOOLEAN NOT NULL,
    `dieu_hoa` BOOLEAN NOT NULL,
    `wifi` BOOLEAN NOT NULL,
    `bep` BOOLEAN NOT NULL,
    `do_xe` BOOLEAN NOT NULL,
    `ho_boi` BOOLEAN NOT NULL,
    `ban_ui` BOOLEAN NOT NULL,
    `hinh_anh` VARCHAR(191) NULL,
    `vi_tri_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vi_tri` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten_vi_tri` VARCHAR(191) NOT NULL,
    `tinh_thanh` VARCHAR(191) NOT NULL,
    `hinh_anh` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dat_phong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_phong` INTEGER NOT NULL,
    `ngay_den` VARCHAR(191) NOT NULL,
    `ngay_di` VARCHAR(191) NOT NULL,
    `so_luong_khach` INTEGER NOT NULL,
    `ma_nguoi_dat` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `binh_luan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_phong` INTEGER NOT NULL,
    `ma_nguoi_binh_luan` INTEGER NOT NULL,
    `ngay_binh_luan` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `noi_dung` VARCHAR(191) NOT NULL,
    `sao_binh_luan` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `nguoi_dung` ADD CONSTRAINT `nguoi_dung_gioi_tinh_id_fkey` FOREIGN KEY (`gioi_tinh_id`) REFERENCES `gioi_tinh`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nguoi_dung` ADD CONSTRAINT `nguoi_dung_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `phong` ADD CONSTRAINT `phong_vi_tri_id_fkey` FOREIGN KEY (`vi_tri_id`) REFERENCES `vi_tri`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dat_phong` ADD CONSTRAINT `dat_phong_ma_phong_fkey` FOREIGN KEY (`ma_phong`) REFERENCES `phong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dat_phong` ADD CONSTRAINT `dat_phong_ma_nguoi_dat_fkey` FOREIGN KEY (`ma_nguoi_dat`) REFERENCES `nguoi_dung`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `binh_luan` ADD CONSTRAINT `binh_luan_ma_phong_fkey` FOREIGN KEY (`ma_phong`) REFERENCES `phong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `binh_luan` ADD CONSTRAINT `binh_luan_ma_nguoi_binh_luan_fkey` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `nguoi_dung`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
