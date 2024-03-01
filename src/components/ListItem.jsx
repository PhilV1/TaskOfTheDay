import { FaTrash } from 'react-icons/fa';
import { ImCheckmark } from 'react-icons/im';
import { useState } from 'react';

function ListItem({ children, id, onDelete, onComplete }) {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(children);
  const [active, setActive] = useState(false);

  function handleClickDelete() {
    onDelete(id);
  }

  function handleClickComplete() {
    setActive(!active);
    onComplete(id);
  }

  function handleTextClick() {
    e.stopPropagation();
    setEditing(true);
  }

  function handleTextChange(event) {
    setEditedText(event.target.value);
  }

  function handleTextBlur() {
    setEditing(false);
  }

  return (
    <li
      onClick={handleTextClick}
      className={`bg-white listItem border rounded-md w-[20rem] px-2 mb-2 flex justify-between`}
    >
      {editing ? (
        <input
          type="text"
          value={editedText}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          className={` break-words`}
        />
      ) : (
        <p
          className={`${
            active ? 'text-red-600 font-medium line-through ' : ''
          }   break-words`}
          onClick={handleTextClick}
        >
          {editedText}
        </p>
      )}
      <div className="button-wrapper flex">
        <button
          className={`px-2 hover:text-green-600 hover:rounded-lg w-6`}
          onClick={handleClickComplete}
        >
          <ImCheckmark />
        </button>
        <button
          onClick={handleClickDelete}
          className={`px-2 hover:text-red-600 hover:rounded-lg w-6`}
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
}

export default ListItem;
