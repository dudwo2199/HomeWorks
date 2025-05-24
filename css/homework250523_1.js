onload = run();

function run() {
    console.log(`=====================`);
    console.log(`id="title"인 요소를 선택하여 콘솔창에 출력`);
    const title = document.querySelector("#title");
    console.log(title);

    console.log("=====================");
    console.log(`class="btn"인 요소를 모두 선택하여 콘솔창에 출력`);

    const btns = document.querySelectorAll(".btn");
    btns.forEach(e => {
        console.log(e);
    });

    console.log("=====================");
    console.log(`button 태그 중 첫 번째 버튼만 선택하여 콘솔창에 출력`);
    const firstBtn = document.querySelector("button");
    console.log(firstBtn);

    console.log("=====================");
    console.log(`모든 button 태그 선택하여 콘솔창에 출력`);
    const buttonAll = document.querySelectorAll("button");
    buttonAll.forEach(e => {
        console.log(e);
    });

    console.log("=====================");
    console.log(`#loginForm 안에 있는 input 태그들만 선택하여 콘솔창에 출력`);
    const loginformInputs = document.querySelectorAll("#loginForm input");
    loginformInputs.forEach(e => {
        console.log(e);
    });

    console.log("=====================");
    console.log(`name="userId" 속성을 가진 input 요소를 선택하여 콘솔창에 출력`);
    const userIdInput = document.querySelector("input[name='userId']");
    console.log(userIdInput);
    
}
