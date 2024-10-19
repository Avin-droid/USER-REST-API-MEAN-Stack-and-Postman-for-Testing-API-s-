import { Types } from "mongoose"
export interface ViewsInterface
{
    _id:Types.ObjectId,
    owner:Types.ObjectId,
    description:string,
    completed:boolean,
    createdAt:string
}