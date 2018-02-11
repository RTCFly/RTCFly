
import services from './services';

import ClientCore from './client';
import Server from './server';


import {MessageType, Message, MessageDirection} from './entities/Message';
import VideoWrapper from './entities/VideoWrapper';
import DataChannel from './DataChannel';
const entities = {
  VideoWrapper,
  DataChannel,
  MessageType,
  Message,
  MessageDirection
};

const client = settings => new ClientCore(settings, services(), entities);
//const server = (handler) => Server(handler);

export {
    client,
  //  server,
    Message,
    MessageDirection,
    MessageType
};

