const STATUS_CODE_OK = 200;
const STATUS_CODE_BADREQUEST = 400;
let myUserName;
let keepLoggedInterval = null;
let keepChatInterval = null;

function loginUser(){
    myUserName = document.querySelector(".input-username").value;
    let data = {name: myUserName};
    const loginPromise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", data);

    loginPromise.then(()=>{
        allowChat();
        keepLoggedInterval = setInterval(keepLogged, 5000);
    });
    loginPromise.catch(failInitialLogin);

    loadingPage();
}
function keepLogged(){
    let data = {name: myUserName};
    let loginPromise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/status", data);
    loginPromise.then(()=>{
        return;
    });
    loginPromise.catch(failKeepLogin);
}

function allowChat(){
    let loginPage = document.querySelector(".login-page");
    loginPage.classList.add("logged");
    loadChat();
}

function loadChat(){
    const chatPromise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    
    chatPromise.then((response)=>{
        keepChatInterval = setInterval(()=>{
            loadMessages(response.data);
            keepChat();
        }, 3000);
    });
    chatPromise.catch(failLoadInitialChat);
}

function keepChat(){
    const chatPromise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/messages");
    chatPromise.then((response)=>{
        loadMessages(response.data);
    });
    chatPromise.catch(failKeepChat);
}
function loadMessages(vectorMessages){
    let chat = document.querySelector(".chat");
    chat.innerHTML = "";
    for(let objMessage of vectorMessages){
        if(objMessage.type === "status"){
            chat.innerHTML += createStatusMessage(objMessage);
        }
        else if (objMessage.type === "message"){
            chat.innerHTML += createPublicMessage(objMessage);
        }
        else if(objMessage.type === "private_message" && objMessage.to === myUserName){
            chat.innerHTML += createPublicMessage(objMessage);
        }
    }
    const lastMessage = document.querySelector(".chat").lastChild;
    lastMessage.scrollIntoView();
}
function createStatusMessage(obj){
    const liMessage = `<li class="message status">
        <p class="message-text"><span class="message-time">(${obj.time}) </span><span class="username-text">${obj.from} </span>${obj.text}</p>
    </li>`;
    return liMessage;
}
function createPublicMessage(obj){
    const liMessage = `<li class="message normal">
        <p class="message-text"><span class="message-time">(${obj.time}) </span><span class="username-text">${obj.from} </span>para <span class="username-text">${obj.to} </span>: ${obj.text}</p>
    </li>`;
    return liMessage;
}
function createPrivateMessage(obj){
    const liMessage = `<li class="message normal">
        <p class="message-text"><span class="message-time">(${obj.time}) </span><span class="username-text">${obj.from} </span>para <span class="username-text">${obj.to} </span>: ${obj.text}</p>
    </li>`;
    return liMessage;
}
function failLoadInitialChat(){
    alert("Não foi possível carregar suas mensagens\nTente logar-se novamente");
    restartHomePage();
}
function failKeepChat(){
    alert("Não foi possível recuperar suas mensagens\nTente logar-se novamente");
    restartHomePage();
}

function loadingPage(){
    let inputUserName = document.querySelector(".input-username");
    let buttonLogin = document.querySelector(".button-login");

    inputUserName.classList.add("hide");
    buttonLogin.classList.add("hide");

    let loadingImg = document.querySelector(".loading-img");
    let loadingTxt = document.querySelector(".loading-text");

    if(loadingImg.classList.contains("hide")){
        loadingImg.classList.remove("hide");
    }
    if(loadingTxt.classList.contains("hide")){
        loadingTxt.classList.remove("hide");
    }
}

function failInitialLogin(){
    alert("Não foi possível logar '-'\nTente novamente");
    restartHomePage();
}

function failKeepLogin(){
    alert("Não foi possível manter sua conexão\nTente se logar novamente");
    restartHomePage();
}

function restartHomePage(){
    if(keepLoggedInterval){
        clearInterval(keepLoggedInterval);
    }
    
    if(keepChatInterval){
        clearInterval(keepChatInterval);
    }
    let loginPage = document.querySelector(".login-page");
    if (loginPage.classList.contains("logged")){
        loginPage.classList.remove("logged");
    }

    let inputUserName = document.querySelector(".input-username");
    let buttonLogin = document.querySelector(".button-login");

    if(inputUserName.classList.contains("hide")){
        inputUserName.value = "";
        inputUserName.classList.remove("hide");
    }
    if(buttonLogin.classList.contains("hide")){
        buttonLogin.classList.toggle("hide");
    }

    let loadingImg = document.querySelector(".loading-img");
    let loadingTxt = document.querySelector(".loading-text");
    
    loadingImg.classList.add("hide");
    loadingTxt.classList.add("hide");
}
