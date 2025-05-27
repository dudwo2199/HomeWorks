String.prototype.isEmpty = function () {
    return this.length === 0 || !this.trim();
}

function toDateString(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getSerial(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;
    second = second >= 10 ? second : '0' + second;

    return date.getFullYear() + month + day + hour + minute + second;
}

function Book() {
    this.serial = null;
    this.regDate = null;
    this.title = null;
    this.author = null;
    this.price = null;
    this.publishDate = null;
}

const bookArray = [];
let seq_book = 0;

onload = () => {
    clearRow();

    const parseSEQ = localStorage.getItem("SEQ_BOOK");
    seq_book = parseSEQ === null ? 0 : parseInt(parseSEQ);

    const parseBookArray = localStorage.getItem("bookArray");
    if (parseBookArray !== null) {
        const bookList = JSON.parse(parseBookArray);
        bookList.forEach(book => {
            const newBook = new Book();
            newBook.serial = book.serial;
            newBook.regDate = new Date(book.regDate);
            newBook.title = book.title;
            newBook.author = book.author;
            newBook.price = book.price;
            newBook.publishDate = new Date(book.publishDate);
            addRow(newBook);
            bookArray.push(newBook);
        });
        totalRow.innerHTML = `<td colspan="6">총 ${bookArray.length}권의 도서가 등록되어 있습니다.</td>`;
    }
    else{
        totalRow.innerHTML = `<td colspan="6">등록된 도서가 없습니다.</td>`;
    }
}

const modal = document.querySelector('.modal');
const tableBody = document.querySelector('.tableBody');
const totalRow = document.querySelector('.total-row');

window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    if (modal.style.visibility == "hidden") return;

    modal.style.visibility = "hidden";
});

document.querySelector(".doModal").addEventListener("click", () => {
    modal.style.visibility = "visible";

    modalSerial.value = `${getSerial(new Date()) + (seq_book + 1)}`;
    modalRegDate.value = toDateString(new Date());
    modalTitle.value = "";
    modalAuthor.value = "";
    modalPrice.value = "";
    modalPublishDate.value = null;
});

tableBody.addEventListener("click", (e) => {
    const tr = e.target.closest("tr.highlight");
    if (tr) {
        if (tr.classList.contains("select")) {
            tr.classList.remove("select");

            if (tr.lastElementChild && tr.lastElementChild.classList.contains("delete-row")) {
                tr.removeChild(tr.lastElementChild);
            }
        } else {
            tr.classList.add("select");
            const td = document.createElement("td");
            td.className = "delete-row";
            td.innerHTML = `<button onclick="deleteRow(${tr.firstElementChild.textContent})">삭제</button>`;
            tr.appendChild(td);
        }
    }
});

function modalClose() {
    modal.style.visibility = "hidden";
}

function clearRow() {
    tableBody.innerHTML = "";
}

function addRow(book) {
    const tr = document.createElement("tr");
    tr.classList.add("highlight");
    tr.innerHTML = `
        <td class='cell'>${book.serial}</td>
        <td class='cell'>${toDateString(book.regDate)}</td>
        <td class='cell'>${book.title}</td>
        <td class='cell'>${book.author}</td>
        <td class='cell'>${book.price.toLocaleString()}원</td>
        <td class='cell'>${toDateString(book.publishDate)}</td>
        
    `;
    tableBody.appendChild(tr);
}

function deleteRow(serial) {
    const index = bookArray.findIndex(book => String(book.serial) === String(serial));
    
    if (index === -1) 
        return;

    if (confirm("정말로 삭제하시겠습니까?")) {
        bookArray.splice(index, 1);
        clearRow();
        bookArray.forEach(book => addRow(book));
        localStorage.setItem("bookArray", JSON.stringify(bookArray));

        totalRow.innerHTML = `<td colspan="6">총 ${bookArray.length}권의 도서가 등록되어 있습니다.</td>`;
    }
}

const modalSerial = document.querySelector("form>input[name='serial']");
const modalRegDate = document.querySelector("form>input[name='regDate']");
const modalTitle = document.querySelector("form>input[name='title']");
const modalAuthor = document.querySelector("form>input[name='author']");
const modalPrice = document.querySelector("form>input[name='price']");
const modalPublishDate = document.querySelector("form>input[name='publishDate']");

document.querySelector(".bookForm").onsubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const author = e.target.author.value;
    const price = parseInt(e.target.price.value);
    const publishDate = new Date(e.target.publishDate.value);

    if (title.isEmpty() || author.isEmpty() || isNaN(price) || publishDate.toString() === "Invalid Date") {
        alert("모든 필드를 올바르게 입력해주세요.");
        return;
    }

    const book = new Book();
    book.serial = getSerial(new Date()) + seq_book++;
    book.regDate = new Date(modalRegDate.value);
    book.title = title;
    book.author = author;
    book.price = price;
    book.publishDate = publishDate;

    addRow(book);
    bookArray.push(book);

    localStorage.setItem("SEQ_BOOK", seq_book);
    localStorage.setItem("bookArray", JSON.stringify(bookArray));

    totalRow.innerHTML = `<td colspan="6">총 ${bookArray.length}권의 도서가 등록되어 있습니다.</td>`;

    modalClose();
}
