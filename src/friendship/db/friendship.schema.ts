import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as SchemaType, Document } from 'mongoose';
import { User } from '../../users/db/user.schema';

export type FriendshipDocument = Document & Friendship

@Schema()
export class Friendship{
    @Prop({ ref:User.name , type:SchemaType.Types.ObjectId})
    user:User;

    @Prop({ ref:User.name, type:SchemaType.Types.ObjectId })
    friend:User;

    @Prop({ default: new Date() })
    createdAt:Date;

    @Prop({ default:false })
    isDeleted:boolean;

    @Prop({ default:new Date() })
    deletedAt:Date;
}

export const FriendshipSchema = SchemaFactory.createForClass(Friendship)