import { Account } from "./account-interface";
import {Post} from "./post-interface";


export interface Comment {
    id: number,
    comment: string,
    post?: Post,
    account?: Account
}