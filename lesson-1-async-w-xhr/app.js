

let searchedForText = 'hippos';
let responseContainer = '';
const unsplash_access_key = '';
const nytimes_api_key = '';

(function () {

    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    searchedForText = 'hippos';
    responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID ' + unsplash_access_key);
        unsplashRequest.send();

        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=` + nytimes_api_key);
        articleRequest.send();

    });


})();

function addImage(data) {
    let htmlContent = '';
    let images = JSON.parse(this.responseText);

    for (key in images)
    {
        console.log('images[' + key + ']=' + (images[key]));
    }

    if (images && images.results && images.results[0])
    {
        const firstImage = images.results[0];

        htmlContent = `<figure>
            <img src="${firstImage.urls.regular}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`;
    }
    else
    {
        htmlContent = '<div class="error-no-image">No images available</div>';
    }

    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}

function addArticles(data) {
    let htmlContent = '';
    let articles = JSON.parse(this.responseText);

    for (key in articles)
    {
        console.log('articles[' + key + ']=' + (articles[key]));
    }

    if (articles.response && articles.response.docs && articles.response.docs.length > 1)
    {
        htmlContent = '<ul>' + articles.response.docs.map(article => `<li class="article">
            <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
            <p>${article.snippet}</p>
            </li>
        `).join('') + '</ul>';
    }
    else
    {
        htmlContent = '<div class="error-no-articles">No articles available</div>';
    }
    responseContainer.insertAdjacentHTML('beforeend', htmlContent);
}