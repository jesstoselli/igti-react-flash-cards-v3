import { getCards, deleteCard, createCard, editCard } from "./httpService";
import { getNewId } from "./idService";

const url = "/flashcards";

export async function apiGetAllFlashCards() {
  const allFlashCards = await getCards(url);
  return allFlashCards;
}

export async function apiDeleteFlashCard(cardId) {
  await deleteCard(`${url}/${cardId}`);
}

export async function apiCreateFlashCard(title, description) {
  const newFlashCard = await createCard(url, {
    id: getNewId(),
    title,
    description,
  });

  return newFlashCard;
}

export async function apiUpdateFlashCard(cardId, title, description) {
  const updatedFlashCard = await editCard(`${url}/${cardId}`, {
    title,
    description,
  });

  return updatedFlashCard;
}
