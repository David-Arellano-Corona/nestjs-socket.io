import * as bcrypt from 'bcryptjs';

export class Password{
    encode(password:string){
        const saltRoundes = 10;
        const salt = bcrypt.genSaltSync(saltRoundes);
        const hash = bcrypt.hashSync(password, salt);

        return { hash, salt }
    }

    compare(plainPassword:string, hashedPassword:string){
        const isSamePassword = bcrypt.compareSync(plainPassword, hashedPassword)
        return isSamePassword;
    }
}