import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Int,
  Mutation,
} from '@nestjs/graphql';
import { Author } from './author.model';
import { Post } from './post.model';
import { AuthorArgs } from './author-input.args';
import { PostInput } from './post.input';
import { AuthorInput } from './author.input';
import { AuthorSerializer, HomeService } from './home.service';
import { classToPlain } from 'class-transformer';
import { PostCreateInput } from './post.create.input';

@Resolver((of) => Author)
export class AuthorResolver {
  private Author = {
    id: 1,
    firstName: 'David',
    lastName: 'Arellano',
  };

  private POSTS = [
    { id: 1, title: 'GraphQL and NestJS', votes: 120, author: 1 },
    { id: 2, title: 'Node.js fundamentals', votes: 120, author: 1 },
  ];

  constructor(
    private homeService:HomeService
  ){}

  @Query((returns) => Author, { name: 'author' })
  async author(
    @Args('id') id: string,
    //@Args() author: AuthorArgs,
  ) {
    const author = await this.homeService.findAuthor(id);
    return author;
  }

  @ResolveField('posts', () => [Post])
  async posts(@Parent() author: Author) {
    let { id } = author;
    let myPost = await this.homeService.findPosts(id);
    //this.POSTS.filter((e) => e.author == id);
    return myPost;
  }

  @Mutation(returns => Post)
  upvotePost(@Args('upvotePostData') upvotePostData:PostInput){
  //upvotePost(@Args({name:'postId', type: () => Int}) postId:number){
      console.log(upvotePostData)
      this.POSTS[0].votes +=1
      return this.POSTS[0]
  }

  @Mutation(returns => Author)
  async createAuthor(@Args('AuthorInput') authorInput:AuthorInput){
    const author = await this.homeService.createAuthor(authorInput);
    return author;
  }

  @Mutation(returns => Post)
  async createPost(@Args('PostInput') postInput:PostCreateInput){
    const post = await this.homeService.createPost(postInput);
    return post;
  }
}
