import { Account } from "./account-interface";

export interface Blog {
    id: number;
    title: string;
    question: string;
    account?: Account;
    timestamp: string;
}