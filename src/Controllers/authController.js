const { PrismaClient } = require("@prisma/client");
const { createToken } = require('../utils/verifyToken')
const { successCode, errorCode, failCode } = require("../Config/response");
const prisma = new PrismaClient();


const register = async (req, res) => {
  try {
    const {
      ho_ten,
      email,
      mat_khau
    } = req.body;

    const checkUser = await prisma.nguoi_dung.findFirst({
      where: {
        email,
      }
    });

    const last_name =
      ho_ten
        .trim()
        .split(' ')
        .slice(-1);

    if (checkUser) {
      prisma.$disconnect();
      return failCode(res, "Đã có tài khoản!");
    }

    const newUser = await prisma.nguoi_dung.create({
      data: {
        ho_ten,
        email,
        mat_khau,
        gioi_tinh_id: Number(1),
        role_id: Number(2),
        anh_dai_dien: `https://ui-avatars.com/api/?name=${last_name}`
      },
      include: {
        gioi_tinh: true,
        role: true,
      },
    });

    const token = createToken(newUser);
    newUser.token = token;

    return successCode(
      res,
      newUser,
      "Tạo tài khoản thành công!"
    );

  } catch (error) {
    prisma.$disconnect();
    return failCode(res, "Lỗi Server!");
  }
};

const login = async (req, res) => {
  try {
    const {
      email,
      pass_word
    } = req.body;

    const user = await prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
      include: {
        gioi_tinh: true,
        role: true,
      },
    });

    prisma.$disconnect();

    if (!user) {
      return failCode(res, "Không có tài khoản");
    }

    if (pass_word == user.pass_word) {
      const token = createToken(user);
      user.token = token;
      return successCode(
        res,
        user,
        "Login thành công!"
      );
    } else {
      return failCode(res, "Sai mật khẩu");
    }
  } catch (error) {
    return errorCode(res, error.message);
  } finally {
    prisma.$disconnect();
  }
}

module.exports = {
  register,
  login
};