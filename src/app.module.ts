import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './common/global.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PublicationsModule } from './publications/publications.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile:true,
      installSubscriptionHandlers:true
    }),
    MongooseModule.forRoot(process.env.DB_CONNECTION),
    GlobalModule,
    AuthModule,
    UsersModule,
    PublicationsModule,
    CommentsModule
  ],
})
export class AppModule {
  
}
