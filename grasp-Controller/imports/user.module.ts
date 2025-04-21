import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { Hash } from "src/providers/hashing"
import { Mappers, Models, Providers, Repos } from "src/utils/constants"

import { UserSchema } from "../../../database/mongo/models/user"
import { UserMapper } from "./config/user.mapper"
import { UserRepo } from "./config/user.repo"

const userModel = MongooseModule.forFeature([
  { name: Models.users, schema: UserSchema },
])

@Module({
  exports: [
    { provide: Repos.user, useClass: UserRepo },
    { provide: Mappers.user, useClass: UserMapper },
  ],
  imports: [userModel],
  providers: [
    { provide: Mappers.user, useClass: UserMapper },
    { provide: Repos.user, useClass: UserRepo },
    { provide: Providers.hash, useClass: Hash },
  ],
})
export class UserModule {}
