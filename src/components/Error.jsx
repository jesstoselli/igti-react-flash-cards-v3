export default function Error({
  children: errorMessage,
  subtext = false,
  backgroundColor = "bg-red-600",
  textColor = "text-white",
}) {
  return (
    <div
      className={`${backgroundColor} ${textColor} text-center font-semibold p-4 border border-transparent rounded-md`}
    >
      <h4 className='text-xl'>{errorMessage}</h4>
      {subtext && <p>Try refreshing this page</p>}
    </div>
  );
}
