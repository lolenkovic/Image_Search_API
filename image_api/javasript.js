document.addEventListener("DOMContentLoaded", function() {
    const loaderContainer = document.querySelector('.loader-container');

    setTimeout(() => {
        loaderContainer.classList.add('hide');
        
        loaderContainer.addEventListener('transitionend', function() {
            loaderContainer.remove();
        });
    }, 1200);
});



const accesskey = "ueLDlqECyaOMiHANelw45jpgBlNusEIVidabdag9wrg";

const formel = document.querySelector("form");
const inputel = document.getElementById("search-input");
const searchresults = document.querySelector(".search-results");
const showmore = document.getElementById("show-more-button");

let inputdata = "";
let page = 1;


async function searchimages()
{
    inputdata = inputel.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    if(page === 1)
    {
        searchresults.innerHTML = "";
    }
    results.map((result) =>{
        const imagewrap = document.createElement('div');
        imagewrap.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imagelink = document.createElement('a');
        imagelink.href = result.links.html;
        imagelink.target = "";
        imagelink.textContent = result.alt_description;

        imagewrap.appendChild(image);
        imagewrap.appendChild(imagelink);
        searchresults.appendChild(imagewrap);
    });

    page++;
    if(page > 1)
    {
        showmore.style.display = "block";
    }
}

formel.addEventListener("submit", (event) =>
{
    event.preventDefault();
    page = 1;
    searchimages();
})

showmore.addEventListener("click", () =>
{
    searchimages();
});

