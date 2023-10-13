
import "../styles/headline.css";

const Headline = (props) => {
  return (
    <div className="headline" s>
      <div className="center-container">
        Welcome {props.text}
       
      </div>
      <p className="paraLine" >
        
      </p>
    </div>
  );
};

export default Headline;
