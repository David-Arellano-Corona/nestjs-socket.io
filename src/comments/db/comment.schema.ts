import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';
import { User } from '../../users/db/user.schema';
import { Publication } from '../../publications/db/publication.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment{
    @Prop({ default: new Date() })
    createdAt:Date;

    @Prop()
    comment:string;

    @Prop({ ref:'User', type: SchemaType.Types.ObjectId })
    owner:User;

    @Prop({ ref:'Publication', type:SchemaType.Types.ObjectId })
    publication:Publication;

}

export const CommentSchema = SchemaFactory.createForClass(Comment)