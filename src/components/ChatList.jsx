// ChatList.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { BsChatRightText } from 'react-icons/bs';
import Input from './layout/Input';

const ChatList = ({ avatar, user, chatCon, Conversion, selectUserHandler, getAllUsers }) => {
  return (
    <div className="md:max-w-[30%] w-full h-screen hidden md:block">
        <div className="flex item-center m-3 ">
          <div className="border border-blue-500 rounded-full h-[40px] w-[40px]">
            <img src={avatar} alt="" className='rounded-full' />
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
                  onClick={() => !chatCon ? ChatAndSelectedUser(user) : NewUserChatConversionStart({reciverId: user, senderId: userId})}
                  className="flex item-center border-b border-gray-300 py-8">
                  <div className="border border-blue-500 rounded-full h-[50px] w-[50px]">
                    <img src={avatar} alt="" className='h-[50px] w-[50px] rounded-full' />
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
  );
};

ChatList.propTypes = {
  avatar: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  chatCon: PropTypes.bool.isRequired,
  Conversion: PropTypes.array.isRequired,
  selectUserHandler: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
};

export default ChatList;
