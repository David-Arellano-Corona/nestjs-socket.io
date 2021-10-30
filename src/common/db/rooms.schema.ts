import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';
import { User } from '../../users/db/user.schema';

export type RoomsDocument = Rooms & Document

@Schema()
export class Rooms {
    @Prop({ ref:User.name, type:SchemaType.Types.ObjectId })
    user:User;

    @Prop()
    roomName:string;
}

export const RoomSchema = SchemaFactory.createForClass(Rooms)