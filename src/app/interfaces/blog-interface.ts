import { Account } from "./account-interface";
import {Post} from "./post-interface";
import {Tag} from "./tag";

export interface Blog {
    id: number;
    title: string;
    question: string;
    account?: Account;
    posts?: Post[];
    timestamp: string
    tag?: Tag;

}