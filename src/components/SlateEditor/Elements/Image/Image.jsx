import React from "react";
import { useSelected, useFocused } from "slate-react";
import Image from "next/image";
const ImageWrapper = ({ attributes, element, children }) => {
  const { url, width, height } = element;
  const selected = useSelected();
  const focused = useFocused();
  console.log(width, height);
  return (
    <div
      {...attributes}
      className="element-image"
      style={{
        display: "flex",
        justifyContent: "center",
        boxShadow: selected && focused && "0 0 3px 3px lightgray",
      }}
    >
      <div contentEditable={false} style={{ width: width, height: height }}>
        <Image alt={element.alt} src={url} />
      </div>
      {children}
    </div>
  );
};
export default ImageWrapper;
