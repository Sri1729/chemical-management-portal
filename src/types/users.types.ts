export interface CreateUserReq {
  email: string;
  isSuperUser: boolean;
  labAccess: string;
  createdBy: string;
  id: string;
}

export interface UserI {
  id: string;
  email: string;
  isSuperUser: boolean;
  labAccess: string;
  createdBy: string;
  createdAt: string;
}
