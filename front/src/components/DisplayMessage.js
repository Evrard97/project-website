function DisplayMessage(props) {
  return (
    <div variant={props.variant}>
      {props.variant === "danger" ? (
        <div
          className="p-4 mb-4 text-xl text-red-700 bg-red-400 rounded-lg"
          role="alert"
        >
          {" "}
          {props.children}{" "}
        </div>
      ) : (
        <div className="p-4 mb-4 text-xl text-blue-700 ">
          {" "}
          {props.children}{" "}
        </div>
      )}
    </div>
  );
}

export default DisplayMessage;
