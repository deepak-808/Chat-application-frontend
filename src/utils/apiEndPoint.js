import { API_URL } from "./config";

export const endPoint = {
  login: `${API_URL}/auth/`,
  register: `${API_URL}/auth/register/`,
  getAllUser: `${API_URL}/api/alluser/`,
  getConversitionWithId: `${API_URL}/api/conversation/`,
  createConversition: `${API_URL}/api/conversation/`,
  sendMessages: `${API_URL}/api/sendmessage/`,
  getMessages: `${API_URL}/api/getmessage/`
}