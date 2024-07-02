import {Injectable} from '@angular/core';
import {Blog} from "../interfaces/blog-interface";
import {Account} from "../interfaces/account-interface";

@Injectable({
    providedIn: 'root'
})

export class AccountService {

    url = 'http://localhost:8080/accounts'

    constructor() {
    }

    async getAllAccounts(): Promise<Account[]> {
        const data = await fetch(this.url);
        return await data.json() ?? [];
    }

    async getAccountById(id: Number): Promise<Account | undefined> {
        const data = await fetch(`${this.url}/${id}`);
        return await data.json() ?? {};
    }

    async setPathImage(id: Number, imagePath: String) {
        const data = await fetch(
            `${this.url}/${id}/imagePath?imagePath=${imagePath}`,
            {
                method: 'PUT',
            }
        )

        return
    }
}
