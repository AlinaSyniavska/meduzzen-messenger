import { axiosService, Response } from "./axios.service";

import { IMessage } from "../interfaces";
import { urls } from "../constants";

const messageService = {
  getAll: (): Response<IMessage[]> => axiosService.get(urls.chats),
  getById: (id: String): Response<IMessage> => axiosService.get(`${urls.chats}/${id}`),
  create: (message: IMessage): Response<string> => axiosService.post(urls.chats, message),
};

export { messageService };
