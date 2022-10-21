import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyATWnVH1CLGmNn_yoORinx0BtsPyX8R9h8",
  authDomain: "after-sale1.firebaseapp.com",
  projectId: "after-sale1",
  storageBucket: "after-sale1.appspot.com",
  messagingSenderId: "395470417682",
  appId: "1:395470417682:web:052b831f12f88e8c678dcb",
  measurementId: "G-K58ZZ95L8J"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);