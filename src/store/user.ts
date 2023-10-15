import { auth } from "@/firebase";
import { signIn, isSuperUser } from "@/services";
import { makeAutoObservable, runInAction } from "mobx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { User as UserI } from "firebase/auth";
import { Root } from ".";

export class User {
  public isUserLoggedIn: boolean = false;
  public isSuperUser: boolean = false;
  public router: AppRouterInstance | null = null;
  public isLoading: boolean = false;
  public error: string | null = null;
  private _email: string = "";
  private _password: string = "";
  private _user: UserI | null = null;

  constructor(rootStore: Root) {
    makeAutoObservable(this);
    auth.onAuthStateChanged(async (user) => {
      this.user = user;
      console.log("users", user);
      if (user) {
        const _isSuperUser = await isSuperUser(user.uid);
        this.isSuperUser = _isSuperUser?.isSuperUser;
      }
    });
  }

  public get user(): UserI | null {
    return this._user;
  }
  public set user(value: UserI | null) {
    this._user = value;
  }

  signInWithEmail = async () => {
    try {
      this.isLoading = true;
      this.error = null;
      const userDetails = await signIn(this.email, this.password);
      const user = await isSuperUser(userDetails.uid);
      if (!user) {
        return;
      }
      if (user?.isSuperUser) {
        this.isSuperUser = true;
        this.router?.push("/home");
      } else {
        this.isSuperUser = false;
        this.router?.push("/laboratory");
      }
      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
      this.error =
        "*Incorrect userName or Password. Please try with different values";
    }
  };

  public get email(): string {
    return this._email;
  }

  public set email(_val: string) {
    runInAction(() => {
      this._email = _val;
    });
  }

  public get password(): string {
    return this._password;
  }

  public set password(_val: string) {
    runInAction(() => {
      this._password = _val;
    });
  }
}
