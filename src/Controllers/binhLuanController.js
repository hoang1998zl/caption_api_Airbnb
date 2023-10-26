const { PrismaClient } = require("@prisma/client");
const { successCode, errorCode, failCode } = require("../Config/response");
const prisma = new PrismaClient();

module.exports = {
  newBinhLuan: async (req, res) => {
    const nguoi_dung = req.user.content;
    const {
      ma_phong,
      noi_dung,
      sao_binh_luan
    } = req.body;
    try {
      const binh_luan = await prisma.binh_luan.create({
        data: {
          ma_phong,
          ma_nguoi_binh_luan: Number(nguoi_dung.id),
          noi_dung,
          sao_binh_luan
        }
      });

      return successCode(
        res,
        binh_luan,
        "Thêm bình luận thành công"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  getAllBinhLuan: async (req, res) => {
    try {
      const dataBinhLuan = await prisma.binh_luan.findMany()
      if (!dataBinhLuan) {
        return failCode(
          res,
          "Không có bình luận nào"
        )
      }
      return successCode(
        res,
        dataBinhLuan,
        "Lấy danh sách bình luận thành công"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  updateBinhLuan: async (req, res) => {
    const nguoi_dung = req.user.content;
    const { id } = req.params;
    const {
      noi_dung,
      sao_binh_luan
    } = req.body;
    try {
      const checkBinhLuan = await prisma.binh_luan.findFirst({
        where: {
          id: Number(id),
        },
      })

      if (!checkBinhLuan) {
        return failCode(
          res,
          "Không tìm thấy bình luận"
        )
      }

      if (nguoi_dung.id != checkBinhLuan.ma_nguoi_binh_luan) {
        return failCode(
          res,
          "Không có quyền sửa bình luận"
        )
      }

      const dataBinhLuan = await prisma.binh_luan.update({
        where: {
          id: Number(id),
        },
        data: {
          ma_phong: Number(checkBinhLuan.ma_phong),
          ma_nguoi_binh_luan: Number(nguoi_dung.id),
          noi_dung,
          sao_binh_luan,
        },
      })

      return successCode(
        res,
        dataBinhLuan,
        "Cập nhật bình luận thành công"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  deleteBinhLuan: async (req, res) => {
    const nguoi_dung = req.user.content;
    const { id } = req.params;
    try {
      const checkBinhLuan = await prisma.binh_luan.findFirst({
        where: {
          id: Number(id),
        },
      })

      if (!checkBinhLuan) {
        return failCode(
          res,
          "Không tìm thấy bình luận"
        )
      }

      if (nguoi_dung.id != checkBinhLuan.ma_nguoi_binh_luan || nguoi_dung.role_id != 1) {
        return failCode(
          res,
          "Không có quyền sửa bình luận"
        )
      }
      await prisma.binh_luan.delete({
        where: {
          id: Number(id),
        },
      })
      return successCode(
        res,
        "Xóa thành công"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  getBinhLuanByRoom: async (req, res) => {
    const { ma_phong } = req.params;
    try {
      const dataBinhLuan = await prisma.binh_luan.findMany({
        where: {
          ma_phong: Number(ma_phong),
        },
      })
      if (!dataBinhLuan) {
        return failCode(
          res,
          "Không tìm thấy bình luận"
        )
      }
      return successCode(
        res,
        dataBinhLuan,
        "Lấy bình luận thành công"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
}
