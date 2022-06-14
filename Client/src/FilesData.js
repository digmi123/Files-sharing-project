import { AiOutlineFile } from "react-icons/ai";
import { FiFolder } from "react-icons/fi";
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiOutlineFileJpg } from "react-icons/ai";
import { AiOutlineFileText } from "react-icons/ai";

const filesData = [
  {
    type: "Folder",
    fileName: "File 1",
    contains: [
      {
        fileName: "File A",
        type: "Folder",
        contains: [
          { fileName: "File F", type: "JPG", contains: [] },
          { fileName: "File G", type: "txt", contains: [] },
        ],
      },
    ],
  },
  {
    type: "PDF",
    fileName: "File 2",
    contains: [],
  },
  {
    type: "txt",
    fileName: "File 3",
    contains: [],
  },
  {
    type: "JPG",
    fileName: "File 4",
    contains: [],
  },
  {
    type: "Folder",
    fileName: "File 5",
    contains: [
      { fileName: "File B", type: "JPG", contains: [] },
      { fileName: "File C", type: "txt", contains: [] },
    ],
  },
  {
    type: "Folder",
    fileName: "File 6",
    contains: [
      { fileName: "File D", type: "txt", contains: [] },
      { fileName: "File E", type: "txt", contains: [] },
    ],
  },
  {
    type: "Folder",
    fileName: "File 7",
    contains: [],
  },
  {
    type: "Folder",
    fileName: "File 8",
    contains: [],
  },
];

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

    case "txt":
      return AiOutlineFileText;

    default:
      return AiOutlineFile;
  }
};

export default filesData;
