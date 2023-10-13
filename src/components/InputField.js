import "../styles/inputField.css";

const InputField = (props) => {
  return (
    <div className="input" style={props.style}>
      {props.icon ? <props.icon className="icon w-5" /> : ""}
      <input
        name={props.name}
        type={props.type}
       
        required={true}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.changeHandler}
       
      ></input>
      {/* {props.icon2 ? <props.icon2 className="icon" style={props.icon2style} /> : ""} */}
    </div>
  );
};

export default InputField;
