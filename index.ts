
import Services from './services';

import Client from './client';
import Server from './server';
import {MessageType, Message, MessageDirection} from './entities/Message';
import { MessagingClient } from './messaging-client';

const services = new Services();
const client = (settings) => new Client(settings, services, MessagingClient);
//const server = (handler) => Server(handler);
export {
    client,
  //  server,
    Message,
    MessageDirection,
    MessageType
};

