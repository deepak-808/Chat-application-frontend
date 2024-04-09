// ChatWindow.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { BsEmojiSmile } from 'react-icons/bs';
import { GrAttachment } from 'react-icons/gr';
import Input from './Input';
import Message from './Message';

const ChatWindow = ({ avatar, selectedUser, messages, message, showEmojiPicker, sendMessageHandler, toggleEmojiPicker, handleEmojiClick }) => {
  return (
    <div className="w-full md:max-w-[70%] bg-gray-50 h-screen mx-auto relative items-center ">
    {/* <div className="w-[70%] flex flex-col  bg-gray-50 h-screen relative"> */}
      {!selectedUser ? null : (

        <>
          <div className='md:w-[75%] w-full mx-auto bg-white h-[70px] rounded-full mt-4 flex items-center justify-between px-8' >
            <div className='flex'>
              <img src={avatar} alt="" className='rounded-full h-[50px] w-[50px]' />
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
                <MessageContent senderId={item?.message.senderId}>
                  {item?.message?.message}
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
                style={{height: 50}}
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
  );
};

ChatWindow.propTypes = {
  avatar: PropTypes.string.isRequired,
  selectedUser: PropTypes.object,
  messages: PropTypes.array.isRequired,
  message: PropTypes.string.isRequired,
  showEmojiPicker: PropTypes.bool.isRequired,
  sendMessageHandler: PropTypes.func.isRequired,
  toggleEmojiPicker: PropTypes.func.isRequired,
  handleEmojiClick: PropTypes.func.isRequired,
};

export default ChatWindow;
