
function addQuote(quote, speaker, id) {
    const container = document.getElementById("quotecontainer");

    // make div
    const div = document.createElement("div");
    container.appendChild(div);
    div.className = "quote";

    // make/append quote
    const q = document.createElement("q");
    const quoteNode = document.createTextNode(quote);
    q.appendChild(quoteNode);
    div.appendChild(q);

    // make/append speaker
    const h1 = document.createElement("h1");
    const speakerNode = document.createTextNode("- " + speaker);
    h1.appendChild(speakerNode);
    div.appendChild(h1);

    // make/append ID
    const p = document.createElement("p");
    const idNode = document.createTextNode("#" + id);
    p.appendChild(idNode);
    div.appendChild(p);
};

let quotesArray;
function loadQuotes() {
    fetch("quotes.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            quotesArray = Array.from(data);
        })
        .catch(error => {
            console.error(error);
        });
};

function displayQuotes(mode) {
    // fixes async function
    if (!quotesArray) {
        loadQuotes();
        setTimeout(() => displayQuotes(mode), 50);
        return;
    }

    clearQuotes();

    switch (mode) {
        case "normal":
            quotesArray.forEach(quote => {
                addQuote(quote.quote,  quote.speaker, quote.id);
            });
            break;
        case "reverse":
            const quotesReverse = Array.from(quotesArray).reverse();
            quotesReverse.forEach(quote => {
                addQuote(quote.quote,  quote.speaker, quote.id);
            });
        break;
        case "random":
            const quotesRandom = Array.from(quotesArray).sort(() => Math.random() - 0.5);
            quotesRandom.forEach(quote => {
                addQuote(quote.quote,  quote.speaker, quote.id);
            });
        break;
        case "filter":
            filteredArray.forEach(quote => {
                addQuote(quote.quote,  quote.speaker, quote.id);
            })
            break;
        case "known":
            quotesArray.forEach(quote => {
                if (quote.known === true) {
                    addQuote(quote.quote,  quote.speaker, quote.id);
                }
            })
            break;
        case "unknown":
            quotesArray.forEach(quote => {
                if (quote.known === false) {
                    addQuote(quote.quote,  quote.speaker, quote.id);
                }
            })
            break;

    }
}

let filteredArray = [];
function filterQuotes() {
    filter = document.getElementById("search").value;
    filterby = document.getElementById("searchby").value;
    filteredArray = [];

    switch (filterby) {
        case "id":
            quotesArray.forEach(quote => {
                if (quote.id == filter) {
                    filteredArray.push(quote);
                }
            })
        break;
        case "content":
            quotesArray.forEach(quote => {
                if (quote.quote.includes(filter)) {
                    filteredArray.push(quote);
                }
            })
        break;
        case "speaker":
            quotesArray.forEach(quote => {
                if (quote.speaker.includes(filter)) {
                    filteredArray.push(quote);
                }
            })
        break;
    }

    if (document.getElementById("search").value) {
        displayQuotes("filter");
    } else {
        displayQuotes("reverse");
    }

}

function loadListeners() {
    document.getElementById("ascending").addEventListener("click", () => displayQuotes("normal"));
    document.getElementById("decending").addEventListener("click", () => displayQuotes("reverse"));
    document.getElementById("random").addEventListener("click", () => displayQuotes("random"));
    
    document.getElementById("search").addEventListener("input", filterQuotes);

    document.getElementById("known").addEventListener("click", () => displayQuotes("known"));
    document.getElementById("unknown").addEventListener("click", () => displayQuotes("unknown"));
}


function clearQuotes() {
    document.getElementById("quotecontainer").innerHTML = "";
};

window.onload = function() {
    loadQuotes();
    displayQuotes("reverse");
    loadListeners();
};