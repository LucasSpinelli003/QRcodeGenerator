export interface UserModel{
    id: string;
    name: string;
    cpf: string;
    email: string;
    isGenerated: boolean;
}

export interface CreateUserArgs{
    id?: string;
    name: string;
    cpf: string;
    email: string;
    isGenerated?: boolean;
}