import { CometChat } from "@cometchat-pro/react-native-chat";
import { SET_CONVERSATIONS } from "../action-types";

const setConversations = (payload) => {
  return {
    type: SET_CONVERSATIONS,
    payload: payload,
  };
};

export const getAllConversations = (callback) => (dispatch) => {
  console.log("Trying to get all user conversations...");

  let conversationRequest = new CometChat.ConversationsRequestBuilder()
    .setLimit(50)
    .setConversationType("user")
    .build();

  conversationRequest.fetchNext().then(
    (conversationList) => {
      console.log("Conversations list received:", conversationList);
      dispatch(setConversations(conversationList));
      callback(conversationList);
    },
    (error) => {
      console.log("Conversations list fetching failed with error:", error);
    }
  );
};
