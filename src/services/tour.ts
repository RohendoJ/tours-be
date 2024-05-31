import { prisma } from "../application";
import {
  createTourDto,
  logger,
  validate,
  createTourSchema,
  cloudImage,
  updateTourDto,
  updateTourSchema,
} from "../config";
import { HTTPExecption } from "../middlewares";

export const createTour = async (userId: string, request: createTourDto) => {
  logger.info("Creating tour", { service: "tour-service" });

  request = await validate(createTourSchema, request);

  let result;

  const tour = await prisma.tours.create({
    data: {
      name: request.name,
      province: request.province,
      province_id: request.province_id,
      regency: request.regency,
      regency_id: request.regency_id,
      latitude: request.latitude,
      longtitude: request.longtitude,
      user_id: userId,
    },
    select: {
      id: true,
      name: true,
      province: true,
      province_id: true,
      regency: true,
      regency_id: true,
      latitude: true,
      longtitude: true,
      created_at: true,
      updated_at: true,
    },
  });

  result = tour;

  if (request.image) {
    const image = await cloudImage.upload.tour(request.image);

    const createImage = await prisma.images.create({
      data: {
        url: image.secureUrl as string,
        public_id: image.publicId as string,
      },
    });

    result = await prisma.tours.update({
      where: {
        id: tour.id,
      },
      data: {
        image_id: createImage.id,
      },
      select: {
        id: true,
        name: true,
        province: true,
        province_id: true,
        regency: true,
        regency_id: true,
        latitude: true,
        longtitude: true,
        created_at: true,
        updated_at: true,
        images: {
          select: {
            url: true,
          },
        },
      },
    });
  }

  return {
    message: "Tour created successfully",
    tour: result,
  };
};

export const getTours = async (userId: string, page = 1, limit = 10) => {
  logger.info("Get tours", { service: "tour-service" });

  const tours = await prisma.tours.findMany({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
      name: true,
      province: true,
      province_id: true,
      regency: true,
      regency_id: true,
      latitude: true,
      longtitude: true,
      created_at: true,
      updated_at: true,
      images: {
        select: {
          url: true,
        },
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  if (!tours) {
    throw new HTTPExecption(404, "Tours not found");
  }

  const total_item = await prisma.tours.count({ where: { user_id: userId } });
  const total_page = Math.ceil(total_item / limit);

  return {
    message: "Tours found successfully",
    data: tours,
    paging: {
      page,
      page_size: limit,
      total_item,
      total_page,
    },
  };
};

export const getTour = async (userId: string, tourId: string) => {
  logger.info("Get tour", { service: "tour-service" });

  const tour = await prisma.tours.findUnique({
    where: {
      id: tourId,
      user_id: userId,
    },
    select: {
      id: true,
      name: true,
      province: true,
      province_id: true,
      regency: true,
      regency_id: true,
      latitude: true,
      longtitude: true,
      created_at: true,
      updated_at: true,
      images: {
        select: {
          url: true,
        },
      },
    },
  });

  if (!tour) {
    throw new HTTPExecption(404, "Tour not found");
  }

  return {
    message: "Tour found successfully",
    data: tour,
  };
};

export const updateTour = async (
  userId: string,
  tourId: string,
  request: updateTourDto
) => {
  logger.info("Update tour", { service: "tour-service" });

  request = await validate(updateTourSchema, request);

  const findTour = await prisma.tours.findFirst({
    where: {
      id: tourId,
      user_id: userId,
    },
  });

  if (!findTour) {
    throw new HTTPExecption(404, "Tour not found");
  }

  if (request.image) {
    const findImage = await prisma.images.findFirst({
      where: {
        id: findTour.image_id as string,
      },
    });

    if (!findImage) {
      throw new HTTPExecption(404, "Image not found");
    }

    await cloudImage.delete(findImage?.public_id as string);

    const image = await cloudImage.upload.tour(request.image);

    await prisma.images.update({
      where: {
        id: findImage.id,
      },
      data: {
        url: image.secureUrl as string,
        public_id: image.publicId as string,
      },
    });
  }

  const tour = await prisma.tours.update({
    where: {
      id: tourId,
      user_id: userId,
    },
    data: {
      name: request.name,
      province: request.province,
      province_id: request.province_id,
      regency: request.regency,
      regency_id: request.regency_id,
      latitude: request.latitude,
      longtitude: request.longtitude,
    },
    select: {
      id: true,
      name: true,
      province: true,
      province_id: true,
      regency: true,
      regency_id: true,
      latitude: true,
      longtitude: true,
      created_at: true,
      updated_at: true,
      images: {
        select: {
          url: true,
        },
      },
    },
  });

  return {
    message: "Tour updated successfully",
    data: tour,
  };
};

export const deleteTour = async (userId: string, tourId: string) => {
  logger.info("Delete tour", { service: "tour-service" });

  const isImageFound = await prisma.tours.findUnique({
    where: {
      id: tourId,
      user_id: userId,
    },
    select: {
      images: true,
    },
  });

  if (!isImageFound) {
    throw new HTTPExecption(404, "Tour not found");
  }

  if (isImageFound?.images) {
    await cloudImage.delete(isImageFound.images.public_id as string);

    await prisma.images.delete({
      where: {
        id: isImageFound.images.id,
      },
    });
  }

  await prisma.tours.delete({
    where: {
      id: tourId,
      user_id: userId,
    },
  });

  return {
    message: "Tour deleted successfully",
  };
};
