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

}