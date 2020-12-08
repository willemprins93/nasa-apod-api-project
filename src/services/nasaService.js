import axios from "axios";

const service = axios.create({
  baseURL:
    "https://api.nasa.gov/planetary/apod?api_key=Ldl48OVVB1Dj0gKqIgScZ1a9VsYXqEKSwmYOlgtO",
});

export const getAPOD = (date) => {
  return axios
    .get(
      `https://api.nasa.gov/planetary/apod?api_key=Ldl48OVVB1Dj0gKqIgScZ1a9VsYXqEKSwmYOlgtO&date=${date}`
    )
    .then((result) => {
      console.log(result.data);
      return result.data;
    })
    .catch((err) => console.error);
};
