import { auth } from "@/firebase";
import { signIn, isSuperUser, createUserSignIn, createUser } from "@/services";
import { makeAutoObservable, runInAction } from "mobx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { User as UserI } from "firebase/auth";
import { Root } from ".";
import { UserI as UserIN } from "@/types";

interface AddUserErrors {
  email: string;
  password: string;
  lab: string;
}
export class User {
  public isUserLoggedIn: boolean = false;
  public isSuperUser: boolean = false;
  public router: AppRouterInstance | null = null;
  public isLoading: boolean = false;
  public error: string | null = null;
  private _email: string = "";
  private _password: string = "";
  private _user: UserI | null = null;
  private _addUserEmail: string = "";
  private _addUserPassword: string = "";
  private _addUserAccessLab: string = "";
  private _showAddUserModal: boolean = false;
  private _isUserAddSuperUser: boolean = false;
  private _addUserErrors: AddUserErrors = { email: "", lab: "", password: "" };
  private _addUserLoading: boolean = false;
  private _users: UserIN[] = [];
  private _showDeleteUserModal: boolean = false;
  private _selectedUser: UserIN | null = null;
  private _deleteUserLoading: boolean = false;

  constructor(rootStore: Root) {
    makeAutoObservable(this);
    auth.onAuthStateChanged(async (user) => {
      this.user = user;

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
        this.router?.push(`/laboratory/${user?.labAccess}`);
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

  public get showAddUserModal(): boolean {
    return this._showAddUserModal;
  }
  public set showAddUserModal(value: boolean) {
    this._showAddUserModal = value;
  }

  public get addUserEmail(): string {
    return this._addUserEmail;
  }
  public set addUserEmail(value: string) {
    this._addUserEmail = value;
    this.addUserErrors = { ...this.addUserErrors, email: "" };
  }

  public get addUserPassword(): string {
    return this._addUserPassword;
  }
  public set addUserPassword(value: string) {
    this._addUserPassword = value;
    this.addUserErrors = { ...this.addUserErrors, password: "" };
  }

  public get addUserAccessLab(): string {
    return this._addUserAccessLab;
  }
  public set addUserAccessLab(value: string) {
    this._addUserAccessLab = value;
    this.addUserErrors = { ...this.addUserErrors, lab: "" };
  }

  public get isUserAddSuperUser(): boolean {
    return this._isUserAddSuperUser;
  }
  public set isUserAddSuperUser(value: boolean) {
    this._isUserAddSuperUser = value;
  }

  public get addUserErrors(): AddUserErrors {
    return this._addUserErrors;
  }
  public set addUserErrors(value: AddUserErrors) {
    this._addUserErrors = value;
  }

  public async onAddUser() {
    let error: AddUserErrors = { email: "", lab: "", password: "" };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this._addUserEmail)) {
      error.email = "Not a valid email format";
    }
    if (this._addUserPassword.length < 6) {
      error.password = "Password length should be atleast 6";
    }
    if (!this._addUserAccessLab && !this._isUserAddSuperUser) {
      error.lab = "This is a mandatory field";
    }
    if (!error.email && !error.lab && !error.password) {
      try {
        this._addUserLoading = true;
        const user = await createUserSignIn({
          email: this._addUserEmail,
          password: this._addUserPassword,
        });
        await createUser({
          email: this._addUserEmail,
          createdBy: this.user?.email || "",
          isSuperUser: this._isUserAddSuperUser,
          labAccess: this._addUserAccessLab,
          id: user?.uid,
        });
        this._addUserLoading = false;
        this.showAddUserModal = false;
      } catch (e) {
        this._addUserLoading = false;
      }
    } else {
      runInAction(() => {
        this._addUserErrors = error;
      });
    }
  }

  public get addUserLoading(): boolean {
    return this._addUserLoading;
  }
  public set addUserLoading(value: boolean) {
    this._addUserLoading = value;
  }

  public get users(): UserIN[] {
    return this._users;
  }
  public set users(value: UserIN[]) {
    this._users = value;
  }

  public get selectedUser(): UserIN | null {
    return this._selectedUser;
  }
  public set selectedUser(value: UserIN | null) {
    this._selectedUser = value;
  }

  public get showDeleteUserModal(): boolean {
    return this._showDeleteUserModal;
  }
  public set showDeleteUserModal(value: boolean) {
    this._showDeleteUserModal = value;
  }

  public async deleteUser() {
    try {
    } catch (e) {}
  }

  public get deleteUserLoading(): boolean {
    return this._deleteUserLoading;
  }
  public set deleteUserLoading(value: boolean) {
    this._deleteUserLoading = value;
  }
}
