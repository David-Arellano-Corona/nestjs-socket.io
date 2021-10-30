import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SessionGuard } from '../../common/session.guard';
import { User } from '../../common/session.decorator';
import { PublicationType, PublicationsType, PublicationLikeType, PublicationLikeResponseType } from '../types';
import { PublicationInput, PublicationLikeInput } from '../inputs';
import { PublicationDetail, PublicationLikeArgs, PublicationLikeQueryArgs } from '../args';
import { UserId } from '../../users/args';
import { PublicationService } from '../services/publication.service';
import { PublicationLikeService } from '../services/publication-like.service';


@Resolver(of => PublicationType)
export class Publication {

    constructor(
        private pubService:PublicationService,
        private publicationLikeService: PublicationLikeService
    ){}

    @Query( returns => [PublicationsType])
    @UseGuards(SessionGuard)
    async publication(
        @Args() userId:UserId,
        @User() user
    ){
        const pubs = await this.pubService.search(userId.userId);
        return pubs;
    }

    @Query(returns => PublicationsType)
    async publicationDetail(@Args() publicationDto:PublicationDetail){
        const pub = await this.pubService.find(publicationDto);
        return pub;
    }

    @Query(returns => [PublicationLikeResponseType])
    async getPublicationLike(@Args() publicationLikeArgs: PublicationLikeQueryArgs){
        const likes = await this.publicationLikeService.getPublicaionLikesFromPublication(publicationLikeArgs);
        
        return likes;
    }

    @Mutation(returns => PublicationType)
    async createPublication(@Args('publication') publication:PublicationInput){
        const pub = await this.pubService.create(publication)
        return pub;
    }

    @Mutation(returns => PublicationLikeResponseType)
    async createPublicationLike(@Args('publicationLike') publicationLikeInput: PublicationLikeInput){
        const pub = await this.publicationLikeService.createPublicationLike(publicationLikeInput);
        return pub
    }
}