import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { PublicationType, PublicationsType } from '../types';
import { PublicationInput } from '../inputs';
import { PublicationDetail } from '../args';
import { PublicationService } from '../services/publication.service';

@Resolver(of => PublicationType)
export class Publication {

    constructor(
        private pubService:PublicationService
    ){}

    @Query( returns => [PublicationsType])
    async publication(){
        const pubs = await this.pubService.search();
        return pubs;
    }

    @Query(returns => PublicationsType)
    async publicationDetail(@Args() publicationDto:PublicationDetail){
        const pub = await this.pubService.find(publicationDto);
        return pub;
    }

    @Mutation(returns => PublicationType)
    async createPublication(@Args('publication') publication:PublicationInput){
        const pub = await this.pubService.create(publication)
        return pub;
    }
}