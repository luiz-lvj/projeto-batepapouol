const STATUS_CODE_OK = 200;
const STATUS_CODE_BADREQUEST = 400;
let myUserName;
let keepLoggedInterval;

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
    clearInterval(keepLoggedInterval);
    let loginPage = document.querySelector(".login-page");
    if (loginPage.classList.contains("logged")){
        loginPage.classList.remove("logged");
    }
    console.log(loginPage);

    let inputUserName = document.querySelector(".input-username");
    console.log(inputUserName);
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
































/*function loginUser(){
    const userName = document.querySelector(".input-username");
    myUserName = userName.value;
    const data = {name: myUserName};
    const loginPromise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", data);
    loginPromise.then(()=>{
        allowChat();
        setInterval(keepLogged, 5000);
    });
    loginPromise.catch(()=>{
        alert("Não foi possível logar\nTente novamente");
        restartHomepage();
    });

    userName.classList.add("hide");
    const buttonLogin = document.querySelector(".button-login");
    buttonLogin.classList.add("hide");
    const loadingImg = document.querySelector(".loading-img");
    const loadingTxt = document.querySelector(".loading-text");
    if(loadingImg.classList.contains("hide") && loadingTxt.classList.contains("hide")){
        loadingImg.classList.remove("hide");
        loadingTxt.classList.remove("hide");
    }
}

function allowChat(){
    const loginPage = document.querySelector(".login-page");
    loginPage.classList.add("logged");
}
function keepLogged(){
    const data = {name: myUserName};
    console.log(data);
    const loginPromise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants", data);
    loginPromise.then(()=>{
        alert("Logou!");
    });
    loginPromise.catch((err)=>{
        logoutUser();
    });
}
function logoutUser(){
    alert("Você foi deslogado '-'\nLogue-se novamente")
    const loginPage = document.querySelector(".login-page");
    if(loginPage.classList.constains("logged")){
        loginPage.classList.remove("logged");
    }
    restartHomepage();
}
function restartHomepage(){
    const userName = document.querySelector(".input-username");
    if(userName.classList.constains("hide")){
        userName.classList.remove("hide");
    }
    const buttonLogin = document.querySelector(".button-login");
    if(buttonLogin.classList.constains("hide")){
        buttonLogin.classList.remove("hide");
    }
    const loadingImg = document.querySelector(".loading-img");
    const loadingTxt = document.querySelector(".loading-text");
    loadingImg.classList.add("hide");
    loadingTxt.classList.add("hide");
}*/