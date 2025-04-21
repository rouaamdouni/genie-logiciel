// chats.gateway.ts
import { Inject } from "@nestjs/common"
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets"
import { Server, Socket } from "socket.io"

import { SocketEvents } from "./imports/constants"
import { AuthController } from "./auth.controller"
import { MemberController } from "./member.controller"
import { MessageController } from "./message.controller"
import { SendMessageArgs } from "./imports/validators/send-message"
import { AddMemberArgs } from "./imports/validators/add-member"

@WebSocketGateway({
  cors: {
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    origin: process.env.CLIENT_URL,
  },
  namespace: "rooms",
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server

  constructor(
    private readonly authController: AuthController,
    private readonly memberController: MemberController,
    private readonly messageController: MessageController,
  ) {}

  async handleConnection(client: Socket) {
    const authorization = client.handshake.headers.authorization
    const authPayload = await this.authController.handleAuth(authorization)
    
    if (authPayload.isLeft()) {
      client.emit(SocketEvents.error, authPayload.error.payload)
      return client.disconnect()
    }

    if (!this.authController.hasRole(authPayload.value.role)) {
      client.emit(SocketEvents.error, { message: "invalid user role" })
      return client.disconnect()
    }

    await this.memberController.handleConnection(client, authPayload.value.userId)
  }

  @SubscribeMessage(SocketEvents.addMember)
  async addMember(
    @MessageBody() data: AddMemberArgs,
    @ConnectedSocket() client: Socket,
  ) {
    const authorization = client.handshake.headers.authorization
    const authPayload = await this.authController.handleAuth(authorization)
    if (authPayload.isLeft())
      return client.emit(SocketEvents.error, authPayload.error.payload)

    await this.memberController.addMember(client, data, authPayload.value.userId)
  }

  @SubscribeMessage(SocketEvents.sendMessage)
  async sendMessage(
    @MessageBody() data: SendMessageArgs,
    @ConnectedSocket() client: Socket,
  ) {
    const authorization = client.handshake.headers.authorization
    const authPayload = await this.authController.handleAuth(authorization)
    if (authPayload.isLeft())
      return client.emit(SocketEvents.error, authPayload.error.payload)

    await this.messageController.sendMessage(client, data, authPayload.value.userId)
  }
}