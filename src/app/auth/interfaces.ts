export interface UserRegister{
    username:string,
    firstname:string,
    lastname:string,
    password:string
}

export interface UserLogin{
    username:string,
    password:string
}


export interface RegisterResponse{
    token:string,
}