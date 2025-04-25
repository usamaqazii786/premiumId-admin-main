import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import productReducer from './slices/product';
import elementReducer from './slices/element';
import element1Reducer from './slices/element1';
import magictypeReducer from './slices/magictype';
import tagReducer from './slices/tag';
import mainhomeReducer from './slices/mainhome';
import projectReducer from './slices/project';
import whatwedoReducer from './slices/whatwedo';
import cardReducer from './slices/card';
import rarityReducer from './slices/rarity';
import spellReducer from './slices/spell';
import eventReducer from './slices/event';
import pressReducer from './slices/press';
import dynamicSectionPageReducer from './slices/dynamicSectionPage';
import homeourmissionReducer from './slices/homeourmission';
import faqReducer from './slices/faq';
import boxReducer from './slices/box';
import characterReducer from './slices/character';
import appointReducer from './slices/appoint';
import todayShadowReducer from './slices/todayShadow';
import slotReducer from './slices/slot';
import brandsectionReducer from './slices/brandsection';
import creviewReducer from './slices/creview';
import cProviderReducer from './slices/clinicProvider';
import DressCode from './slices/DressCode';
import RegistrationForm from './slices/RegistrationForm';
import CheckInfo from './slices/CheckInfo';

const rootPersistConfig = {
  key: 'root',
  storage,
  // keyPrefix: 'redux-',
  // whitelist: [],
};

const rootReducer = combineReducers({
  element: elementReducer,
  element1: element1Reducer,
  magictype: magictypeReducer,
  tag: tagReducer,
  brandsection: brandsectionReducer,
  card: cardReducer,
  rarity: rarityReducer,
  spell: spellReducer,
  mainhome: mainhomeReducer,
  project: projectReducer,
  whatwedo: whatwedoReducer,
  event: eventReducer,
  press: pressReducer,
  dynamicSectionPage: dynamicSectionPageReducer,
  homeourmission: homeourmissionReducer,
  faq: faqReducer,
  box: boxReducer,
  character: characterReducer,
  product: productReducer,
  appoint: appointReducer,
  todayShadow: todayShadowReducer,
  slot: slotReducer,
  creview: creviewReducer,
  cProvider: cProviderReducer,
  dresscode: DressCode,
  registrationForm: RegistrationForm,
  checkInfo: CheckInfo,
});

export { rootPersistConfig, rootReducer };
