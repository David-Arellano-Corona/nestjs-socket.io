import { MinLength } from 'class-validator';
import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
class PaginationArgs{
    @Field( () => Int )
    offset:number = 0;
    
    @Field( () => Int )
    limit:number = 10;
}

@ArgsType()
export class AuthorArgs extends PaginationArgs {
    @Field({ nullable:true })
    firstName?:string;

    @Field({ defaultValue:'' })
    @MinLength(3)
    lastName:string;
}