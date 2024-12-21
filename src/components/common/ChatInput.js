import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  Popover,
  Tooltip
} from '@mui/material';
import EmojiPicker from 'emoji-picker-react';

export default function ChatInput({emojiAnchor, handleEmojiClick, closeEmojiPicker}) {
  const [input, setInput] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleEmojiClick = (emojiObject) => {
//     setInput(input + emojiObject.emoji);  // Append emoji to text
//   };

//   const openEmojiPicker = (event) => {
//     setAnchorEl(event.currentTarget);  // Open popover near icon
//   };

//   const closeEmojiPicker = () => {
//     setAnchorEl(null);
//   };

  const open = Boolean(emojiAnchor);

  return (
      
      <Popover
        open={open}
        anchorEl={emojiAnchor}
        onClose={closeEmojiPicker}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </Popover>
  );
}
