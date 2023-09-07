import { User } from "../Models/User";

//initial state
export class UsersState {
  public currentUser: User | null = null;
  public role: string | null = null;
}

//what action i will use...
export enum UserActionType {
  userLogin = "userLogin",
  adminLogin = "adminLogin",
  userLogout = "userLogout",
}

//action data structure
export interface UserAction {
  type: UserActionType;
  payload?: any;
}

//which function will run when i will dispatch an action
// set state as user if user is logged in
export const userLoginAction = (
  first_name: string,
  last_name: string,
  role: string,
  user_key: number
): UserAction => {
  return {
    type: UserActionType.userLogin,
    payload: { first_name, last_name, role, user_key },
  };
};

// set state as user if user is logged in
export const adminLoginAction = (
  first_name: string,
  last_name: string,
  role: string
): UserAction => {
  return {
    type: UserActionType.adminLogin,
    payload: { first_name, last_name, role },
  };
};

// Log out the user
export const userLogoutAction = (): UserAction => {
  return { type: UserActionType.userLogout };
};

//this is the reducer function
export function UserReducer(
  currentState: UsersState = new UsersState(),
  action: UserAction
): UsersState {
  const newState = { ...currentState };
  switch (action.type) {
    case UserActionType.userLogin:
      newState.currentUser = {
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        role: action.payload.role,
        user_key: action.payload.user_key,
      };
      newState.role = action.payload.role;
      break;

    case UserActionType.adminLogin:
      newState.currentUser = action.payload;
      newState.role = "admin";
      break;
    case UserActionType.userLogout: // handle logout
      newState.currentUser = null;
      newState.role = null;
      break;
  }
  return newState;
}