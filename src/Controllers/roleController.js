const { PrismaClient } = require("@prisma/client");
const { successCode, errorCode, failCode } = require("../Config/response");
const prisma = new PrismaClient();


module.exports = {
  getAllRole: async (req, res) => {
    const user = req.user.content;
    if(user.role_id !== 1){
      return failCode(
        res,
        "Không có quyền"
      )
    }
    try {
      const data = await prisma.role.findMany();

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
  createRole: async (req, res) => {
    const user = req.user.content;
    if(user.role_id !== 1){
      return failCode(
        res,
        "Không có quyền"
      )
    }
    const data = req.body;
    try {
      const checkdDataRole = await prisma.role.findFirst({
        where: {
          loai: String(data.loai),
        },
      });
      if (!checkdDataRole) {
        const dataRole = await prisma.role.create({
          data: data,
        });
        return successCode(
          res,
          dataRole,
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
  deleteRole: async (req, res) => {
    const user = req.user.content;
    if(user.role_id !== 1){
      return failCode(
        res,
        "Không có quyền"
      )
    }
    const { id } = req.params;
    try {
      const checkdDataRole = await prisma.role.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (!checkdDataRole) {
        return failCode(
          res,
          "Không có dữ liệu!"
        );
      }
      await prisma.role.delete({
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