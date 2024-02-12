const sendChatBtn =document.querySelector('.chat-input span')
const chatInput =document.querySelector('.chat-input textarea')
const chatBox =document.querySelector('.chatbox')
const chatToggler =document.querySelector('.chatbot-toggler')
const chatClosePhone =document.querySelector('.close-btn')

let userMessage;
const API_KEY = "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";

const createChatLi = (message, className) => {
    console.log(message);
    // create a chat list element with passed message and className
    const chatLi = document.createElement('li')
    chatLi.classList.add("chat", className)
    let chatContent = className === "outgoing" ? `<p></p>`: `<p>$</p> <span>🧑‍🍳</span>`
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message
    return chatLi
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions"
    const messageElement = incomingChatLi.querySelector("p")
    const requestOptions = {
        method: "POST",
        headers: {
            "content-type" : "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }

    // Send a post request to API, and get response from API
    fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((err) => {
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatBox.scrollTo(0, chatBox.scrollHeight))
}
const handleChat = () => {
userMessage = chatInput.value.trim()
if(!userMessage) return;
chatInput.value = "";


// Append the user's message to the chatbox
chatBox.appendChild(createChatLi(userMessage, "outgoing"))
chatBox.scrollTo(0, chatBox.scrollHeight)

setTimeout(() => {
    const incomingChatLi = createChatLi("...", "incoming")
    chatBox.appendChild(incomingChatLi);
    chatBox.scrollTo(0, chatBox.scrollHeight)
    generateResponse(incomingChatLi)
    

}, 600)
}


chatInput.addEventListener("input", () => {
    chatInput.style.height = `${chatInput.scrollHeight}px`
    // chatInput.style.height = `${chatInput.scrollHeight}px`
})

chatToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"))
chatClosePhone.addEventListener("click", () => document.body.classList.remove("show-chatbot"))

sendChatBtn.addEventListener("click", handleChat)