import {getAds} from './data.js';
import {createCard, renderCard} from './render-card.js';
import {disablePage} from './page-state.js';

const myAds = getAds();

renderCard(createCard(myAds[0]));

window.addEventListener("load", disablePage);


