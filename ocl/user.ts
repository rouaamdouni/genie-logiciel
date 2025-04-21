import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, Types } from "mongoose"

import { defaultAvatarURL, defaultLanguage } from "../../../src/utils/constants"

export type UserDocument = HydratedDocument<User>

@Schema({ _id: true, collection: "users", timestamps: true })
export class User {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId

  @Prop({ required: true, type: String })
  avatarURL: string

  @Prop({ default: mongoose.now(), type: Date })
  createdAt: Date

  @Prop({ required: false, type: Date })
  deletedAt?: Date

  @Prop({ required: true, type: String })
  email: string

  @Prop({ default: defaultAvatarURL, type: String })
  fullName: string

  @Prop({ required: true, type: Boolean })
  isConfirmed: boolean

  @Prop({ required: true, type: String })
  password: string

  @Prop({ default: defaultLanguage, type: String })
  preferredLanguage: string

  @Prop({ required: true, type: String })
  role: string

  @Prop({ default: mongoose.now(), type: Date })
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
export const UserModel = mongoose.model("users", UserSchema)
