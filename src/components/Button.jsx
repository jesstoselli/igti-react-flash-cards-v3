export default function Button({
  children: description = "Descrição do botão",
  type = "button",
  onButtonClick = null,
  backgroundColor = "bg-pink-100",
  textColor = "text-black",
  hoverBackgroundColor = "bg-pink-600",
  hoverTextColor = "text-gray-50",
}) {
  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <button
      type={type}
      className={`${backgroundColor} ${textColor} font-medium p-2 m-1 rounded-md hover:${hoverBackgroundColor} hover:${hoverTextColor}`}
      style={{ border: "none" }}
      onClick={handleButtonClick}
    >
      {description}
    </button>
  );
}
