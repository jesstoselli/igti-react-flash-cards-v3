import { useState, useEffect } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Button from "../components/Button";
import Error from "../components/Error";
import FlashCard from "../components/FlashCard";
import FlashCardForm from "../components/FlashCardForm";
import FlashCardItem from "../components/FlashCardItem";
import FlashCards from "../components/FlashCards";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Main from "../components/Main";
import RadioButton from "../components/RadioButton";

import { helperShuffleArray } from "../helpers/arrayHelpers";
import {
  apiCreateFlashCard,
  apiDeleteFlashCard,
  apiGetAllFlashCards,
  apiUpdateFlashCard,
} from "../services/apiService";

export default function FlashCardsPage() {
  // Back-End
  const [allCards, setAllCards] = useState([]);

  // Exclusivo para "estudo"
  const [studyCards, setStudyCards] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);

  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  useEffect(() => {
    async function getAllCards() {
      try {
        const backEndAllCards = await apiGetAllFlashCards();
        setAllCards(backEndAllCards);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }

    getAllCards();
  }, []);

  useEffect(() => {
    const studyCardsSet = allCards.map((card) => ({
      ...card,
      showTitle: true,
    }));
    setStudyCards(studyCardsSet);
  }, [allCards]);

  function handleShuffleCards() {
    const shuffledCards = helperShuffleArray(studyCards);

    setAllCards(shuffledCards);
  }

  function handleRadioShowDescriptionClick() {
    const updatedCards = [...studyCards].map((card) => ({
      ...card,
      showTitle: false,
    }));

    setStudyCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  function handleRadioShowTitleClick() {
    const updatedCards = [...studyCards].map((card) => ({
      ...card,
      showTitle: true,
    }));

    setStudyCards(updatedCards);

    setRadioButtonShowTitle(true);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex((card) => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;

    setStudyCards(updatedCards);
  }

  function handleEditFlashCard(card) {
    setCreateMode(false);
    setSelectedTab(1);
    setSelectedFlashCard(card);
  }

  function handleNewFlashCard() {
    setCreateMode(true);
    setSelectedFlashCard(null);
  }

  function handleTabSelect(tabIndex) {
    setSelectedTab(tabIndex);
  }

  async function handleDeleteFlashCard(cardId) {
    try {
      // Deletion on BackEnd
      await apiDeleteFlashCard(cardId);

      // Deletion on FrontEnd
      const filteredCards = allCards.filter((card) => card.id !== cardId);
      setAllCards(filteredCards);

      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handlePersistFlashCardInfo(title, description) {
    if (createMode) {
      // Adding a new flashcard
      try {
        // BackEnd
        const newFlashCard = await apiCreateFlashCard(title, description);

        // FrontEnd
        const newSetOfFlashCards = [...allCards, newFlashCard];
        setAllCards(newSetOfFlashCards);

        setError("");
      } catch (err) {
        setError(err.message);
      }
    } else {
      // Editing a flashcard
      try {
        // BackEnd
        await apiUpdateFlashCard(selectedFlashCard.id, title, description);

        // FrontEnd
        const editedFlashCard = allCards.map((card) => {
          if (card.id === selectedFlashCard.id) {
            return { ...card, title, description };
          }
          return card;
        });
        setAllCards(editedFlashCard);
        setSelectedFlashCard(null);
        setCreateMode(true);

        setError("");
      } catch (err) {
        setError(err.message);
      }
    }
  }

  let mainJsx = (
    <div className='flex justify-center my-4'>
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = (
      <div className='flex justify-center my-4'>
        <Error subtext={true}>{error.message}</Error>
      </div>
    );
  }

  if (!loading && !error) {
    mainJsx = (
      <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
        <TabList>
          <Tab>Listagem</Tab>
          <Tab>Cadastro</Tab>
          <Tab>Estudo</Tab>
        </TabList>

        {/* Listagem */}
        <TabPanel>
          {allCards.map((flashcard) => (
            <FlashCardItem
              key={flashcard.id}
              onDelete={handleDeleteFlashCard}
              onEdit={handleEditFlashCard}
            >
              {flashcard}
            </FlashCardItem>
          ))}
        </TabPanel>

        {/* Cadastro */}
        <TabPanel>
          <div className='text-center mb-4'>
            <Button onButtonClick={handleNewFlashCard}>
              Adicionar FlashCard
            </Button>
          </div>
          <FlashCardForm
            createMode={createMode}
            onPersist={handlePersistFlashCardInfo}
          >
            {selectedFlashCard}
          </FlashCardForm>
        </TabPanel>

        {/* Estudo */}
        <TabPanel>
          <div className='text-center mb-4'>
            <Button onButtonClick={handleShuffleCards}>Shuffle cards</Button>
          </div>
          <div className='flex flex-row items-center justify-center space-x-4 m-4'>
            <RadioButton
              id='radioButtonShowTitle'
              name='showInfo'
              buttonChecked={radioButtonShowTitle}
              onButtonClick={handleRadioShowTitleClick}
            >
              Mostrar título
            </RadioButton>

            <RadioButton
              id='radioButtonShowDescription'
              name='showInfo'
              buttonChecked={!radioButtonShowTitle}
              onButtonClick={handleRadioShowDescriptionClick}
            >
              Mostrar descrição
            </RadioButton>
          </div>
          <FlashCards>
            {studyCards.map(({ id, title, description, showTitle }) => {
              return (
                <FlashCard
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  showFlashCardTitle={showTitle}
                  onToggleFlashCard={handleToggleFlashCard}
                />
              );
            })}
          </FlashCards>
        </TabPanel>
      </Tabs>
    );
  }

  return (
    <>
      <Header>React FlashCards - v3</Header>

      <Main>{mainJsx}</Main>
    </>
  );
}
