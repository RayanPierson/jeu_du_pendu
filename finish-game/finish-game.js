function onInit(){
    const finishStatus = localStorage.getItem("finish-status");
    document.getElementById("win-or-lose").innerHTML =finishStatus;
}