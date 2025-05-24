
function changeTitle() {
    const title = document.querySelector("#mainTitle");
    title.innerHTML = 'innerHTML 연습 시작!';
}

function insertMessage() {
    const msg = document.querySelector("#messageBox");
    msg.innerHTML = "<b>공지사항:</b> 오늘은 점검이 있습니다.";
}

function clearContent() {
    const contentArea = document.querySelector("#contentArea");
    contentArea.innerHTML = "";
}

function addFruit() {
    const fruitList = document.querySelector("#fruitList");    
    const newFruit = document.createElement("li");
    newFruit.innerHTML = "딸기";
    fruitList.appendChild(newFruit);
}

function replaceFruits() {
    const newFruits = ["키위", "수박", "체리", "복숭아", "파인애플", "망고", "자두", "귤"];
    const replaceFruits = document.querySelectorAll("#fruitList>li");
    replaceFruits.forEach((e, index) => {
        e.innerHTML = newFruits[index];
    });
}
