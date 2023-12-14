// script.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqvMuU-X6bUL8WziX-9GQi8h7BOk9IncA",
  authDomain: "commerce-a298d.firebaseapp.com",
  projectId: "commerce-a298d",
  storageBucket: "commerce-a298d.appspot.com",
  messagingSenderId: "846115709002",
  appId: "1:846115709002:web:d8db92d178186531ce06b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getbtn = document.getElementById('getbtn');
const chatInput = document.querySelector(".chat-input textarea"); // Add this line to select chatInput

function createChatLi(message, className) {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `<p>${message}</p>`
      : `<div class="chat-flex"><span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi;
}

function scrollToBottom() {
  const chatbox = document.querySelector(".chatbox");
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function fetchDataAndDisplay() {
  const userQuestion = chatInput.value.trim(); // Read user input
  if (!userQuestion) return;

  const id = ['41wUxM646z8yL1EtGGGc', 'BtCfal2Av0KCy52DijRn', 'MbZy2HDErVbZY8rP3uX0', 'OiTBTYbUl9tcdlswS0Op', 'X3kiSBlm1YjzUZjNfZVm', 'dPEOUN4ZCSUNXaW06d1V', 'jIVFOo7dskt64eBBlLvv', 'nqJFMJtovZuXvdNtwfV0', 'vAykKTD1Du3iZvIWJOs7'];

  for (let i = 0; i < id.length; i++) {
    const docSnap = await getDoc(doc(db, 'Questions', id[i]));

    if (docSnap.exists() && docSnap.data()['question'] === userQuestion) {
      const answer = docSnap.data()['answer'];
      const chatbox = document.querySelector(".chatbox");
      const chatLi = createChatLi(answer, "incoming");
      chatbox.appendChild(chatLi);
      scrollToBottom();
      break;  // Exit the loop after finding the first match
    }
  }

  // Clear the input after processing
  chatInput.value = "";
}

// Call fetchDataAndDisplay when the button is clicked
getbtn.addEventListener('click', fetchDataAndDisplay);
