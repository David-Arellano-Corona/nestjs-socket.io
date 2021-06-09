import { Resolver, Query } from "@nestjs/graphql";
import { HomeType } from "./home.type";

@Resolver(of => HomeType)
export class HomeResolver{

    @Query(returns => HomeType)
    home(){
        return {
            id:'skkkss',
            name:'test'
        }
    }
}