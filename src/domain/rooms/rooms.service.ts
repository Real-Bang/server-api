import { PrismaService } from '@/prisma/prisma.service';
import { CursorPaginationDto } from '@/utils/pagination/pagination.cursor.dto';
import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    return await this.prisma.room.create({
      data: {
        ...createRoomDto,
        options: {
          connect: createRoomDto.options.map((option) => ({ key: option })),
        },
        thumbnailUrl: createRoomDto.imageUrls[0],
        photoUrl: createRoomDto.imageUrls,
      },
    });
  }

  async findAll(paginate: CursorPaginationDto) {
    const { take = 10, lastId } = paginate;
    console.log(lastId);
    console.log(lastId && { cursor: { id: lastId } });
    const data = await this.prisma.room.findMany({
      select: {
        id: true,
        thumbnailUrl: true,
        roomType: true,
        priceType: true,
        depositPrice: true,
        rentPrice: true,
        maintenancePrice: true,
        area: true,
        address: true,
        descriptionSimple: true,
        _count: true,
      },
      take: take,
      skip: lastId ? 1 : 0,
      ...(lastId && { cursor: { id: lastId } }),
    });

    const last = data.at(-1);
    return {
      data,
      _page: {
        lastId: last !== undefined ? last.id : lastId,
        take: take,
      },
    };
  }

  async findOne(id: number) {
    return await this.prisma.room.findFirst({
      include: {
        options: true,
        priceType: true,
        roomType: true,
      },
      where: {
        id,
      },
    });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    return await this.prisma.room.update({
      data: {
        ...updateRoomDto,
        options: {
          set: updateRoomDto.options.map((option) => ({ key: option })),
        },
      },
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOptions() {
    return await this.prisma.roomOption.findMany();
  }
  async findRoomTypes() {
    return await this.prisma.roomType.findMany();
  }
  async findPriceTypes() {
    return await this.prisma.priceType.findMany();
  }
}
