const { PrismaClient } = require("@prisma/client");
const { successCode, errorCode, failCode } = require("../Config/response");
const prisma = new PrismaClient();

const getAllBooking = async (req, res) => {
  try {
    const dataBooking = await prisma.dat_phong.findMany()

    if (dataBooking.length > 0) {
      return successCode(
        res,
        dataBooking,
        "Lấy dữ liệu đặt phòng thành công"
      )
    } else {
      return failCode(
        res,
        "Không có dữ liệu đặt phòng"
      )
    }
  } catch (error) {
    return errorCode(res, error.message);
  } finally {
    prisma.$disconnect();
  }
}
const newBooking = async (req, res) => {
  const nguoi_dung = req.user.content;
  const {
    ma_phong,
    ngay_den,
    ngay_di,
    so_luong_khach
  } = req.body
  try {
    const data = req.body;
    const dataBooking = await prisma.dat_phong.findFirst({
      where: {
        ma_nguoi_dat: parseInt(nguoi_dung.id),
      },
    })

    if (dataBooking != null && data.ma_phong == dataBooking.ma_phong) {
      return failCode(
        res,
        "Đã đặt phòng này rồi"
      )
    }

    const addBooking = await prisma.dat_phong.create({
      data: {
        ma_phong: parseInt(ma_phong),
        ngay_den,
        ngay_di,
        so_luong_khach: parseInt(so_luong_khach),
        ma_nguoi_dat: parseInt(nguoi_dung.id),
      },
    })

    return successCode(
      res,
      addBooking,
      "Đặt phòng thành công"
    )
  } catch (error) {
    return errorCode(res, error.message);
  } finally {
    prisma.$disconnect();
  }
}
const getBookingById = async (req, res) => {
  const nguoi_dung = req.user.content;
  const { id } = req.params;
  try {
    const dataBooking = await prisma.dat_phong.findFirst({
      where: {
        id: parseInt(id),
      },
    })

    if (!dataBooking) {
      return failCode(
        res,
        "Không có dữ liệu đặt phòng"
      )
    }

    if (dataBooking.ma_nguoi_dat != nguoi_dung.id) {
      return failCode(
        res,
        "Không có quyền lấy dữ liệu"
      )
    }

    return successCode(
      res,
      dataBooking,
      "Lấy dữ liệu đặt phòng thành công"
    )
  } catch (error) {
    return errorCode(res, error.message);
  } finally {
    prisma.$disconnect();
  }
}
const updateBookingData = async (req, res) => {
  const nguoi_dung = req.user.content;
  const { id } = req.params;
  const {
    ma_phong,
    ngay_den,
    ngay_di,
    so_luong_khach
  } = req.body
  try {
    const dataBooking = await prisma.dat_phong.findFirst({
      where: {
        id: parseInt(id),
      },
    })

    if (!dataBooking) {
      return failCode(
        res,
        "Không có dữ liệu đặt phòng"
      )
    }

    if (dataBooking.ma_nguoi_dat != nguoi_dung.id && nguoi_dung.role.id != 1) {
      return failCode(
        res,
        "Không có quyền sửa dữ liệu"
      )
    }
    const updateDataBooking = await prisma.dat_phong.update({
      where: {
        id: parseInt(id),
      },
      data: {
        ma_phong: parseInt(ma_phong),
        ngay_den,
        ngay_di,
        so_luong_khach: parseInt(so_luong_khach),
        ma_nguoi_dat: parseInt(nguoi_dung.id),
      }
    })

    return successCode(
      res,
      updateDataBooking,
      "Cập nhật dữ liệu đặt phòng thành công"
    )
  } catch (error) {
    return errorCode(res, error.message);
  } finally {
    prisma.$disconnect();
  }
}
const deleteBooking = async (req, res) => {
  const nguoi_dung = req.user.content;
  const { id } = req.params;
  try {
    const dataBooking = await prisma.dat_phong.findFirst({
      where: {
        id: parseInt(id),
      },
    })
    if (!dataBooking) {
      return failCode(
        res,
        "Không có dữ liệu đặt phòng"
      )
    }
    if (nguoi_dung.role.id != 1 && nguoi_dung.id != dataBooking.ma_nguoi_dat) {
      return failCode(
        res,
        "Không có quyền xóa"
      )
    }
    await prisma.dat_phong.delete({
      where: {
        id: parseInt(id),
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
}
const getBookingByUserId = async (req, res) => {
  const nguoi_dung = req.user.content;
  const { ma_nguoi_dat } = req.params;
  try {
    const dataBooking = await prisma.dat_phong.findMany({
      where: {
        ma_nguoi_dat: parseInt(ma_nguoi_dat),
      },
    })
    console.log(dataBooking);

    if (nguoi_dung.role.id != 1 && nguoi_dung.id != ma_nguoi_dat) {
      return failCode(
        res,
        "Không có quyền lấy dữ liệu"
      )
    }
    console.log('Có quyền lấy')

    return successCode(
      res,
      dataBooking,
      "Lấy dữ liệu thành công"
    )
  } catch (error) {
    return errorCode(res, error.message);
  } finally {
    prisma.$disconnect();
  }
}

module.exports = {
  getAllBooking,
  newBooking,
  getBookingById,
  updateBookingData,
  deleteBooking,
  getBookingByUserId
}