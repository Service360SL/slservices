import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "bootstrap/dist/css/bootstrap.min.css";

const TextEditor = () => {
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);

  const handleBoldClick = () => {
    const textArea = textAreaRef.current;
    const startPos = textArea.selectionStart;
    const endPos = textArea.selectionEnd;

    const selectedText = text.substring(startPos, endPos);
    const newText =
      text.slice(0, startPos) + `<b>${selectedText}</b>` + text.slice(endPos);

    setText(newText);
  };

  const handleItalicClick = () => {
    const textArea = textAreaRef.current;
    const startPos = textArea.selectionStart;
    const endPos = textArea.selectionEnd;

    const selectedText = text.substring(startPos, endPos);
    const newText =
      text.slice(0, startPos) + `<i>${selectedText}</i>` + text.slice(endPos);

    setText(newText);
  };

  const handleUnderLineClick = () => {
    const textArea = textAreaRef.current;
    const startPos = textArea.selectionStart;
    const endPos = textArea.selectionEnd;

    const selectedText = text.substring(startPos, endPos);
    const newText =
      text.slice(0, startPos) + `<u>${selectedText}</u>` + text.slice(endPos);

    setText(newText);
  };


  const boldTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Bold
    </Tooltip>
  );
  const italicTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Italic
    </Tooltip>
  );
  const underTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      underline
    </Tooltip>
  );

  return (
    <div>
      <Form.Label>
        Description/Specifications
        <sup>
          <i className="fa-solid fa-asterisk fa-sm AdAstric"></i>
        </sup>
      </Form.Label>

      <Form.Group controlId="exampleForm.ControlTextarea1">
        <div className="d-flex gap-3">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={boldTooltip}
          >
            <div onClick={handleBoldClick} className="descriptionButton ">
              <p>
                <b>B</b>
              </p>
            </div>
          </OverlayTrigger>

          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={italicTooltip}
          >
            <div onClick={handleItalicClick} className="descriptionButton">
              <p>
                <i>I</i>
              </p>
            </div>
          </OverlayTrigger>

          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={underTooltip}
          >
            <div onClick={handleUnderLineClick} className="descriptionButton">
              <p>
                <u>U</u>
              </p>
            </div>
          </OverlayTrigger>
        </div>
        <Form.Control
          as="textarea"
          required
          rows={"auto"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={textAreaRef}
        />
      </Form.Group>
    </div>
  );
};

export default TextEditor;