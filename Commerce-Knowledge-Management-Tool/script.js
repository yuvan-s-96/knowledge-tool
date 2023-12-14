//const db = firebase.firestore();

const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<div class="chat-flex"><span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

const generateResponse = (chatElement) => {
  const messageElement = chatElement.querySelector("p");
  const chat = chatElement.querySelector(".chat-flex");
  const container = document.createElement("div");
  container.classList.add("chat-replay");

  const lowerCaseMessage = userMessage.toLowerCase();

  if (lowerCaseMessage.includes("commerce")) {
    messageElement.textContent =
      "I see you mentioned the word 'Commerce.' How can I assist you with that?";

    // Button data
    const buttonData = [
      {
        text: "FREE TRADE AGREEMENT",
        message: "Tell me about Free Trade Agreement."
      },
      {
        text: "INDIA-ASEAN TRADE IN GOODS AGREEMENT",
        message: "I want to know about Indian-Asean Trade In Goods Agreement.",
      },
      {
        text: "INDIA MALAYSIA CECA",
        message: "I need to details about India Malaysia CECA.",
      },
      {
        text: "INDIA SINGAPORE CECA",
        message: "I need to details about India Singapore CECA."
      },
      {
        text: "INDIA-SRI-LANKA FTA",
        message: "Tell me about India-Srilanka FTA."
      },
      {
        text: "INDIA KOREA CEPA",
        message: "I want to know about India Korea CEPA."
      }
    ];

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create buttons dynamically
    buttonData.forEach((buttonInfo) => {
      const button = document.createElement("button");
      button.textContent = buttonInfo.text;
      button.classList.add("btn");
      button.addEventListener("click", () => {
        chatInput.value = buttonInfo.message;
        handleChat();
      });
      buttonContainer.appendChild(button);
    });

    // Append buttons below the text content
    // chat.appendChild(messageElement);
    // chatElement.appendChild();
    container.append(chat);
    container.append(buttonContainer);
    chatElement.appendChild(container);
  } else {
    messageElement.textContent =
      "Clearly explain the Problem";
  }
};

const scrollToBottom = () => {
  chatbox.scrollTop = chatbox.scrollHeight;
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));

  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(incomingChatLi);
    generateResponse(incomingChatLi);
    scrollToBottom(); // Scroll to bottom after adding new message
  }, 600);
};

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
