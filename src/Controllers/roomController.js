const { PrismaClient } = require("@prisma/client");
const { createToken } = require('../utils/verifyToken')
const { successCode, errorCode, failCode } = require("../Config/response");
const prisma = new PrismaClient();
const fs = require('fs')

module.exports = {
  createNewRoom: async (req, res) => {
    const nguoi_dung = req.user.content;
    try {
      if (nguoi_dung.role.loai != "ADMIN") {
        prisma.$disconnect();
        return failCode(res, "Không có quyền hạn thêm phòng")
      }

      const phong = await prisma.phong.create({
        data: req.body
      });

      return successCode(
        res,
        phong,
        "Thêm phòng thành công"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  getAllRoom: async (req, res) => {
    try {
      const data = await prisma.phong.findMany();

      prisma.$disconnect();
      if (data.length > 0) {
        return successCode(
          res,
          data,
          "Lấy dữ liệu thành công"
        );
      } else {
        return failCode(
          res,
          "Không có dữ liệu phòng"
        );
      };
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  getRoomById: async (req, res) => {
    const { id } = req.params;
    try {
      const dataRoom = await prisma.phong.findFirst({
        where: {
          id: parseInt(id),
        },
      })

      if (!dataRoom) {
        return failCode(
          res,
          "Không tìm thấy dữ liệu phòng"
        )
      }

      return successCode(
        res,
        dataRoom,
        "Lấy dữ liệu phòng thành công"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  updateRoom: async (req, res) => {
    const { id } = req.params;
    const nguoi_dung = req.user.content;

    if (nguoi_dung.role_id !== 1) {
      return failCode(
        res,
        "Không có quyền sửa"
      )
    }
    try {
      const dataRoom = await prisma.phong.findFirst({
        where: {
          id: parseInt(id),
        },
      })

      if (!dataRoom) {
        return failCode(
          res,
          "Không tìm thấy dữ liệu phòng"
        )
      }

      const updateDataRoom = await prisma.phong.update({
        where: {
          id: parseInt(id),
        },
        data: req.body,
      })

      return successCode(
        res,
        updateDataRoom,
        "Cập nhật dữ liệu phòng thành công"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  deleteRoom: async (req, res) => {
    const { id } = req.params;
    const nguoi_dung = req.user.content;

    if (nguoi_dung.role_id !== 1) {
      return failCode(
        res,
        "Không có quyền sửa"
      )
    }

    try {
      const dataRoom = await prisma.phong.findFirst({
        where: {
          id: parseInt(id),
        },
      })

      if (!dataRoom) {
        return failCode(
          res,
          "Không tìm thấy dữ liệu phòng"
        )
      }

      await prisma.phong.delete({
        where: {
          id: parseInt(id),
        },
      })

      return successCode(
        res,
        "Xóa phòng thành công"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  uploadImageRoom: async (req, res) => {
    const { id } = req.body

    const nguoi_dung = req.user.content;

    if (nguoi_dung.role_id !== 1) {
      return failCode(
        res,
        "Không có quyền sửa"
      )
    }

    try {
      const room = await prisma.phong.findFirst({
        where: {
          id: parseInt(id),
        },
      })

      if (!room) {
        return failCode(res, "Không tìm thấy phòng!");
      }
      console.log(`phòng id: ${id}`)

      const image = req.file;
      if (!image) {
        return failCode(res, "Không có ảnh nào được tải lên!");
      }

      const data = fs.readFileSync(image.path);
      const base64Image = Buffer.from(data).toString('base64');
      const imageDataUrl = `data:${image.mimetype};base64,${base64Image}`;
      const inputData = {
        hinh_anh: imageDataUrl,
      };


      const uploadImage = await prisma.phong.update({
        where: {
          id: parseInt(id),
        },
        data: inputData,
      })

      return successCode(
        res,
        uploadImage,
        "Cập nhật hình ảnh thành công!"
      );
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
}