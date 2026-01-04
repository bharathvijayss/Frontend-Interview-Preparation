import { useState } from "react";
import {
  file_folder_container,
  file_folder,
  icon,
  util_icons
} from "./FileFolderList.module.css";

const FileFolderList = ({ nodeList, addFolder, addFile, deleteNode }) => {
  const [isExpanded, setIsExpanded] = useState({});

  return (
    <div className={file_folder_container}>
      {nodeList.map((node) => (
        <div className={file_folder} key={node.id}>
          <p>
            <span
              className={icon}
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name],
                }))
              }
            >
              {node.isFolder && (isExpanded[node.name] ? "🔻" : "🔺")}
            </span>
            <span>
              {node.isFolder ? "📁" : "🗒️"} {node.name}
            </span>

            {node.isFolder && (
              <>
                <span className={util_icons} onClick={() => addFolder(node.id)}>
                  🗂️
                </span>
                <span className={util_icons} onClick={() => addFile(node.id)}>
                  📑
                </span>
              </>
            )}

            <span className={util_icons} onClick={() => deleteNode(node.id)}>
              ❌
            </span>
          </p>
          {isExpanded[node.name] && node.isFolder && (
            <FileFolderList
              nodeList={node.children}
              addFolder={addFolder}
              addFile={addFile}
              deleteNode={deleteNode}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FileFolderList;
