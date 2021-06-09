import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export default function FlashCardItem({
  children: flashCard,
  onDelete = null,
  onEdit = null,
}) {
  const { title, description } = flashCard;

  function handleEditIconClick() {
    onEdit(flashCard);
  }

  function handleDeleteIconClick() {
    onDelete(flashCard.id);
  }

  return (
    <div className='border p-2 m-2'>
      <ul className='flex flex-col space-y-4'>
        <li>
          <strong>Título: </strong> <span>{title}</span>
        </li>
        <li>
          <strong>Descrição: </strong> <span>{description}</span>
        </li>
      </ul>
      <div className='mt-4 flex flex-row items-center justify-end space-x-4'>
        <AiOutlineEdit
          onClick={handleEditIconClick}
          className='cursor-pointer'
          size={24}
          color={"#F9A8D4"}
        />
        <AiOutlineDelete
          onClick={handleDeleteIconClick}
          className='cursor-pointer'
          size={24}
          color={"#9D174D"}
        />
      </div>
    </div>
  );
}
