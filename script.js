


// SEARCH FUNCTION
const dataHTML = document.getElementById('data')

const submitSearch = document.getElementById("search-button")
submitSearch.addEventListener('click', (e) => {
    e.preventDefault()
    dataHTML.innerHTML = ``
    const searchValue = document.getElementById("search-input")
    console.log(searchValue.value)
    searchKey = searchValue.value

    getSearchAnime(searchKey)
})

const getSearchAnime = async (searchKey) => {
    const dataHTML = document.getElementById('data')
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchKey}&sfw`)
    const rawData = await response.json()
    const animeList = rawData.data

    animeList.map(anime => {
        // const genres = `
        // <div class="categories">
        //     <span class="category">${anime.genres[0].name}</span>
        //     <span class="category">${anime.genres[1].name}</span>
        // </div>
        // `
        dataHTML.innerHTML += `
        <div class="results__card">
            <a href="${anime.url}" target="_blank" id="card-link"><img src="${anime.images.jpg.image_url}" class="card__image"></a>
            

            <div class="card__info">
                <div class="card__description">
                    <p class="description--title"><b>${anime.title}</b></p>
                    <p class="description--reviews">
                        <i class='bx bxs-star' ></i>
                        <i class='bx bxs-star' ></i>
                        <i class='bx bxs-star' ></i>
                        <i class='bx bxs-star' ></i>
                        <i class='bx bxs-star' ></i>
                    </p>
                </div>
            </div>
        </div>
        `
    })   
}

// FROM START, SUGGEST TOP ANIME

const getTopAnime = async () => {
    const dataHTML = document.getElementById('data')
    dataHTML.innerHTML = ``
    const response = await fetch('https://api.jikan.moe/v4/top/anime');
    const rawData = await response.json(); //extract JSON from the http response
    const animeList = rawData.data;
    console.log(animeList)

    animeList.map(anime => {
        console.log(anime)
        const genres = `
            <div class="categories">
                <span class="category">${anime.genres[0].name}</span>
                <span class="category">${anime.genres[1].name}</span>
            </div>
        `
        dataHTML.innerHTML += `
        <div class="results__card">
            <a href="${anime.url}" target="_blank" id="card-link"><img src="${anime.images.jpg.image_url}" class="card__image"></a>
            ${genres}

            <div class="card__info">
                <div class="card__description">
                    <p class="description--title"><b>${anime.title}</b></p>
                    <p class="description--reviews">
                        <i class='bx bxs-star' ></i>
                        <i class='bx bxs-star' ></i>
                        <i class='bx bxs-star' ></i>
                        <i class='bx bxs-star' ></i>
                        <i class='bx bxs-star' ></i>
                    </p>
                </div>
            </div>
        </div>
        `
    })
}

getTopAnime()

// HOME Click
const homeBtn = document.getElementById("home")
homeBtn.addEventListener("click", getTopAnime)

// GET POPULAR REVIEWS
const popularBtn = document.getElementById("popular")
popularBtn.addEventListener("click", getRecommendedAnimes)

function getRecommendedAnimes () {
    dataHTML.innerHTML = ``

    fetch("https://api.jikan.moe/v4/recommendations/anime")
        .then(response => {
            return response.json()
        })
        .then(data => {
            const results = data.data
            animeList = results.slice(0, 20)
            console.log(animeList)
            animeList.map(anime => {
                console.log(anime.entry[0].title)
                dataHTML.innerHTML += `
                <div class="results__card">
                    <a href="${anime.entry[0].url}" target="_blank" id="card-link"><img src="${anime.entry[0].images.jpg.image_url}" class="card__image"></a>
        
                    <div class="card__info">
                        <div class="card__description">
                            <p class="description--title"><b>${anime.entry[0].title}</b></p>
                            <p class="description--reviews">
                                <i class='bx bxs-star' ></i>
                                <i class='bx bxs-star' ></i>
                                <i class='bx bxs-star' ></i>
                                <i class='bx bxs-star' ></i>
                                <i class='bx bxs-star' ></i>
                            </p>
                        </div>
                    </div>
                </div>
                `
            })
        })
}

// ABOUT MODAL
let modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");
let btn_open = document.getElementById("about");
let btn_close = document.querySelector(".close-modal");

function openModal() {
	modal.classList.remove("hidden")
	overlay.classList.remove("hidden")
}

function closeModal() {
	modal.classList.add("hidden")
	overlay.classList.add("hidden")
}

btn_open.addEventListener("click", openModal)
btn_close.addEventListener("click", closeModal)
document.addEventListener("keydown", (e) => {
	if (e.code === "Escape") {
		closeModal()
	}
})