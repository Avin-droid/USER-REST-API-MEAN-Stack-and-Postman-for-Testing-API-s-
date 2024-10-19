import { Types } from "mongoose";
export interface ViewsAlternateInterface
{
    _id:Types.ObjectId,
    owner:Types.ObjectId,
    completed:boolean
    createdAt:string
}
