import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post{
    @Prop({ required:true })
    title:string;

    @Prop({ default:0 })
    votes:number

    @Prop({ required:true })
    authorId:string;
}

export const PostSchema = SchemaFactory.createForClass(Post);