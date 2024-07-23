import axios from 'axios';
import React, { useEffect,useState,useContext } from 'react';
import Messageheader from './Messageheader';
import { mycontext } from '../Pages/Home';
import MessageBody from './MessageBody';


const Messagecomponent = ({id}) => {
    //console.log(id);
    const { setChatToggle,chatToggle } = useContext(mycontext);
    const [chat, setChat] = useState([]);
    useEffect(()=>{
        const fetchchat = async()=>{
            const response = await axios.get(`http://localhost:4000/api/chat/getChatById/${id}`,{
                headers:{
                                    'Content-Type':'application/json',
                                    'Authorization': `Bearer ${localStorage.getItem("Token")}`,
                                }
            });
            setChat(response.data);
            //console.log(response.data);
        }
        fetchchat();
    },[id,chatToggle])
    return (
        <div>
    {/* Message header */}
    <Messageheader chat={chat}/>
    {/* Message Body */}
    <MessageBody chat={chat}/>
</div>
    );
};

export default Messagecomponent;