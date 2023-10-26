const { PrismaClient } = require("@prisma/client");
const { successCode, errorCode, failCode } = require("../Config/response");
const prisma = new PrismaClient();
const fs = require('fs')

module.exports = {
  getAllUsers: async (req, res) => {
    const nguoi_dung = req.user.content;
    if (nguoi_dung.role.id !== 1) {
      return failCode(
        res,
        "Không có quyền"
      );
    }
    try {
      const data = await prisma.nguoi_dung.findMany();

      if (data.length > 0) {
        return successCode(
          res,
          data,
          "Lấy danh sách người dùng thành công!"
        );
      } else {
        return failCode(
          res,
          "Không có dữ liệu!"
        );
      };
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    const nguoi_dung = req.user.content;
    try {

      if (nguoi_dung.role.id !== 1 && nguoi_dung.id !== Number(id)) {
        return failCode(
          res,
          "Không có quyền"
        );
      }

      const data = await prisma.nguoi_dung.findFirst({
        where: {
          id: Number(id),
        },
        include: {
          gioi_tinh: true,
          role: true,
        }
      })

      if (!data) {
        return failCode(
          res,
          "Không tìm thấy người dùng"
        );
      }

      return successCode(
        res,
        data,
        "Lấy người dùng thành công"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  getUserByToken: async (req, res) => {
    const user = req.user.content;
    try {
      if (user.role.id !== 1) {
        return failCode(
          res,
          "Không có quyền"
        );
      }

      const userData = await prisma.nguoi_dung.findFirst({
        where: {
          id: Number(user.id),
        },
      });

      res.send(userData);
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  getUserByName: async (req, res) => {
    const { ho_ten } = req.params;
    const nguoi_dung = req.user.content;
    if (nguoi_dung.role.id !== 1) {
      return failCode(
        res,
        "Không có quyền xem danh sách"
      );
    }

    try {

      const lstUser = await prisma.nguoi_dung.findMany({
        where: {
          ho_ten,
        },
      });

      if (!lstUser) {
        return failCode(
          res,
          "Không có tài khoản"
        )
      }

      return successCode(
        res,
        lstUser,
        `Lấy danh sách tên ${ho_ten} thành công`
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  updateUserById: async (req, res) => {
    const { id } = req.params;
    const nguoi_dung = req.user.content;
    const data = req.body;

    if (nguoi_dung.id != id && nguoi_dung.role.id != 1) {
      return failCode(
        res,
        "Không có quyền sửa tài khoản"
      );
    }

    try {
      const user = await prisma.nguoi_dung.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (!user) {
        return failCode(
          res,
          "Không tìm thấy tài khoản"
        );
      }
      if (user.email != data.email) {
        return failCode(
          res,
          "Không được sửa email"
        );
      }
      if (nguoi_dung.id != id && nguoi_dung.role_id !== user.role_id) {
        return failCode(
          res,
          "Không có quyền sửa"
        );
      }
      const dataUpdate = await prisma.nguoi_dung.update({
        where: {
          id: Number(id),
        },
        data: req.body,
      });
      return successCode(
        res,
        dataUpdate,
        "Cập nhật thành công"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  uploadAvatar: async (req, res) => {
    try {
      const user = req.user.content;

      const dataUser = await prisma.nguoi_dung.findFirst({
        where: {
          id: Number(user.id),
        },
      });

      if (!dataUser) {
        return notFoundCode(res, "Người dùng không tồn tại!");
      }

      const avatar = req.file;
      if (!avatar) {
        return failCode(res, "Không có ảnh nào được tải lên!");
      }

      const data = fs.readFileSync(avatar.path);
      const base64Image = Buffer.from(data).toString('base64');
      const imageDataUrl = `data:${avatar.mimetype};base64,${base64Image}`;

      const inputData = {
        anh_dai_dien: imageDataUrl,
      };

      let uploadAvatar = await prisma.nguoi_dung.update({
        where: {
          id: Number(user.id),
        },
        data: inputData,
      });

      return successCode(
        res,
        uploadAvatar,
        "Thêm avatar thành công!"
      );
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  uploadAvatarByID: async (req, res) => {
    const { id } = req.params;
    try {
      const user = req.user.content;

      if (user.role_id !== 1) {
        return failCode(
          res,
          "Không có quyền"
        )
      }

      const dataUser = await prisma.nguoi_dung.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!dataUser) {
        return notFoundCode(res, "Người dùng không tồn tại!");
      }

      const avatar = req.file;
      if (!avatar) {
        return failCode(res, "Không có ảnh nào được tải lên!");
      }

      const data = fs.readFileSync(avatar.path);
      const base64Image = Buffer.from(data).toString('base64');
      const imageDataUrl = `data:${avatar.mimetype};base64,${base64Image}`;

      const inputData = {
        anh_dai_dien: imageDataUrl,
      };

      let uploadAvatar = await prisma.nguoi_dung.update({
        where: {
          id: Number(user.id),
        },
        data: inputData,
      });

      return successCode(
        res,
        uploadAvatar,
        "Thêm avatar thành công!"
      );
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    const users = req.user.content;
    try {
      const user = await prisma.nguoi_dung.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        return failCode(
          res,
          "Không có người dùng"
        );
      };
      if (users.role_id !== 1 && user.id !== id) {
        return failCode(
          res,
          "Không có quyền"
        )
      }

      const checkDatPhong = await prisma.dat_phong.findMany({
        where: {
          ma_nguoi_dat: Number(id),
        },
      })

      if (checkDatPhong) {
        await prisma.dat_phong.deleteMany({
          where: {
            ma_nguoi_dat: Number(id),
          },
        })
      }

      await prisma.binh_luan.deleteMany({
        where: {
          ma_nguoi_binh_luan: Number(id),
        },
      })

      await prisma.nguoi_dung.delete({
        where: {
          id: Number(id),
        },
      })

      return successCode(
        res,
        "Xóa người dùng thành công"
      )

    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  getUserByPage: async (req, res) => {
    const {
      pageIndex,
      pageSize
    } = req.query;
    const skip = (pageIndex - 1) * pageSize;
    const nguoi_dung = req.user.content;
    if (nguoi_dung.role.id !== 1) {
      return failCode(
        res,
        "Không có quyền"
      );
    }
    try {
      const users = await prisma.nguoi_dung.findMany({
        skip,
        take: Number(pageSize),
      });

      if (!users) {
        return failCode(
          res,
          "Không có người dùng"
        )
      }

      return successCode(
        res,
        users,
        `Lấy danh sách người dùng trang ${pageIndex} thành công`
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
};