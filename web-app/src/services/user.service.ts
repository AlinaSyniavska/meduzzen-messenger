import { axiosService, Response } from "./axios.service";

import { IUser } from "../interfaces";
import { urls } from "../constants";

const userService = {
  getAll: (): Response<IUser[]> => axiosService.get(urls.users),
  getById: (id: String): Response<IUser> => axiosService.get(`${urls.users}/${id}`),
  create: (user: IUser): Response<string> => axiosService.post(urls.users, user),
};

export { userService };
