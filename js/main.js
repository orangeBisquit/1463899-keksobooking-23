import {getAds} from './data.js';
import {createCard, renderCard} from './render-card.js';
import {disablePage, enablePage} from './page-state.js';
import './form.js';

const myAds = getAds();

renderCard(createCard(myAds[0]));

window.addEventListener('load', disablePage);
window.addEventListener('load', enablePage);


