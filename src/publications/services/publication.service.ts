import { Injectable } from '@nestjs/common';
import { PublicationDocument } from '../db/publication.schema';
import { PublicationRepository } from '../db/publication.repository';
import { PublicationInput } from '../inputs';
import { PublicationDetail } from '../args';


@Injectable()
export class PublicationService{
    constructor(
        private pubRepo: PublicationRepository
    ){
    }

    async create(publication:PublicationInput){
        const pub = await this.pubRepo.createPublication(publication);
        return pub;
    }

    async search(){
        const pubs = await this.pubRepo.search();
        return pubs;
    }

    async find(pubDto:PublicationDetail):Promise<PublicationDocument>{
        const pub = await this.pubRepo.find(pubDto.publicationId);
        return pub;
    }
}