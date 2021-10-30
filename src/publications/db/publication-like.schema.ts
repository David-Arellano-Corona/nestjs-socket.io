import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaType } from 'mongoose';
import { Publication } from './publication.schema';
import { User } from '../../users/db/user.schema';

export type PublicationLikeDocument = Document & PublicationLike

@Schema()
export class PublicationLike{

    @Prop({ type: SchemaType.Types.ObjectId, ref:Publication.name })
    publication:Publication;

    @Prop({ type:SchemaType.Types.ObjectId, ref:User.name })
    user:User;

    @Prop({ default: new Date() })
    createdAt:Date;
}

export const PublicationLikeSchema = SchemaFactory.createForClass(PublicationLike)