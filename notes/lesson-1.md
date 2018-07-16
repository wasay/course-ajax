Lesson 1: Ajax with XHR

    Content 2. Client Server Demonstration
        Vocabulary
            GET Request: An internet request for data. Sent from a client to a server.
    
        Response: A server's response to a request. Sent from a server to a client. 
        A response to a GET request will usually include data that the client needs 
        to load the page's content.
        
    Content 3: Ajax Definition & Examples
        A little history
        JavaScript frameworks and Single Page Apps are the way to build today, 
        but let's review where we've come from.
        
        In the traditional server-rendered web application, the client computer makes 
        a request for a web page. The server creates and returns a page to the client. 
        Finally, the client loads the new page and displays the information. If they 
        interact with the page, say to add or remove something by submitting a form, 
        they start the cycle all over again. The client will make another request, the 
        server returns a totally new page, the client loads and presents it to the user again.
        
        Up until the mid 2000s, this was basically the only way internet communication 
        occurred. Information would reside on the server, and a client would request that 
        data and refresh the page and display it. This cycle would repeat for each and 
        every new page request.
        
        In the late 90s, the Microsoft Outlook team added the XMLHTTP component to Internet 
        Explorer and built a web version of the Outlook mail client. This code was later 
        picked up by other browsers as XMLHttpRequest. This allowed browsers to make HTTP 
        requests from Javascript and update the current page in place without fetching an 
        entire page from the server. Instead of the synchronous model of waiting for a 
        whole page, the user interface could update asynchronously as the user kept working. 
        Most of the data being exchanged used the XML format.
        
        AJAX
        In 2005, Jesse James Garrett coined the term AJAX to mean “Asynchronous Javascript 
        and XML”. This is essentially the technique of using XMLHTTPRequest to fetch 
        data and then modify the current page.
        
        AJAX took the web world by storm, spreading far beyond Microsoft Outlook. 
        State-of-the-art web applications like Flickr, GMail, and Google Maps rapidly 
        adopted it. Instead of having to wait for data and have the entire page refresh, 
        these new, near instantaneous applications were incredible.
        
        Browser Inconsistencies
        Hold up, though. Ajax wasn't all ponies and rainbows. There were several different, 
        incompatible browser implementations and developers were forced to code for one 
        browser or write complex code for them all. Eventually, JavaScript libraries like 
        jQuery and YUI emerged to reconcile the differences.
        
        AJAX apps were great, but difficult for individual developers to write; as browsers
         kept changing, and people demanded apps on more devices, the code then became more 
         and more complex and confusing. This challenge led to the rise of standard 
         Javascript frameworks and libraries. JavaScript libraries arose to hide the 
         complex browser differences, JavaScript frameworks made developing complex, powerful 
         applications manageable.
         
         
    Content 4. APIs
    
        Getting Data
        We've looked at the concepts of Ajax and that it's the technology we'll use to add data 
        to our project asynchronously. But where is this data coming from? And how do we get 
        access to it? How will our app know how to retrieve that data.
        
        We'll be using an API to interact with various data sources.
        
        What's an API?
        The acronym "API" stands for:
        
        Application
        Programming
        Interface
        
        There's data out there that's just waiting to be used. Most of the data-rich applications 
        you use get their data from 3rd party websites. They actually fetch this data using APIs. 
        In the video below, Cameron will demo how Reddit uses APIs for added interactivity on its site.
        
    Content 6. The XHR Object
    
        const asyncRequestObject = new XMLHttpRequest();
    
            XMLHttpRequest.open(method, url)
            XMLHttpRequest.open(method, url, async)
            XMLHttpRequest.open(method, url, async, user)
            XMLHttpRequest.open(method, url, async, user, password)
    
        Note: We'll be digging into the XMLHttpRequest object. We'll look at how to create it, 
        what methods and properties need to be used, and how to actually send asynchronous requests. 
        For even more info on using the XHR object to make async requests, check out these links:
        
        MDN's docs - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open
        WHATWG Spec - https://xhr.spec.whatwg.org/
        W3C Spec - https://www.w3.org/TR/XMLHttpRequest/
        
    Content 7. XHR's.open() method
    
        asyncRequestObject.open('GET', 'https://unsplash.com');

    Content 8. XHR's .send() method
    
        Handling Success
        To handle the successful response of an XHR request, we set the onload property on the 
        object to a function that will handle it:
        
        function handleSuccess () {
            // in the function, the `this` value is the XHR object
            // this.responseText holds the response from the server
        
            console.log( this.responseText ); // the HTML of https://unsplash.com/
        }
        
        asyncRequestObject.onload = handleSuccess;
        As we just saw, if onload isn't set, then the request does return...but nothing happens 
        with it.
        
        Handling Errors
        You might've picked up that onload is called when the response is successful. If something 
        happens with the request and it can't be fulfilled, then we need to use the onerror property:
        
        function handleError () {
            // in the function, the `this` value is the XHR object
            console.log( 'An error occurred 😞' );
        }
        
        asyncRequestObject.onerror = handleError;
        As with onload, if onerror isn't set and an error occurs, that error will just fail silently 
        and your code (and your user!) won't have any idea what's wrong or any way to recover.

    Content 9. A Full Request
    
        function handleSuccess () {
            const data = JSON.parse( this.responseText ); // convert data from JSON to a JavaScript object
            console.log( data );
        }
        
        function handleSuccess () {
            const data = JSON.parse( this.responseText ); // convert data from JSON to a JavaScript object
            console.log( data );
        }
        
        const asyncRequestObject = new XMLHttpRequest();
        asyncRequestObject.open('GET', 'https://unsplash.com');
        asyncRequestObject.onload = handleSuccess;
        asyncRequestObject.onerror = handleError;
        asyncRequestObject.send();
        
    13. XHR Recap
        To Send An Async Request
            create an XHR object with the XMLHttpRequest constructor function
            use the .open() method - set the HTTP method and the URL of the resource to be fetched
            set the .onload property - set this to a function that will run upon a successful fetch
            set the .onerror property - set this to a function that will run when an error occurs
            use the .send() method - send the request
        
            
            -------------------------------
            To Use The Response
                use the .responseText property - holds the text of the async request's response
                
                Blob responses
                If you want to work directly with a Blob and/or don't need to manipulate any of the 
                file's bytes, use xhr.responseType='blob':
                
                window.URL = window.URL || window.webkitURL;  // Take care of vendor prefixes.
                
                var xhr = new XMLHttpRequest();
                xhr.open('GET', '/path/to/image.png', true);
                xhr.responseType = 'blob';
                
                xhr.onload = function(e) {
                  if (this.status == 200) {
                    var blob = this.response;
                
                    var img = document.createElement('img');
                    img.onload = function(e) {
                      window.URL.revokeObjectURL(img.src); // Clean up after yourself.
                    };
                    img.src = window.URL.createObjectURL(blob);
                    document.body.appendChild(img);
                    ...
                  }
                };
                
                xhr.send();
            
            -------------------------------
            
            Sending string data: xhr.send(DOMString)
                function sendTextNew(txt) {
                  var xhr = new XMLHttpRequest();
                  xhr.open('POST', '/server', true);
                  xhr.responseType = 'text';
                  xhr.onload = function(e) {
                    if (this.status == 200) {
                      console.log(this.response);
                    }
                  };
                  xhr.send(txt);
                }
                
                sendTextNew('test string');
            
            -------------------------------
            
            Submitting forms: xhr.send(FormData)

                function sendForm() {
                  var formData = new FormData();
                  formData.append('username', 'johndoe');
                  formData.append('id', 123456);
                
                  var xhr = new XMLHttpRequest();
                  xhr.open('POST', '/server', true);
                  xhr.onload = function(e) { ... };
                
                  xhr.send(formData);
                }
                
                -------------------------------
                
                <form id="myform" name="myform" action="/server">
                  <input type="text" name="username" value="johndoe">
                  <input type="number" name="id" value="123456">
                  <input type="submit" onclick="return sendForm(this.form);">
                </form>
                
                function sendForm(form) {
                  var formData = new FormData(form);
                
                  formData.append('secret_token', '1234567890'); // Append extra data before send.
                
                  var xhr = new XMLHttpRequest();
                  xhr.open('POST', form.action, true);
                  xhr.onload = function(e) { ... };
                
                  xhr.send(formData);
                
                  return false; // Prevent page from submitting.
                }
                
                -------------------------------
                
                function uploadFiles(url, files) {
                  var formData = new FormData();
                
                  for (var i = 0, file; file = files[i]; ++i) {
                    formData.append(file.name, file);
                  }
                
                  var xhr = new XMLHttpRequest();
                  xhr.open('POST', url, true);
                  xhr.onload = function(e) { ... };
                
                  xhr.send(formData);  // multipart/form-data
                }
                
                document.querySelector('input[type="file"]').addEventListener('change', function(e) {
                  uploadFiles('/server', this.files);
                }, false);
            
            -------------------------------
            
            Uploading a file or blob: xhr.send(Blob)
            
                <progress min="0" max="100" value="0">0% complete</progress>
                
                function upload(blobOrFile) {
                  var xhr = new XMLHttpRequest();
                  xhr.open('POST', '/server', true);
                  xhr.onload = function(e) { ... };
                
                  // Listen to the upload progress.
                  var progressBar = document.querySelector('progress');
                  xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                      progressBar.value = (e.loaded / e.total) * 100;
                      progressBar.textContent = progressBar.value; // Fallback for unsupported browsers.
                    }
                  };
                
                  xhr.send(blobOrFile);
                }
                
                upload(new Blob(['hello world'], {type: 'text/plain'}));
            
            -------------------------------
            
            Uploading a chunk of bytes: xhr.send(ArrayBuffer)
            
            function sendArrayBuffer() {
              var xhr = new XMLHttpRequest();
              xhr.open('POST', '/server', true);
              xhr.onload = function(e) { ... };
            
              var uInt8Array = new Uint8Array([1, 2, 3]);
            
              xhr.send(uInt8Array.buffer);
            }
            
        -------------------------------
            
        Cross Origin Resource Sharing (CORS)
        CORS allows web applications on one domain to make cross domain AJAX requests to 
        another domain. It's dead simple to enable, only requiring a single response 
        header to be sent by the server.
        
        Enabling CORS requests
            Access-Control-Allow-Origin: http://example.com
            
        -------------------------------
        
        Download + save files to the HTML5 file system
            Let's say you have an image gallery and want to fetch a bunch of images then save 
            them locally using the HTML5 File System. One way to accomplish this would be to 
            request images as Blobs and write them out using FileWriter:
            
            
            window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
            
            function onError(e) {
              console.log('Error', e);
            }
            
            var xhr = new XMLHttpRequest();
            xhr.open('GET', '/path/to/image.png', true);
            xhr.responseType = 'blob';
            
            xhr.onload = function(e) {
            
              window.requestFileSystem(TEMPORARY, 1024 * 1024, function(fs) {
                fs.root.getFile('image.png', {create: true}, function(fileEntry) {
                  fileEntry.createWriter(function(writer) {
            
                    writer.onwrite = function(e) { ... };
                    writer.onerror = function(e) { ... };
            
                    var blob = new Blob([xhr.response], {type: 'image/png'});
            
                    writer.write(blob);
            
                  }, onError);
                }, onError);
              }, onError);
            };
            
            xhr.send();
            
        -------------------------------
        
        Slicing a file and uploading each portion
        
            Google App Engine's 32MB http request limit.
            
            Using the File APIs, we can minimize the work to upload a large file. The technique is to slice 
            the upload into multiple chunks, spawn an XHR for each portion, and put the file together on the 
            server. This is similar to how GMail uploads large attachments so quickly. Such a technique could 
            also be used to get around Google App Engine's 32MB http request limit.
            
        
            function upload(blobOrFile) {
              var xhr = new XMLHttpRequest();
              xhr.open('POST', '/server', true);
              xhr.onload = function(e) { ... };
              xhr.send(blobOrFile);
            }
            
            document.querySelector('input[type="file"]').addEventListener('change', function(e) {
              var blob = this.files[0];
            
              const BYTES_PER_CHUNK = 1024 * 1024; // 1MB chunk sizes.
              const SIZE = blob.size;
            
              var start = 0;
              var end = BYTES_PER_CHUNK;
            
              while(start < SIZE) {
                upload(blob.slice(start, end));
            
                start = end;
                end = start + BYTES_PER_CHUNK;
              }
            }, false);
            
            })();
