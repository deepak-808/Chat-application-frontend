import Avtar from '../assets/avtar.jpg';
import { IoCallOutline } from "react-icons/io5";
import { BsCameraVideo, BsEmojiSmile } from "react-icons/bs";
import PropTypes from 'prop-types';
import { FiSend, FiSearch } from "react-icons/fi";
import { BsChatRightText } from 'react-icons/bs';
import { GrAttachment } from "react-icons/gr";
import EmojiPicker from 'emoji-picker-react';
import Input from '../components/layout/Input';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/authProvider';
import { CreateConversation, GetAllUsers, GetConversitionWithId, GetMessagesWithId, SendMessage } from '../utils/api';

var isDone = true;
const Dashboard = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [chatCon, setChatCon] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [newConversation, setNewConversation] = useState([]);
  const { user, socket } = useAuth();

  const { _id: userId } = user;



  useEffect(() => {
    if (isDone) {
      isDone = false
      socket.emit('addUser', userId);
      socket.on('getUsers', (users) => {
        console.log("users====>", users)
      });
      console.log("socket", socket)
      socket.on('getMessage', (data) => {
        setMessages(prevMessages => [...prevMessages, data]);
        console.log("======>", data)
        console.log("======>ttttt")

      });
    }
  },)


  useEffect(() => {
    async function getChatConversion() {
      if (user && user?._id) {
        const result = await GetConversitionWithId(user?._id);
        setConversation(result.data.data)
      }
    }
    getChatConversion();
  }, [user])


  const MessageContent = ({ senderId, children }) => {
    return (
      <div className={`${user?._id === senderId ? 'ml-auto justify-end flex' : ''} max-w-[45%]`}>
        <div className={`p-2 rounded-b-xl w-fit ${user?._id === senderId ? 'bg-blue-800 rounded-b-xl text-white rounded-tl-xl' : 'bg-white text-black rounded-tr-xl'} `}>
          {children}
          <span className={` text-gray-400 text-xs flex`}>2:25 pm</span>
        </div>
      </div>
    )
  }
  MessageContent.propTypes = {
    senderId: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  // const handleClick = () => alert('You clicked on me!');

  const chatToggleConversition = () => {
    setChatCon(!chatCon);
  }

  const getAllUsers = async () => {
    const result = await GetAllUsers(user?._id);
    setNewConversation(result.data.data);
    chatToggleConversition();
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const EmojiHandler = () => (
    toggleEmojiPicker()
  );
  const handleEmojiClick = (event) => {
    const emoji = event.emoji;
    setMessage(message + emoji);
  };
  const getUserMessages = async (conId) => {
    const result = await GetMessagesWithId(conId);
    console.log(result)
    setMessages(result.data.data)
  }
  const SelectUserHandler = async (userId) => {
    setSelectedUser(userId);
  }

  const ChatAndSelectedUser = async (user) => {
    await getUserMessages(user.conversationId);
    SelectUserHandler(user)
  }

  const NewUserChatConversionStart = async (data) => {
    const result = await CreateConversation(data);
    if (result.status === 200) {
      await getUserMessages(result.data.data._id);
      SelectUserHandler({ user: data.reciverId, conversationId: result.data.data._id })
    }
  }

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    const messageObj = Object.fromEntries(formData.entries());
    const messageData = {
      conversationId: selectedUser.conversationId,
      userId,
      message: messageObj.message,
      reciverId: selectedUser.user.id
    }
    socket.emit("sendMessage", messageData);
    setMessages((prevMessages) => [...prevMessages, { conversationId: messageData.conversationId, message: messageData.message, senderId: messageData.userId }]);

    setMessage('');
  }
  const Conversion = chatCon ? newConversation : conversation;
  return (
    <div className="w-screen flex">
      <div className="md:max-w-[30%] w-full h-screen hidden md:block">
        <div className="flex item-center m-3 ">
          <div className="border border-blue-500 rounded-full h-[40px] w-[40px]">
            <img src={Avtar} alt="" className='rounded-full' />
          </div>
          <div className="ml-2">
            <h3 className="text-xl flex items-center">{user?.fullName}</h3>
          </div>
          <div className='item-center flex items-center ml-auto cursor-pointer' onClick={getAllUsers}>
            <BsChatRightText />
          </div>
        </div>
        <hr />
        <div className='mx-8'>
          <Input placeholder="Search..." className="mt-2" rightIcons={[{ Icon: FiSearch }]} />
          {!chatCon && <div className='text-blue-400 mt-2'>Messages</div>}
          <div className='overflow-auto md:h-[650px]'>
            {Conversion.map((user) => {
              return (
                <div key={chatCon ? user._id : user.conversationId}
                  onClick={() => !chatCon ? ChatAndSelectedUser(user) : NewUserChatConversionStart({ reciverId: user, senderId: userId })}
                  className="flex item-center border-b border-gray-300 py-8">
                  <div className="border border-blue-500 rounded-full h-[50px] w-[50px]">
                    <img src={Avtar} alt="" className='h-[50px] w-[50px] rounded-full' />
                  </div>
                  <div className="ml-2">
                    <h3 className="text-md">{
                      chatCon ?
                        user.fullName :
                        user.user.username
                    }</h3>
                    {!chatCon && <p className={`text-sm font-light ${user.status === 'online' ? 'text-green-500' : 'text-gray-400'}`}>
                      {user.user.username}
                    </p>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="w-full md:max-w-[70%] bg-gray-50 h-screen mx-auto relative items-center ">
        {!selectedUser ? null : (

          <>
            <div className='md:w-[75%] w-full mx-auto bg-white h-[70px] rounded-full mt-4 flex items-center justify-between px-8' >
              <div className='flex'>
                <img src={Avtar} alt="" className='rounded-full h-[50px] w-[50px]' />
                <div className="ml-2">
                  <h3 className="text-md">{selectedUser?.user?.fullName}</h3>
                  <p
                    className={`text-sm font-light`}>
                    online
                  </p>
                </div>
              </div>
              <div className='flex gap-2'>
                <IoCallOutline />
                <BsCameraVideo />
              </div>
            </div>
            <span className="mt-4 w-full" />
            <div className='h-[75%] w-full overflow-scroll p-4'>
              {messages.length === 0 ? (
                <div className='flex justify-center items-center h-full'>
                  <h1 className='text-xl text-gray-600'>No messages yet.</h1>
                </div>
              ) : (
                messages.map((item, index) => (
                  <div key={index} className="my-4">
                    <MessageContent senderId={item?.senderId}>
                      {item?.message}
                    </MessageContent>
                  </div>
                )))}
            </div>


            {showEmojiPicker && (
              <div className='absolute bottom-24 left-0'>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            <div className='w-full py-10 md:px-16 px-2'>
              <form onSubmit={sendMessageHandler}>
                <Input
                  height={24}
                  style={{ height: 50 }}
                  name="message"
                  size="2xl"
                  placeholder='Type a message...'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onClick={EmojiHandler} icon={<BsEmojiSmile size={20} />}
                  rightIcons={[
                    { Icon: GrAttachment },
                    { Icon: FiSend, onClick: sendMessageHandler },
                  ]} />
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard
