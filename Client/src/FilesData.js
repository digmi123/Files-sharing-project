import { AiOutlineFile } from "react-icons/ai";
import { FiFolder } from "react-icons/fi";
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiOutlineFileJpg } from "react-icons/ai";
import { AiOutlineFileText } from "react-icons/ai";


export const getIconByType = (fileType) => {
  const type = fileType.toLowerCase();
  switch (type) {
    case "folder":
      return FiFolder;

    case "pdf":
      return AiOutlineFilePdf;

    case "image/jpeg":
      return AiOutlineFileJpg;

    case "image/png":
      return AiOutlineFileJpg;;

    case "text/plain":
      return AiOutlineFileText;

    default:
      return AiOutlineFile;
  }
};
