import axios from "axios";
import { endPoint } from "./apiEndPoint";

export const RegisterUser = async(userData, navigate) => {
  try {
    const response = await axios.post(endPoint.register,{
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      mobile: userData.mobile,
      username: userData.username
    })
    if (response.status === 201){
      navigate("/login");
      return response;
    }
  } catch (error) {
    return error;
  }
};
export const CreateConversation = async(data) => {
try {
  const response = await axios.post(endPoint.createConversition,
    {
      receiverId: data.reciverId._id,
      senderId : data.senderId ,
    })
    return response;
} catch (error) {
  return error;
}
}
export const SendMessage = async(userData) => {
  try {
    const response = await axios.post(endPoint.sendMessages,{
      conversationId: userData.conversationId,
      senderId : userData.userId,
      message: userData.message
    })
    if (response.status === 201){
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const GetAllUsers = async(userId) => {
  try {
    const response = await axios.get(`${endPoint.getAllUser}${userId}`);
    if (response.status === 200){
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const GetConversitionWithId = async(userId) => {
  try {
    const response = await axios.get(`${endPoint.getConversitionWithId}${userId}`);
    return response;
  } catch (error) {
    return error
  }
}
export const GetMessagesWithId = async(userId) => {
  try {
    const response = await axios.get(`${endPoint.getMessages}${userId}`);
    return response;
  } catch (error) {
    return error
  }
}