import { IUploadsService } from '@/domain/uploads/uploads.service';
import { CursorPaginationDto } from '@/utils/pagination/pagination.cursor.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
@ApiTags('방')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    @Inject('Uploads') private readonly uploadsService: IUploadsService,
  ) {}

  @Get('options')
  @ApiOperation({
    summary: '방 옵션 목록',
    description: '가능한 방 옵션을 가져온다.',
  })
  findOptions() {
    return this.roomsService.findOptions();
  }

  @Get('room-types')
  @ApiOperation({
    summary: '방 종류 목록',
    description: '가능한 방 종류를 가져온다.',
  })
  findRoomTypes() {
    return this.roomsService.findRoomTypes();
  }

  @Get('price-types')
  @ApiOperation({
    summary: '임대 형식 목록',
    description: '가능한 임대 형식를 가져온다.',
  })
  findPriceTypes() {
    return this.roomsService.findPriceTypes();
  }

  @Get()
  @ApiOperation({
    summary: '전체 방 목록',
    description: '전체 방 목록을 가져온다.',
  })
  @ApiQuery({
    name: 'take',
    description: '가져올 방 수',
    required: false,
  })
  @ApiQuery({
    name: 'last-id',
    description:
      '불러온 방들 중 마지막 아이디.\n\n응답 내 _page 프로퍼티에 들어있는 걸 그대로 사용하면 된다.',
    required: false,
  })
  @ApiOkResponse({ description: '가져오기 성공' })
  async findAll(@Query() paginate: CursorPaginationDto) {
    return await this.roomsService.findAll(paginate);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: '방 생성', description: '방을 생성한다.' })
  @ApiCreatedResponse({ description: '생성 완료' })
  @ApiUnprocessableEntityResponse({ description: '몬가 잘못됨' })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
