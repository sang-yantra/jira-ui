import React, { useRef, useState } from "react";
import button from "../../common/Button";
import Icon from "../../common/Icon";
import { isBlockActive } from "../../utils/SlateUtilityFunctions";
import usePopup from "../../utils/usePopup";
import { insertEmbed } from "../../utils/embed.js";
const Embed = ({ editor, format }) => {
  const urlInputRef = useRef();
  const [showInput, setShowInput] = usePopup(urlInputRef);
  const [formData, setFormData] = useState({
    url: "",
    width: "",
    height: "",
  });
  const handlebuttonClick = (e) => {
    e.preventDefault();
    setShowInput((prev) => !prev);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    insertEmbed(editor, { ...formData }, format);
    setShowInput(false);
    setFormData({
      url: "",
      width: "",
      height: "",
    });
  };
  return (
    <div ref={urlInputRef} className="popup-wrapper">
      <button
        active={"true"}
        style={{
          border: "1px solid lightgray",
          borderBottom: "none",
        }}
        format={format}
        onClick={handlebuttonClick}
      >
        <Icon icon={format} />
      </button>
      {showInput && (
        <div className="popup">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Enter url"
              value={formData.url}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, url: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Enter width of frame"
              value={formData.width}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, width: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Enter height of frame"
              value={formData.height}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, height: e.target.value }))
              }
            />

            <button type="submit">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Embed;
