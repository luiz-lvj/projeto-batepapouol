function showOnlineUsers(){
    let onlineUsers = document.querySelector(".online-users");
    if(onlineUsers.classList.contains("hide")){
        console.log(onlineUsers);
        onlineUsers.classList.remove("hide");
    }
    console.log(onlineUsers);
}

function backToChat(){
    let onlineUsers = document.querySelector(".online-users");
    onlineUsers.classList.add("hide");
}

function setPrivacity(obj){
    let brotherPrivacity;
    if(obj.classList.contains("send-public-message")){
        privateMessage = false;

        let iconCheckChildren = obj.querySelector(".right-side-privacity");
        iconCheckChildren = iconCheckChildren.querySelector(".choosen-privacity");
        if(iconCheckChildren.classList.contains("hide")){
            iconCheckChildren.classList.remove("hide");
        }
        brotherPrivacity = "send-private-message";
    }
    else if(obj.classList.contains("send-private-message")){
        privateMessage = true;
        
        let iconCheckChildren = obj.querySelector(".right-side-privacity");
        iconCheckChildren = iconCheckChildren.querySelector(".choosen-privacity");
        if(iconCheckChildren.classList.contains("hide")){
            iconCheckChildren.classList.remove("hide");
        }
        brotherPrivacity = "send-public-message";
    }
    brotherPrivacity = "." + brotherPrivacity;
    let brotherPrivacityItem = document.querySelector(brotherPrivacity);
    brotherPrivacityItem = brotherPrivacityItem.querySelector(".right-side-privacity");
    brotherPrivacityItem = brotherPrivacityItem.querySelector(".choosen-privacity");
    if(!brotherPrivacityItem.classList.contains("hide")){
        brotherPrivacityItem.classList.add("hide");
    }
}
function logoutUser(){
    backToChat();
    restartHomePage();
}
