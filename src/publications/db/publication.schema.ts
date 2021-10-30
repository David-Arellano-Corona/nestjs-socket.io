import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';
import { User } from '../../users/db/user.schema';

export type PublicationDocument = Publication & Document

@Schema()
export class Publication {
    @Prop()
    text:string;

    @Prop({ default: new Date().toISOString() })
    createdAt:Date;

    @Prop({ type:SchemaType.Types.ObjectId, ref:'User' })
    owner:User;
}

export const PublicationSchema = SchemaFactory.createForClass(Publication)