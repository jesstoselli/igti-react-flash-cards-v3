import axios from "axios";

const api = axios.create({
  baseURL: "https://flashcards-backend-jesst.glitch.me/",
});

async function getCards(url) {
  const { data } = await api.get(url);

  return data;
}

async function deleteCard(url) {
  await api.delete(url);
}

async function createCard(url, object) {
  const { data } = await api.post(url, object);

  return data;
}

async function editCard(url, object) {
  const { data } = await api.put(url, object);

  return data;
}

export { getCards, deleteCard, createCard, editCard };
