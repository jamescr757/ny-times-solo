$(document).ready(() => {

    // global api key 
    const hostEndpoint = 'https:/api.nytimes.com/svc/search/v2/articlesearch.json?';
    const apiKey = 'api-key=j5A2TiUA2OfdQtG6PM6GZYsUhsBMKy7a';
    const qSearch = 'q=roosevelt';
    const fullUrl = `${hostEndpoint}${apiKey}&${qSearch}`;
    const limit = '5';

    $.ajax({
        url: fullUrl,
        method: 'GET'
    })
    .then(response => {
        console.log(response);

        for (let i = 0; i < limit; i++) {

            // console.log(response.response.docs[i].byline.original);
            // console.log(response.response.docs[i].headline.main);
            // console.log(response.response.docs[i].web_url);

            $('#article-bin').append(`
                <blockquote class="blockquote py-3 pl-3">
                    <span>${i + 1}</span>
                    <a href=${response.response.docs[i].web_url} class="article-anchor"
                    target="_blank">

                    <p class="article-title">${response.response.docs[i].headline.main}</p>
                    
                    </a>
                    <footer class="blockquote-footer">${response.response.docs[i].byline.original}</footer>
                    </blockquote>
                    `)
                }
                
                // <a href=${response.response.docs[i].web_url} class="article-anchor" target="_blank">Read article</a>
    })


})