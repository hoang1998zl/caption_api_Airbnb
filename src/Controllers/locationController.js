const { PrismaClient } = require("@prisma/client");
const { successCode, errorCode, failCode } = require("../Config/response");
const prisma = new PrismaClient();

module.exports = {
  getAllLocation: async (req, res) => {
    try {
      const dataVitri = await prisma.vi_tri.findMany();

      if (dataVitri.length > 0) {
        return successCode(
          res,
          dataVitri,
          "Lấy danh sách vị trí thành công"
        )
      } else {
        return failCode(
          res,
          "Không tìm thấy dữ liệu"
        )
      }
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  getLocationByPage: async (req, res) => {
    const {
      pageIndex,
      pageSize
    } = req.query;
    const skip = (pageIndex - 1) * pageSize;
    try {
      const dataVitri = await prisma.vi_tri.findMany({
        skip,
        take: parseInt(pageSize),
      })

      if (!dataVitri) {
        return failCode(
          res,
          "Không tìm thấy dữ liệu vị trí"
        )
      }
      return successCode(
        res,
        dataVitri,
        `Lấy danh sách vị trí trang ${pageIndex} thành công`
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  addNewLocation: async (req, res) => {
    const role_id = req.user.content.role.id;
    if (role_id != 1) {
      return failCode(
        res,
        "Không có quyền hạn"
      )
    }
    const data = req.body;
    try {
      const checkDataVitri = await prisma.vi_tri.findMany({
        where: {
          ten_vi_tri: data.ten_vi_tri,
          tinh_thanh: data.tinh_thanh,
        }
      })

      if (checkDataVitri.length > 0) {
        return failCode(
          res,
          "Đã có dữ liệu vị trí này"
        )
      }

      const dataVitri = await prisma.vi_tri.create({
        data: data,
      })

      return successCode(
        res,
        dataVitri,
        "Thêm vị trí thành công"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  getLocationById: async (req, res) => {
    const { id } = req.params;
    try {
      const dataVitri = await prisma.vi_tri.findFirst({
        where: {
          id: parseInt(id),
        },
      })

      if (!dataVitri) {
        return failCode(
          res,
          "Không tìm thấy dữ liệu vị trí"
        )
      }

      return successCode(
        res,
        dataVitri,
        "Lấy dữ liệu vị trí thành công"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  deleleLocation: async (req, res) => {
    const role_id = req.user.content.role.id;
    if (role_id != 1) {
      return failCode(
        res,
        "Không có quyền hạn"
      )
    }
    const { id } = req.params;
    try {
      const checkDataVitri = await prisma.vi_tri.findFirst({
        where: {
          id: parseInt(id),
        },
      })
      if (!checkDataVitri) {
        return failCode(
          res,
          "Không tìm thấy vị trí này"
        )
      }
      await prisma.vi_tri.delete({
        where: {
          id: parseInt(id),
        },
      })

      return successCode(
        res,
        "Xóa vị trí thành công"
      )
    } catch (error) {
      return errorCode(res, error.message);
    } finally {
      prisma.$disconnect();
    }
  },
  uploadImageLocation: async (req, res) => {
    const role_id = req.user.content.role.id;
    if (role_id != 1) {
      return failCode(
        res,
        "Không có quyền hạn"
      )
    }
    try {
      const { id } = req.body

      const dataVitri = await prisma.vi_tri.findFirst({
        where: {
          id: parseInt(id),
        },
      })

      if (!dataVitri) {
        return failCode(
          res,
          "Không tìm thấy vị trí này"
        )
      }

      const image = req.file;
      console.log(image)

      if (!image) {
        return failCode(res, "Không có ảnh nào được tải lên!");
      }
      console.log('đã có ảnh')

      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const inputData = {
        hinh_anh: `${image.destination}/${image.filename}`,
      };
      inputData.hinh_anh = baseUrl + "/" + inputData.hinh_anh;
      console.log(inputData);

      const uploadImage = await prisma.vi_tri.update({
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