$(document).ready(() => {

    // global api key and host/endpoint
    const hostEndpoint = 'https:/api.nytimes.com/svc/search/v2/articlesearch.json?';
    const apiKey = 'api-key=j5A2TiUA2OfdQtG6PM6GZYsUhsBMKy7a';


    // build full url for api call
    // need to grab user input from search-term, article-number, start-year, end-year
    // conditional logic for optional start-year and end-year data
    // concatenate 0101 to start year and 1231 to end year to fit api format
    // return full url
    function getFullUrl() {
        const userSearch = $('#search-term').val();
        const qSearch = 'q=' + userSearch;

        let fullUrl = `${hostEndpoint}${apiKey}&${qSearch}`;

        if ($('#start-year').val()) {
            const userStartYear = $('#start-year').val();
            fullUrl += `&begin_date=${userStartYear}0101`
        }

        if ($('#end-year').val()) {
            const userEndYear = $('#end-year').val();
            fullUrl += `&end_date=${userEndYear}1231`
        }
        
        return fullUrl;
    }

    // render articles from json response
    // grab #article-bin and append article using bootstrap formatting
    // input will be response.response.docs array element
    // passed test
    function renderArticle(element, index) {

        // need to lowercase all text before capitalizing with css later
        element.headline.main = element.headline.main.toLowerCase();

        // need to filter by null bylines 
        if (element.byline.original) {
            // if byline in all caps, need to lower case
            element.byline.original = element.byline.original.toLowerCase();
            
            $('#article-bin').append(`

                <blockquote class="blockquote py-3 pl-3">
                    <span>${index + 1}</span>
                    
                    <a href=${element.web_url} class="article-anchor"
                    target="_blank">
                    
                        <p class="article-title">${element.headline.main}</p>
                    
                    </a>
                    
                    <footer class="blockquote-footer">${element.byline.original}</footer>

                    <p class="section-name">Section: ${element.section_name}</p>
                </blockquote>

            `)

        } else {

            // if null byline then want to remove the footer
            $('#article-bin').append(`

                <blockquote class="blockquote py-3 pl-3">
                    <span>${index + 1}</span>
                    
                    <a href=${element.web_url} class="article-anchor"
                    target="_blank">
                    
                        <p class="article-title">${element.headline.main}</p>
                    
                    </a>
                    
                    <p class="section-name">Section: ${element.section_name}</p>
                </blockquote>

            `)
        }
    }

    // run api call when search button clicked
    // button type is submit so need to prevent page from refreshing
    // passed test
    function searchClick() {
        event.preventDefault();

        // need to auto clear article bin to format properly
        $("#article-bin").empty();

        const fullUrl = getFullUrl();

        // if user inputted some text for search term, then run api call
        if ($("#search-term").val()) {
            $.ajax({
                url: fullUrl,
                method: 'GET'
            })
            .then(response => {
                console.log(response);

                const articleNum = $('#article-number').val();

                // loop through function that renders article info
                // loop until hit the user specified article number
                for (let i = 0; i < articleNum; i++) {
                    renderArticle(response.response.docs[i], i)
                }

            })
        }

        // auto clear search parameters form?
        // $('#search-term').val("");
        // $('#start-year').val("");
        // $('#end-year').val("");

    }

    // clear results button callback function
    // blank out search form with .val("")
    // empty #article-bin div
    // passed test
    function clearResultsClick() {
        event.preventDefault();

        $('#search-term').val("");
        $('#start-year').val("");
        $('#end-year').val("");

        $("#article-bin").empty();
    }

    // register search click event
    $("#search-button").on('click', searchClick);

    // register clear results click event
    $('#clear-button').on('click', clearResultsClick);

})