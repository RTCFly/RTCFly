import { Container } from "inversify";
import { TYPES } from "../entites/types";
import { IUserAgent, IMessenger, IWebClient IIPService, IRTCService } from "./interfaces";
import { SipMessenger } from '../messenger';


const myContainer = new Container();
myContainer.bind<SipMessenger>(TYPES.Messenger).to(UserAgent);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

export { myContainer };