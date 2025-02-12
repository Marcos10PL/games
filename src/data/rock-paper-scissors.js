import { faHandRock, faHandPaper, faHandScissors } from '@fortawesome/free-solid-svg-icons';

export const ROCK = 'rock';
export const PAPER = 'paper'; 
export const SCISSORS = 'scissors';

export const ICONS = 
[
  { id: ROCK, icon: faHandRock, color: "", rotation: 0 },
  { id: PAPER, icon: faHandPaper, color: "", rotation: 0 },
  { id: SCISSORS, icon: faHandScissors, color: "", rotation: 90 },
]

export const LIMITS = {'1': 1, '3': 3, '6': 6}; 