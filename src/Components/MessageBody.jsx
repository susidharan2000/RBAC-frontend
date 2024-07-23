import axios from 'axios';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { FiSend } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { mycontext } from '../Pages/Home';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'https://rbac-backend-dxeh.onrender.com';

const MessageBody = ({ chat }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [messages, setMessages] = useState([]);
    const [contentMessage, setContentMessage] = useState('');
    const [toggleMessage, setToggleMessage] = useState(false);
    const { chatToggle, setChatToggle } = useContext(mycontext);
    const messagesEndRef = useRef(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);

        return () => newSocket.close();  // Disconnect the socket when component unmounts
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on('connect', () => {
            console.log('Connected to Socket.io server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.io server');
        });

        // Clean up event listeners
        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, [socket]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`https://rbac-backend-dxeh.onrender.com/api/message/chat/${chat._id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                    }
                });
                setMessages(response.data.messages);
                if (socket) {
                    socket.emit('join-chat', chat._id);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        fetchMessages();
    }, [chat._id, socket]);

    useEffect(() => {
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        };
        scrollToBottom();
    }, [messages]);

    const getTime = (t) => {
        const utcTimestamp = t;
        const date = new Date(utcTimestamp);
        const options = {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        const localTimeString = date.toLocaleString("en-US", options);
        return localTimeString;
    };

    const handleChangeMessage = (e) => {
        setContentMessage(e.target.value);
    };

    const handleSubmitMessage = async (e) => {
        e.preventDefault();
        const payload = {
            chatId: chat._id,
            content: contentMessage
        };
        try {
            const response = await axios.post(`https://rbac-backend-dxeh.onrender.com/api/message/sendMessage`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                }
            });

            //setMessages([...messages, response.data]);
            setContentMessage('');
            setToggleMessage(!toggleMessage);
            setChatToggle(!chatToggle);

            if (socket) {
                socket.emit('new-message', response.data);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessageReceived) => {
            //console.log(newMessageReceived);
            setMessages(prevMessages => [...prevMessages, newMessageReceived]);
        };

        socket.on('message-Received', handleNewMessage);

        return () => {
            socket.off('message-Received', handleNewMessage); // Clean up listener
        };
    }, [socket]);

    return (
        <>
            <div className='h-auto flex flex-col items-start justify-end overflow-hidden mb-1' style={{ minHeight: '83vh' }}>
                <div className='flex flex-col w-full max-w-6xl p-4 overflow-y-auto' style={{ maxHeight: '70vh' }}>
                    {messages.map((message) => (
                        message.sender._id === currentUser.rest._id ? (
                            <div key={message._id} className='mb-4 self-end'>
                                <div className='flex flex-row gap-1'>
                                    <span className='inline-block px-2 py-1 text-sm font-semibold text-white bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-md'>{message.content}</span>
                                    <p className='text-xs text-gray-400'> {getTime(message.createdAt)}</p>
                                </div>
                            </div>
                        ) : (
                            <div key={message._id} className='mb-4 self-start'>
                                <div className='flex flex-row gap-1'>
                                    {!chat.isGroupChat ? (
                                        <div className='inline-block px-2 py-1 text-sm font-semibold text-white bg-gradient-to-br from-blue-400 to-blue-500 rounded-full shadow-md'>
                                            {message.content}
                                        </div>
                                    ) : (
                                        <div className='flex flex-row gap-2'>
                                            <div>
                                                <img
                                                    className="w-10 h-10 rounded-full border-gray border-2"
                                                    src={message.sender.profilePic}
                                                    alt="User Profile"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="team flex flex-col items-start px-2 py-1 text-xs font-semibold text-white bg-gradient-to-br from-blue-400 to-blue-500 rounded-full shadow-md">
                                                    <div className="flex flex-row gap-10">
                                                        <div className="flex flex-col items-start w-full">
                                                            <p className="text-sm font-medium truncate">
                                                                {message.sender.username}
                                                            </p>
                                                            <p className="text-xs items-start text-white dark:text-gray-300 truncate">
                                                                {message.content}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <p className='text-xs text-gray-400'>{getTime(message.createdAt)}</p>
                                </div>
                            </div>
                        )
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            {/* Message input form */}
            <form className='w-full' onSubmit={handleSubmitMessage}>
                <div className='relative'>
                    <input
                        id='message'
                        className='block w-full p-4 pl-10 pr-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-green-500 focus:border-green-500 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
                        placeholder='Enter your message...'
                        value={contentMessage}
                        onChange={handleChangeMessage}
                        required
                    />
                    <button
                        type='submit'
                        className='absolute right-0 inset-y-0 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                        <FiSend />
                    </button>
                </div>
            </form>
        </>
    );
};

export default MessageBody;
