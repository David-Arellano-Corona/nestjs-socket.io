import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JWT {
    constructor(
        private jwtService:JwtService
    ){}

    encode(payload:any):string{
        return this.jwtService.sign(payload);
    }

    decode(token:string):any{
        return this.jwtService.decode(token);
    }
}