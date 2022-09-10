import { insertLink } from "../../utils/link.js";
import button from "../../common/Button";
import Icon from "../../common/Icon";
import { isBlockActive } from "../../utils/SlateUtilityFunctions.js";
const Linkbutton = (props) => {
  const { editor } = props;
  const handleInsertLink = () => {
    const url = prompt("Enter URL");
    insertLink(editor, url);
  };
  return (
    <button format={"link"} onClick={handleInsertLink}>
      <Icon icon="link" />
    </button>
  );
};

export default Linkbutton;
