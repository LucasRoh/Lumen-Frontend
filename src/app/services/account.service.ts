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

  // to get login data from account(user): accountKey and getLoginAccountData
  private readonly accountKey: string = 'account';

  getLoginAccount(): any{
    const accountJSON = localStorage.getItem(this.accountKey);
    return accountJSON ? JSON.parse(accountJSON) : undefined;
  }

  // to logout, temporarely, remove if implemented by others > then remove button in login page
  private readonly loginKey: string = 'loggedIn';
  logOut(){
    localStorage.removeItem(this.loginKey);
    localStorage.removeItem(this.accountKey);
  }

  // to check if user is logged in
    isLoggedIn():boolean{
      const userId = localStorage.getItem('userId');
      if (userId !== null) {return true}else {return false}
    }

}
