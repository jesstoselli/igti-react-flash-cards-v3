import { useEffect, useState } from "react";
import Button from "./Button";
import Error from "./Error";
import TextArea from "./TextArea";
import TextInput from "./TextInput";

export default function FlashCardForm({
  createMode = true,
  onPersist = null,
  children: flashCard = null,
}) {
  const [title, setTitle] = useState(flashCard?.title || "");
  const [description, setDescription] = useState(flashCard?.description || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (createMode) {
      clearFields();
    }
  }, [createMode]);

  function clearFields() {
    setTitle("");
    setDescription("");
  }

  function validateForm() {
    return title.trim() !== "" && description.trim() !== "";
  }

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      setError("");
      if (onPersist) {
        onPersist(title, description);
        clearFields();
      }
    } else {
      setError("O preenchimento de ambos os campos é obrigatório.");
    }
  }

  function handleFormReset() {
    clearFields();
  }

  const bgClassName = createMode ? "bg-pink-200" : "bg-purple-200";
  return (
    <form
      className={`${bgClassName} p-4 border border-pink-800 bg rounded-md`}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <h2 className='text-center font-semibold'>Manutenção de FlashCards</h2>

      <TextInput
        labelDescription='Título: '
        inputValue={title}
        onInputChange={handleTitleChange}
      />
      <TextArea
        labelDescription='Descrição: '
        textAreaValue={description}
        onTextAreaChange={handleDescriptionChange}
      />

      <div className='flex items-center justify-between'>
        {error.trim() !== "" ? (
          <Error backgroundColor='transparent' textColor='text-red-600'>
            {error}
          </Error>
        ) : (
          <span>&nbsp;</span>
        )}

        <div>
          <Button
            type='reset'
            backgroundColor='bg-pink-600'
            textColor='text-white'
            hoverBackgroundColor='bg-pink-300'
            hoverTextColor='text-black'
          >
            Limpar
          </Button>
          <Button
            type='submit'
            backgroundColor='bg-green-500'
            textColor='text-white'
            hoverBackgroundColor='bg-green-400'
            hoverTextColor='text-black'
          >
            Salvar
          </Button>
        </div>
      </div>
    </form>
  );
}
