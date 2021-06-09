import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exclude } from 'class-transformer'
import { Author, AuthorDocument } from './author.schema';
import { Post, PostDocument } from './post.schema';
import { AuthorInput } from './author.input';
import { PostCreateInput } from './post.create.input';

export class AuthorSerializer{
    @Exclude()
    _id:string;
    @Exclude()
    __v:number;
    firstName:string;
    lastName:string;

    get id():string{
        return this._id;
    }

    constructor(
        partial: Partial<AuthorSerializer>
    ){
        Object.assign(this, partial)
    }
}


@Injectable()
export class HomeService {
    constructor(
        @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
        @InjectModel(Post.name) private postModel: Model<PostDocument>
    ){}

    async createAuthor(authorInput:AuthorInput){
        const author = new this.authorModel(authorInput);
        return await author.save()
    }

    async createPost(postInput:PostCreateInput){
        const post = new this.postModel(postInput);
        return await post.save()
    }

    async findAuthor(id:string){
        const author = await this.authorModel.findOne({
            _id:id
        })
        return author;
    }

    async findPosts(authorId:string){
        const posts = await this.postModel.find({
            authorId:authorId
        })
        return posts;
    }
}
