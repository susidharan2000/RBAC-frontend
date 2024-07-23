import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import ChatHeader from '../Components/ChatHeader';
import Messagecomponent from '../Components/Messagecomponent';
import axios from 'axios';
import { mycontext } from './Home';
import { Link, useLocation } from 'react-router-dom';
import InitialMessageImg from "../Components/InitialMessageImg";
const ChatPage = () => {
    const [chat, setChat] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const { chatToggle } = useContext(mycontext);
    const [isLoading,setIsLoading] = useState(false);
    /* Location */
    const location = useLocation();
    const [subtab, setSubTab] = useState('');
    const [userid, setUserid] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabUrl = urlParams.get('subtab');
        if (tabUrl) {
            setSubTab(tabUrl.split('/')[0]);
            setUserid(tabUrl.split('/')[1]);
        }
    }, [location.search]);

    useEffect(() => {
        const fetchChat = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:4000/api/chat/getChat', {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("Token")}`
                    }
                });
                setChat(response.data);
                //console.log(response.data);
            } catch (error) {
                console.error(error);
                // Handle error: set an error state or show an error message
            }
            finally{
                setIsLoading(false);
            }
        };
        fetchChat();
    }, [chatToggle]);

    return (
        <div className="flex flex-col">
            <ChatHeader />
            <div className="min-h-screen flex flex-col md:flex-row sm:w-100 w-full h-full">
                <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-4 md:mt-4 bg-gray-200 rounded-2xl p-1">
                    {/* User list */}
                    { isLoading ?
                    <div role="status" style={{marginTop:"300px",marginLeft:"150px"}}>
                    <svg aria-hidden="true" class="inline w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
                    :
                    chat.length === 0 ? (
                        <h1 className='text-center text-4xl text-gray-500 mt-10'>No Chats</h1>
                    ) : (
                        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 p-3 mb-5 hover:cursor-pointer">
                            {chat.map((ele, index) => (
                                (ele.groupAdmin === currentUser.rest._id || ele.users.some(user => user._id === currentUser.rest._id)) && (
                                    <Link key={index} to={`./?tab=chat&subtab=message/${ele._id}`}>
                                        <li className="pt-3 pb-0 sm:pt-4 hover:bg-gray-300 rounded-xl p-3">
                                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                                <div className="flex-shrink-0">
                                                    <img className="w-10 h-10 rounded-full border-2 border-white" src={ele.isGroupChat ? ele.GroupPic : ele.users.find(user => user._id !== currentUser.rest._id).profilePic} alt="Chat group" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                        {ele.isGroupChat ? ele.chatName : ele.users.find(user => user._id !== currentUser.rest._id).username}
                                                    </p>
                                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                                        { ele.latestMessage ? ele.latestMessage.content : "No message available"}
                                                    </p>
                                                </div>
                                                {!ele.isGroupChat && (
                                                    <div className="inline-flex items-center text-gray-400 dark:text-white">
                                                        {ele.users.find(user => user._id !== currentUser.rest._id).role}
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    </Link>
                                )
                            ))}
                        </ul>
                    )}
                </div>
                <div className="w-full md:w-2/3 mt-8 mr-10">
                    {/* Chat */}
                    {(subtab === `message`) && (userid !== null)?<Messagecomponent id={userid} />:<InitialMessageImg />}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
