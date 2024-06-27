import { Account } from "./account-interface";
import {Blog} from "./blog-interface";
import {Comment} from "./comment-interface";

export interface Post{
    id: number,
    answer: string,
    blog?: Blog,
    account?: Account,
    comments?: Comment[]

}