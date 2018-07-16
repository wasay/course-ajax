Lesson 3: Ajax with Fetch

    fetch('http://example.com/movies.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      });

    2.2.1. Methods
        A method is a byte sequence that matches the method token production.
        
        A CORS-safelisted method is a method that is `GET`, `HEAD`, or `POST`.
        
        A forbidden method is a method that is a byte-case-insensitive match for `CONNECT`, 
        `TRACE`, or `TRACK`. [HTTPVERBSEC1], [HTTPVERBSEC2], [HTTPVERBSEC3]
        
        To normalize a method, if it is a byte-case-insensitive match for `DELETE`, `GET`, 
        `HEAD`, `OPTIONS`, `POST`, or `PUT`, byte-uppercase it.
    
    it is recommend that all methods are written in uppercase for consistency 
    with the HTTP Verbs specification.
    
    2.2.5. Requests
        The input to fetch is a request.
        
        A request has an associated method (a method). Unless stated otherwise it is `GET`.
        
        This can be updated during redirects to `GET` as described in HTTP fetch.
        
        A request has an associated url (a URL).
        
        Implementations are encouraged to make this a pointer to the first URL in request’s url list. 
        It is provided as a distinct field solely for the convenience of other standards hooking into Fetch.
        
        A request has an associated local-URLs-only flag. Unless stated otherwise it is unset.
        
        A request has an associated sandboxed-storage-area-URLs flag. Unless stated otherwise it is unset.
        
        A request has an associated header list (a header list). Unless stated otherwise it is empty.
        
        A request has an associated unsafe-request flag. Unless stated otherwise it is unset.
        
        The unsafe-request flag is set by APIs such as fetch() and XMLHttpRequest to ensure a 
        CORS-preflight fetch is done based on the supplied method and header list. It does not free 
        an API from outlawing forbidden methods and forbidden header names.
        
        A request has an associated body (null or a body). Unless stated otherwise it is null.
        
    Supplying request options
    
        // Example POST method implementation:
        
        
        postData(`http://example.com/answer`, {answer: 42})
          .then(data => console.log(data)) // JSON from `response.json()` call
          .catch(error => console.error(error));
        
        const postData = (url = ``, data = {}) => {
          // Default options are marked with *
            return fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, cors, *same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, same-origin, *omit
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    // "Content-Type": "application/x-www-form-urlencoded",
                },
                redirect: "follow", // manual, *follow, error
                referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            .then(response => response.json()) // parses response to JSON
            .catch(error => console.error(`Fetch Error =\n`, error));
        };
