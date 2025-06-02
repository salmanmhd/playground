import { useState } from 'react';
import './styles.css';
import files from './data.json';
export default function Folder() {
  const [data, setData] = useState(files);
  console.log(files);
  return (
    <div className='App'>
      {/* <h1>how are you doing</h1> */}
      <div className='files'>
        {data.map((node, i) => (
          <List node={node} key={i} />
        ))}
      </div>
    </div>
  );
}

function List({ node }) {
  const [isOpen, setIsOpen] = useState(true);
  //   const [isCreated, setIsCreated] = useState(false);

  function createFile() {
    const name = prompt('Enter file name');
    const newFile = {
      name,
      isFolder: false,
    };

    node.children.push(newFile);
    // setIsCreated((p) => !p);
  }

  function createFolder() {
    const name = prompt('Enter folder name');
    const newFolder = {
      name,
      isFolder: true,
      children: [],
    };
    node.children.push(newFolder);
    // setIsCreated((p) => !p);
  }
  return (
    <div className='list-container'>
      <div className='name'>
        <span className='folder' onClick={() => setIsOpen((prev) => !prev)}>
          {node.isFolder && (
            <span className='toggle'>{isOpen ? '- ' : '+ '}</span>
          )}
        </span>
        {node.name}
        {node.isFolder && (
          <>
            <button onClick={createFile} className='button'>
              f
            </button>
            <button onClick={createFolder} className='button'>
              p
            </button>
          </>
        )}
      </div>
      {isOpen &&
        node?.isFolder &&
        node.children.map((childNode, i) => <List node={childNode} key={i} />)}
    </div>
  );
}
