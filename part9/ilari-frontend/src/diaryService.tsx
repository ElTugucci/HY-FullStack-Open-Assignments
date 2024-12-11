import axios from "axios";
import { Diary, NewDiaryType } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getDiaryList = async () => {
  return axios.get<Diary[]>(baseUrl).then((response) => response.data);
};

export const createDiary = async (object: NewDiaryType) => {
  return axios.post<Diary>(baseUrl, object).then((response) => response.data);
};
