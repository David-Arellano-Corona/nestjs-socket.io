import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose'
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile:true
    }),
    HomeModule,
    MongooseModule.forRoot(
      `mongodb+srv://davidarellanocii:QWE123asd$@cluster0.uhlwl.mongodb.net/practica001?retryWrites=true&w=majority`
    )
  ],
})
export class AppModule {}
