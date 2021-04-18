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