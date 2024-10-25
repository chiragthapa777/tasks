import { Types } from 'mongoose';
export declare class CreateTaskDto {
    title: string;
    body?: string;
    done?: boolean;
    user?: string | Types.ObjectId;
}
