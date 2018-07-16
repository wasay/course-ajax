let searchedForText = 'hippos';
const unsplash_access_key = '';
const nytimes_api_key = '';

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    const responseContainer = document.querySelector('#response-container');
    let searchedForText;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // images
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Client-ID ' + unsplash_access_key);

        var myRequest = new Request(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);

        fetch(myRequest, {headers: myHeaders, mode: 'cors'})
        .then(response => response.json())
        .then(addImage)
        .catch(error => requestError(e, 'image'));

        // articles
        myRequest = new Request(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=` + nytimes_api_key);

        fetch(myRequest, {mode: 'cors'})
        .then(response => response.json())
        .then(addArticles)
        .catch(error => requestError(e, 'article'));
    });
})();


function addImage(images) {
    let htmlContent = '';
    const responseContainer = document.querySelector('#response-container');

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
        htmlContent = '<div class="error-no-image">Unfortunately, no image was returned for your search.</div>';
    }

    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}

function addArticles(articles) {
    let htmlContent = '';
    const responseContainer = document.querySelector('#response-container');

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

function requestError(e, part) {
    console.log(e);
    responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
}
