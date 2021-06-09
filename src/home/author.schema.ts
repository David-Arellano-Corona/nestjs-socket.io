import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorDocument = Author & Document;

@Schema()
export class Author{
    @Prop({ required:true })
    firstName:string;

    @Prop()
    lastName?:string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);