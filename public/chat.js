const socket = io();

const user ={}
const MAX_MESSAGES = 20;  // Número máximo de mensajes a mostrar


Swal.fire({
  title: "Type your nickname",
  input: "text",
  inputValidator: nickname => (!nickname && "Type your nickname!"),
  allowOutsideClick: false,
}).then((obj)=>{
    user.name = obj.value
    document.querySelector("#name").innerHTML =obj.value
    socket.emit("user", user)
})

const newChat = document.querySelector("#text")
newChat.addEventListener("keyup", event=>{
    if(event.key === "Enter"){
        socket.emit("new chat", {name: user.name, message: newChat.value})
        newChat.value =""
    }
})

socket.on("all", data =>{
    // Mostrar solo los últimos 20 mensajes
  const recentMessages = data.slice(-MAX_MESSAGES);
  const messagesHTML = recentMessages.map(each => `
  <p><span class="fw-bold">${each.name} : </span>${each.message}</p>
`).join("");
document.querySelector("#chats").innerHTML = messagesHTML;
})