import mongoose, { HydratedDocument } from 'mongoose';
export type TaskDocument = HydratedDocument<Task>;
export declare class Task {
    user: mongoose.Schema.Types.ObjectId;
    title: string;
    body?: string | null;
    done: boolean;
    createdAt?: Date;
}
export declare const TaskSchema: mongoose.Schema<Task, mongoose.Model<Task, any, any, any, mongoose.Document<unknown, any, Task> & Task & {
    _id: mongoose.Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Task, mongoose.Document<unknown, {}, mongoose.FlatRecord<Task>> & mongoose.FlatRecord<Task> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v?: number;
}>;
