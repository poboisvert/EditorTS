import axios from "axios";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Dispatch } from "redux";

export const searchRepositories = (term: string) => {
  // Use Dispatch with Action from our definitions
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES,
    });

    try {
      const { data } = await axios.get(
        "https://registry.npmjs.org/-/v1/search",
        {
          params: {
            // Term from const searchRepositories = (term: string)
            text: term,
          },
        }
      );

      const names = data.objects.map((result: any) => {
        return result.package.name;
      });

      // Dispatch validator
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_SUCESS,
        payload: names,
      });
    } catch (err) {
      // Console browser
      console.log(err);

      // Dispatch to action/index.ts
      dispatch({
        type: ActionType.SEARCH_REPOSITORIES_ERROR,
        payload: err.message,
      });
    }
  };
};
