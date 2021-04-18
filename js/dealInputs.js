document.querySelector(".input-username").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        loginUser();
    }
});

document.querySelector(".input-message").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage(){
    let inputMessage = document.querySelector(".input-message");
    let strInput = inputMessage.value;
    inputMessage.value = "";
    strInput = strInput.trim();
    if(strInput === ""){
        return;
    }
    data = {
        from: myUserName,
        to: "Todos",
        text: strInput,
        type: "message"
    };
    const sendPromise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages", data);
    sendPromise.then(keepChat);
    sendPromise.catch(()=>{
        alert("Não foi possível enviar a mensagem\nTente novamente");
    });
}