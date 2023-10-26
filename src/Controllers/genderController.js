const { PrismaClient } = require("@prisma/client");
const { successCode, errorCode, failCode } = require("../Config/response");
const prisma = new PrismaClient();


module.exports = {
  getAllGender: async (req, res) => {
    const user = req.user.content;
    if(user.role_id !== 1){
      return failCode(
        res,
        "Không có quyền"
      )
    }
    try {
      const data = await prisma.gioi_tinh.findMany();

      if (!data) {
        return failCode(
          res,
          "Không có dữ liệu!"
        );
      };

      return successCode(
        res,
        data,
        "Lấy danh sách thành công!"
      );
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  createGender: async (req, res) => {
    const user = req.user.content;
    if(user.role_id !== 1){
      return failCode(
        res,
        "Không có quyền"
      )
    }
    const data = req.body;
    try {
      const checkdDataGender = await prisma.gioi_tinh.findFirst({
        where: {
          loai: String(data.loai),
        },
      });
      if (!checkdDataGender) {
        const dataGender = await prisma.gioi_tinh.create({
          data: data,
        });
        return successCode(
          res,
          dataGender,
          "Thêm dữ liệu thành công!"
        )
      } else {
        return failCode(
          res,
          "Đã có dữ liệu!"
        );
      }
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  deleteGender: async (req, res) => {
    const user = req.user.content;
    if(user.role_id !== 1){
      return failCode(
        res,
        "Không có quyền"
      )
    }
    const { id } = req.params;
    try {
      const checkdDataGender = await prisma.gioi_tinh.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (!checkdDataGender) {
        return failCode(
          res,
          "Không có dữ liệu!"
        );
      }
      await prisma.gioi_tinh.delete({
        where: {
          id: Number(id),
        },
      });
      return successCode(
        res,
        "Xóa dữ liệu thành công!"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  }
}