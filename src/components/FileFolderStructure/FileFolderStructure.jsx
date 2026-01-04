import data from "./utils/data.json";
import { useState } from "react";
import FileFolderList from "./FileFolderList/FileFolderList";

const FileFolderStructure = () => {
  const [filesAndFolders, setFilesAndFolders] = useState(data);

  const addFolder = (id) => {
    const folderName = prompt("Enter the Folder Name");

    if (!folderName) {
      return;
    }

    const newNode = {
      name: folderName,
      isFolder: true,
      id: crypto.randomUUID(),
      children: []
    };

    const addNode = (list) => {
      return list.map((node) => {
        if (!node.isFolder) {
          return node;
        }

        if (node.id === id) {
          return {
            ...node,
            children: [...node.children, newNode],
          };
        } else {
          return {
            ...node,
            children: addNode(node.children),
          };
        }
      });
    };

    const newList = addNode(filesAndFolders);

    setFilesAndFolders(newList);
  };

  const addFile = (id) => {
    const fileName = prompt("Enter the File Name");

    if (!fileName) {
      return;
    }

    const newNode = {
      name: fileName,
      isFolder: false,
      id: crypto.randomUUID(),
    };

    const addNode = (list) => {
      return list.map((node) => {
        if (!node.isFolder) {
          return node;
        }

        if (node.id === id) {
          return {
            ...node,
            children: [...node.children, newNode],
          };
        } else {
          return {
            ...node,
            children: addNode(node.children),
          };
        }
      });
    };

    const newList = addNode(filesAndFolders);

    setFilesAndFolders(newList);
  };

  const deleteNode = (id) => {
    const eliminateNodeWithID = (nodes) => {
      return nodes
        .filter((node) => {
          return node.id !== id;
        })
        .map((node) => {
          if (node.isFolder) {
            return {
              ...node,
              children: eliminateNodeWithID(node.children),
            };
          } else {
            return node;
          }
        });
    };
    const newFilesAndFolders = eliminateNodeWithID(filesAndFolders);
    setFilesAndFolders(newFilesAndFolders);
  };

  return (
    <FileFolderList
      nodeList={filesAndFolders}
      addFolder={addFolder}
      addFile={addFile}
      deleteNode={deleteNode}
    />
  );
};

export default FileFolderStructure;
