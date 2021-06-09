import { getNewId } from "../services/idService";

export default function TextArea({
  labelDescription = "Descrição do label:",
  textAreaValue = "Valor padrão do textarea",
  onTextAreaChange = null,
  id = getNewId(),
  maxLength = 230,
  rows = 4,
}) {
  function handleInputChange({ currentTarget }) {
    if (onTextAreaChange) {
      const newValue = currentTarget.value;
      onTextAreaChange(newValue);
    }
  }

  const currentCharacterCount = textAreaValue.length;

  return (
    <div className='flex flex-col my-4'>
      <label className='text-sm mb-1 font-medium' htmlFor={id}>
        {labelDescription}
      </label>

      <textarea
        id={id}
        maxLength={maxLength}
        rows={rows}
        className='border p-1'
        value={textAreaValue}
        onChange={handleInputChange}
        style={{ resize: "none" }}
      />
      <div className='text-right mt-2 mr-2 text-sm'>
        <span>
          {currentCharacterCount} / {maxLength} caracteres
        </span>
      </div>
    </div>
  );
}
