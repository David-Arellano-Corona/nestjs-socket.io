import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Password } from '../../common/password.hash';

export enum Gender {
    MASCULINO = "M",
    FEMENINO = "F",
    OTRO = "O"
}

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop()
    name:string;

    @Prop()
    firstname:string;

    @Prop()
    email:string;

    @Prop()
    password:string;

    @Prop({ type:Date })
    date_of_birth:Date;

    @Prop({ type:String })
    gender:Gender;

    @Prop({ default:"" })
    socketid:string;
}

export const UserSchema = SchemaFactory.createForClass(User);


UserSchema.pre('save',function(){
    const bcrypt = new Password();
    let password = this.get('password');
    let hash = bcrypt.encode(password);
    this.set('password', hash.hash);
})