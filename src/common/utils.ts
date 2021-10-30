import { HttpException, HttpStatus } from "@nestjs/common";

export function get_object_or_404<T>(obj:T, message:string){
    if(!obj) throw new HttpException(message, HttpStatus.NOT_FOUND)
    return obj
}

export function bad_request<T>(conditional:T, message:string){
    if(conditional) throw new HttpException(message, HttpStatus.BAD_REQUEST)
    return 
}