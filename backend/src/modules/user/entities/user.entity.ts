import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: {
    createdAt: true,
  },
})
export class User {
  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
    type: String,
  })
  email: string;

  @Prop({
    type: String,
  })
  password: string;

  createdAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
