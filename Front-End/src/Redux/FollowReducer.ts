// interface for followers
interface Followers {
  user_key: number;
  vacation_key: number;
}

// Initial state
export class FollowState {
  followers: Followers[] = [];
}

//what action i will use
export enum FollowActionType {
  addFollow = "addFollow",
  removeFollow = "removeFollow",
  allFollowers = "allFollowers",
  removeAllFollowers = "removeAllFollowers",
}

//action data structure
export interface FollowAction {
  type: FollowActionType;
  payload?: any;
}

// Functions to dispatch actions
export const allFollowersAction = (followers: Followers[]): FollowAction => {
  return { type: FollowActionType.allFollowers, payload: followers };
};

export const addFollowAction = (
  user_key: number,
  vacation_key: number
): FollowAction => {
  return {
    type: FollowActionType.addFollow,
    payload: { user_key, vacation_key },
  };
};

export const removeFollowAction = (
  user_key: number,
  vacation_key: number
): FollowAction => {
  return {
    type: FollowActionType.removeFollow,
    payload: { user_key, vacation_key },
  };
};

export const removeAllFollowsAction = (vacation_key: number): FollowAction => {
  return {
    type: FollowActionType.removeAllFollowers,
    payload: vacation_key,
  };
};

//this is the reducer function
export function FollowReducer(
  currentState: FollowState = new FollowState(),
  action: FollowAction
): FollowState {
  const newState = { ...currentState };
  switch (action.type) {
    case FollowActionType.allFollowers:
      newState.followers = action.payload;
      break;
    case FollowActionType.addFollow:
      // Add new follow to the array
      return {
        ...currentState,
        followers: [...currentState.followers, action.payload],
      };
    case FollowActionType.removeFollow:
      // Remove the specific follow from the array
      return {
        ...currentState,
        followers: currentState.followers.filter(
          (follow) =>
            follow.user_key !== action.payload.user_key ||
            follow.vacation_key !== action.payload.vacation_key
        ),
      };
    case FollowActionType.removeAllFollowers:
      return {
        ...currentState,
        followers: currentState.followers.filter(
          (follow) => follow.vacation_key !== action.payload
        ),
      };
  }
  return newState;
}