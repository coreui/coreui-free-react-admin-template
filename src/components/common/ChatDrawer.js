import React, { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    TextField,
    IconButton,
    Divider,
    Tooltip,
    Typography,
    Box,
    Popover,
    Paper
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import { ThumbUpAltOutlined } from '@mui/icons-material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import EmojiPicker from 'emoji-picker-react';
import ChatInput from './ChatInput';

export default function ChatDrawer({ open, toggleDrawer }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [attachment, setAttachment] = useState(null);
    const [emojiAnchor, setEmojiAnchor] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);



    // Handle Sending New Message
    const handleSend = () => {
        if (input || attachment) {
            setMessages([...messages, { text: input, file: attachment, reactions: [] }]);
            setInput('');
            setAttachment(null);
        }
    };

    // Handle Emoji Picker Open
    const openEmojiPicker = (event, messageIndex) => {
        setSelectedMessage(messageIndex);
        setEmojiAnchor(event.currentTarget);
    };

    // Close Emoji Picker
    const closeEmojiPicker = () => {
        setEmojiAnchor(null);
        setSelectedMessage(null);
    };

    // Handle Emoji Selection
    const handleEmojiClick = (emojiObject) => {
        const updatedMessages = messages.map((msg, index) => {
            if (index === selectedMessage) {
                return {
                    ...msg,
                    reactions: [...msg.reactions, emojiObject.emoji]
                };
            }
            return msg;
        });
        setMessages(updatedMessages);
        closeEmojiPicker();
    };

    // Handle File Attachment
    const handleFileChange = (event) => {
        setAttachment(event.target.files[0]);
    };

    const removeAttachment = () => {
        setAttachment(null);
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer}
                PaperProps={{
                    sx: {
                        marginTop: '65px',
                        width: '30%',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        }
                    }
                }}
            >
                <Box width="100%" p={1}>
                    <Typography variant="h6">Activity</Typography>
                    <Divider sx={{ background: 'black' }} />

                    {/* Chat Messages */}
                    <List sx={{ height: 470, overflow: 'auto', mt: 2 }}>
                        {messages.map((msg, index) => (
                            <ListItem key={index} alignItems="flex-start" sx={{ padding: "3px", mb: 1 }}>
                                <Box
                                    sx={{
                                        border: '1px solid #eceff1',
                                        borderRadius: 1,
                                        paddingX: 1,
                                        width: '100%',
                                        // boxShadow: 1,
                                    }}
                                >
                                    {/* Message Text */}
                                    <Box
                                        sx={{
                                            borderBottom: '1px solid #eceff1',
                                            paddingBottom: 1
                                        }}
                                    >
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                                User Name
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                2 hours ago
                                            </Typography>
                                        </Box>
                                        <Typography>{msg.text}</Typography>
                                        {msg.file && (
                                            <Paper
                                                elevation={2}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: 1,
                                                    mt: 1,
                                                }}
                                            >
                                                <InsertDriveFileIcon sx={{ mr: 1 }} />
                                                <Typography>{msg.file.name}</Typography>
                                            </Paper>
                                        )}
                                    </Box>

                                    {/* Reactions and Emoji Button */}
                                    <Box mt={1} display="flex" padding={0} alignItems="center">
                                        {/* {msg.reactions.map((emoji, idx) => (
                                            <Typography key={idx} sx={{ marginRight: 1 }}>
                                                {emoji}
                                            </Typography>
                                        ))} */}
                                        <IconButton
                                            size='small'
                                        >
                                            <ThumbUpAltOutlined />
                                        </IconButton>
                                        <IconButton
                                            size='small'
                                            onClick={(event) => openEmojiPicker(event, index)}
                                        >
                                            {
                                                msg.reactions.length > 0 ? (
                                                    <Typography sx={{ marginRight: 1 }}>
                                                        {msg.reactions[0]}
                                                    </Typography>

                                                ) : (
                                                    <IconButton
                                                        size='small'
                                                        onClick={(event) => openEmojiPicker(event, index)}
                                                    >
                                                        <InsertEmoticonIcon />
                                                    </IconButton>
                                                )
                                            }

                                        </IconButton>
                                    </Box>
                                </Box>
                            </ListItem>
                        ))}
                    </List>

                    <Divider sx={{ background: 'black' }} />


                    {/* File Preview (Before Sending) */}
                    {attachment ? (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 0,
                                mt: 1,
                                bgcolor: '#f5f5f5',
                                borderRadius: 1
                            }}
                        >
                            <InsertDriveFileIcon sx={{ mr: 1 }} />
                            <Typography sx={{ flexGrow: 1 }}>{attachment.name}</Typography>
                            <IconButton size="small" onClick={removeAttachment}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    ) : <Box mt={4}></Box>}

                    {/* Chat Input Section */}
                    <Box display="flex" justifyContent="start" alignItems="" flexDirection="column" width="100%" mt={2}>
                        <Box display="flex" justifyContent="start" alignItems="center">
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <IconButton onClick={handleSend} color="primary">
                                <SendIcon />
                            </IconButton>
                        </Box>
                        <Box>
                            <input
                                type="file"
                                style={{ display: 'none' }}
                                id="file-upload"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="file-upload">
                                <IconButton component="span">
                                    <AttachFileIcon />
                                </IconButton>
                            </label>

                        </Box>

                    </Box>
                </Box>
            </Drawer>

            {/* Emoji Picker Popover */}
            <ChatInput
                emojiAnchor={emojiAnchor}
                handleEmojiClick={handleEmojiClick}
                closeEmojiPicker={closeEmojiPicker}
            />
            {/* <Popover
                open={Boolean(emojiAnchor)}
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
            </Popover> */}
        </>
    );
}
