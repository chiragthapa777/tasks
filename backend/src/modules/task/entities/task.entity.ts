import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema({
  timestamps: {
    createdAt: true,
  },
})
export class Task {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, index: true, required: true })
  title: string;

  @Prop({ type: String, default: null })
  body?: string | null;

  @Prop({ type: Boolean, default: false })
  done: boolean;

  createdAt?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
