import {Blog} from "./blog-interface";

export interface Account {
    id_account: number,
    name: string,
    password: string,
    blogs?: Blog[]
}