const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function createMessageElement(text, sender) {
  const timestamp = new Date().toLocaleTimeString();
  const message = document.createElement("div");
  message.classList.add("message", sender, "fade-in");
  message.innerHTML = `
    <p>${text}</p>
    <span class="timestamp">${timestamp}</span>
  `;
  chatBox.appendChild(message);
  setTimeout(() => message.classList.add("show"), 100);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  createMessageElement(userMessage, "user");
  userInput.value = "";

  // Placeholder while fetching response
  const placeholder = createMessageElement("Fetching response...", "bot");

  try {
    const response = await axios.get(`https://kaiz-apis.gleeze.com/api/claude-sonnet-3.5?q=${userMessage}&uid=08062005`);
    placeholder.innerHTML = `
      <p>${response.data.response}</p>
      <span class="timestamp">${new Date().toLocaleTimeString()}</span>
    `;
  } catch (error) {
    placeholder.innerHTML = `
      <p>Error fetching response. Try again later.</p>
      <span class="timestamp">${new Date().toLocaleTimeString()}</span>
    `;
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
