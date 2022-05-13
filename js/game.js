/* function showKeybaord(e) {

}

showKeyboardButton = document.querySelector(".show-keyboard-button");
showKeyboardButton.addEventListener("click", ); 
 */


const availableSymbols = "йфяцычувскамеёпинртгоьшлбщдюзжхэъ";
let imageBox = document.querySelector("img");
let words = ["сапёр", "веник"]

function saveImg(blob) {
    let link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", `${Date.now()}`);
    link.click();
}

function Game() {
    this.attempts = {}

    this.getWord = function () {
        let loader = document.querySelector(".attempts__loader");
        loader.classList.toggle("--active");
        fetch("https://rebuskids.ru/all/reb", { "mode": "no-cors" })
            .then(response => { return response.text() }).then(function (html) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, "text/html");
                let publications = doc.querySelector("#publications");
                console.log(publications);
                let firstPublication = publications.querySelector(".exercise-card");
                let firstPublicationImageURL = 'rebuskids.ru/' + firstPublication.querySelector("img").src.split("/").splice(3).join("/");
                let firstPublicationText = firstPublication.querySelector(".task-rebus-right").innerHTML;
                console.log(firstPublicationImageURL)
                return fetch(firstPublicationImageURL, { "mode": "no-cors" }).then(response_object => response_object.json())
                .then(response_j => {imageBox.src = response_j.file})
        })

    }

    this.getWord();
}


function Keyboard(event) {
    this.sendSymbol = function () {

    }

    this.keyHandler = function (event) {
        availableSymbols.includes(event.key) === true ? this.sendSymbol(event.key) : NaN;
    }

    this.startHandling = function () {
        document.addEventListener('keyup', this.keyHandler);
    }

    this.startHandling();

}



keyboard = new Keyboard();
game = new Game(); 
