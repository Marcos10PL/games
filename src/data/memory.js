import { v4 as uuidv4 } from 'uuid';
import { faUser, faCog, faHeart, faHome, faEnvelope, faBell, faCamera, faCar, faBook, faBriefcase, faGlobe, faMusic, faMap, faPhone, faStar, faTree, faGift, faWifi } from '@fortawesome/free-solid-svg-icons';

const cards = 
[
  { id: uuidv4(), icon: faUser, color: "#FF5733" },
  { id: uuidv4(), icon: faCog, color: "#33FF57" },
  { id: uuidv4(), icon: faHeart, color: "#FF33A8" },
  { id: uuidv4(), icon: faHome, color: "#33A8FF" },
  { id: uuidv4(), icon: faEnvelope, color: "#FFD700" },
  { id: uuidv4(), icon: faBell, color: "#FF4500" },
  { id: uuidv4(), icon: faCamera, color: "#8A2BE2" },
  { id: uuidv4(), icon: faCar, color: "#228B22" },
  { id: uuidv4(), icon: faBook, color: "#800080" },
  { id: uuidv4(), icon: faBriefcase, color: "#DC143C" },
  { id: uuidv4(), icon: faGlobe, color: "#00BFFF" },
  { id: uuidv4(), icon: faMusic, color: "#FF69B4" },
  { id: uuidv4(), icon: faMap, color: "#32CD32" },
  { id: uuidv4(), icon: faPhone, color: "#FFA500" },
  { id: uuidv4(), icon: faStar, color: "#FFD700" },
  { id: uuidv4(), icon: faTree, color: "#228B22" },
  { id: uuidv4(), icon: faGift, color: "#FF6347" },
  { id: uuidv4(), icon: faWifi, color: "#1E90FF" }
];

export const CARDS = num =>
{
  let cardsArr = [];
  for (let i = 0; i < num; i++) 
    cardsArr.push(cards[i]);
  
  return cardsArr;
} 

export const NUMBER_OF_CARDS = {'12': 12, '24': 24, '36': 36}