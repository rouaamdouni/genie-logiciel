import { Inject, Injectable } from "@nestjs/common"
import { HttpStatus } from "@nestjs/common/enums"
import { IMapper } from "src/common/mapper"
import { Mappers, Repos } from "src/utils/constants"
import { Left, Right } from "src/utils/either"
import { generateId } from "src/utils/generate-id"

import { IMemberRepo } from "../members/i-member.repo"
import { IRoomRepo } from "./i-rooms.repo"
import {
  CreateRoomArgs,
  CreateRoomResult,
  GetRoomArgs,
  GetRoomResult,
  IRoomCreator,
  IRoomReader,
  IRoomUpdater,
  ListRoomsResult,
  UpdateRoomArgs,
  UpdateRoomResult,
} from "./rooms.service.interfaces"
import { Room } from "./rooms.domain"
import { RoomDTO } from "./rooms.dto"

@Injectable()
export class RoomService implements IRoomCreator, IRoomReader, IRoomUpdater {
  constructor(
    @Inject(Repos.room) private readonly roomRepo: IRoomRepo,
    @Inject(Repos.member) private readonly memberRepo: IMemberRepo,
    @Inject(Mappers.room) private readonly roomMapper: IMapper<Room, RoomDTO>,
  ) {}

  async createRoom(args: CreateRoomArgs): Promise<CreateRoomResult> {
    const createdAt = new Date()

    const newRoom = {
      createdAt,
      creator: args.creatorId,
      deletedAt: undefined,
      isPublic: args.isPublic,
      label: args.label,
      roomAvatarURL: args.roomAvatarURL,
      roomId: generateId(),
      slug: args.slug,
      updatedAt: createdAt,
    } satisfies Room

    await this.roomRepo.save(newRoom)

    await this.memberRepo.save({
      deletedAt: undefined,
      joinedAt: new Date(),
      room: newRoom.roomId,
      user: args.creatorId,
    })

    const mappedRoom = this.roomMapper.toDTO(newRoom)
    return Right.create(mappedRoom)
  }

  async getRoom(args: GetRoomArgs): Promise<GetRoomResult> {
    const existingRoom = await this.roomRepo.getById(args.roomId)
    if (!existingRoom)
      return Left.create({
        code: "room_not_found",
        message: "room does not exist",
        status: HttpStatus.NOT_FOUND,
      })

    const existingMembership = await this.memberRepo.get({
      roomId: args.roomId,
      userId: args.userId,
    })

    if (!existingRoom.isPublic && !existingMembership)
      return Left.create({
        code: "private_room",
        message: "room is private",
        status: HttpStatus.FORBIDDEN,
      })

    const mappedRoom = this.roomMapper.toDTO(existingRoom)
    return Right.create(mappedRoom)
  }

  async listPublicRooms(): Promise<ListRoomsResult> {
    const rooms = await this.roomRepo.listPublic()
    const mappedRooms = rooms.map(this.roomMapper.toDTO)
    return Right.create(mappedRooms)
  }

  async updateRoom(args: UpdateRoomArgs): Promise<UpdateRoomResult> {
    const existingRoom = await this.roomRepo.getById(args.roomId)
    if (!existingRoom)
      return Left.create({
        code: "room_not_found",
        message: "room does not exist",
        status: HttpStatus.NOT_FOUND,
      })

    if (existingRoom.creator !== args.creatorId)
      return Left.create({
        code: "not_room_creator",
        message: "this user is not the creator of the room",
        status: HttpStatus.FORBIDDEN,
      })

    const updatedRoom = {
      createdAt: existingRoom.createdAt,
      creator: args.creatorId,
      deletedAt: existingRoom.deletedAt,
      isPublic: args.isPublic || existingRoom.isPublic,
      label: args.label || existingRoom.label,
      roomAvatarURL: args.roomAvatarURL || existingRoom.roomAvatarURL,
      roomId: args.roomId,
      slug: existingRoom.slug,
      updatedAt: new Date(),
    } satisfies Room

    await this.roomRepo.save(updatedRoom)

    const mappedRoom = this.roomMapper.toDTO(updatedRoom)
    return Right.create(mappedRoom)
  }
}