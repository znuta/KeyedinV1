import { SET_TRANSACTIONS } from "../action-types";
import { BASEURL } from "../../constants/Services";


const setTransactions = (transactions) => {
  return {
    type: SET_TRANSACTIONS,
    transactions: transactions,
  };
};

export const getAllTransactions = (token,callback) => (dispatch) => {
  console.log("Trying to get all user transactions...");
  let uri = BASEURL + "/wallet/txn";

  try {
    fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(setTransactions(res.data));
        callback();

        return;
      })
      .catch((error) => {
        console.log("at error", error);
      });
  } catch (error) {
    console.log(error);
  }
};

