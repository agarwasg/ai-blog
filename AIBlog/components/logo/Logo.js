import { faParagraph } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Logo = () => {
  return (
    <div className="text-3xl text-center py-4 font-heading">
    AIBlog
      <FontAwesomeIcon
        icon={faParagraph}
        className="text-2xl text-green-400"
      ></FontAwesomeIcon>
    </div>
  );
};
