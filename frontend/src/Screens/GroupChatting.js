import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageInputSmall, VirtualizedMessageList, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

const chatClient = StreamChat.getInstance('dz5f4d5kzrue');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoicHJvdWQtcmFpbi02IiwiZXhwIjoxNjM2MzY2NDU3fQ.c7CKmoYbM2akS-g7ZJngxie1vPURbhvEPlkCASSPWcc';

chatClient.connectUser(
  {
    id: 'proud-rain-6',
    name: 'proud',
    image: 'https://getstream.io/random_png/?id=proud-rain-6&name=proud',
  },
  userToken,
);

const channel = chatClient.channel('livestream', 'space', {
  image: 'https://goo.gl/Zefkbx',
  name: 'SpaceX launch discussion',
});

const appp = () => (
  <Chat client={chatClient} theme='livestream dark'>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader live />
        <VirtualizedMessageList />
        <MessageInput Input={MessageInputSmall} focus />
      </Window>
    </Channel>
  </Chat>
);

export default appp;
