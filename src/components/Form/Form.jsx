import { useState } from "react";
import "./Form.css";

const Form = () => {
  const [label, setLabel] = useState("");
  const [type, setType] = useState("multi");
  const [required, setRequired] = useState(true);
  const [choices, setChoices] = useState("");
  const [text, setText] = useState("");
  const [displayAlpha, setDisplayAlpha] = useState("true");
  const [defaultValue, setDefaultValue] = useState("");

  const addDefault = () => {
    if (!choices.includes(defaultValue.toLowerCase())) {
      return [...choices, defaultValue];
    } else {
      return choices;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      label,
      type,
      required,
      choices: addDefault(),
      displayAlpha,
      defaultValue,
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://www.mocky.io/v2/566061f21200008e3aabd919", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(this.responseText);
        console.log(data);
      }
    };
    xhr.send(data);
  };

  const handleInputChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setRequired(value);
  };

  const handleCancelForm = (e) => {
    setLabel("");
    setType("multi");
    setRequired(true);
    setChoices("");
    setDisplayAlpha("true");
    setDefaultValue("");
    setText("");
  };

  const handleTextArea = (e) => {
    setText(e.target.value);
    setChoices(
      e.target.value.split("\n").filter(function (item, pos, self) {
        return (
          self.indexOf(item.toLowerCase()) === pos &&
          pos < 50 &&
          item.length > 0
        );
      })
    );
  };

  return (
    <div className="form">
      <h2>Field Builder</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label>Label</label>
          <input
            type="text"
            required
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="type">
            <label>Type</label>
            <select
              id="typeSelect"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="multi">Multi-select</option>
              <option value="single">Single-select</option>
            </select>
            <input
              id="cb"
              name="checkbox"
              type="checkbox"
              value={required}
              checked={required}
              onChange={handleInputChange}
            />
            A value is required
          </div>
        </div>
        <div className="row">
          <label>Default Value</label>
          <input
            type="text"
            value={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
          />
        </div>
        <div className="row">
          <label>Choices</label>
          <textarea value={text} onChange={handleTextArea} />
        </div>
        <div className="row">
          <label>Order</label>
          <select
            value={displayAlpha}
            onChange={(e) => setDisplayAlpha(e.target.value)}
          >
            <option value="true">Display choices in Alphabetical Order</option>
            <option value="false">Do not display in Alphabetical Order</option>
          </select>
        </div>
        <div className="buttonContainer">
          <button type="submit">Submit</button>
          <div id="centeredY">or</div>
          <button id="buttonCancel" onClick={handleCancelForm}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
