Lesson 2: Ajax with jQuery

    Content 2. jQuery's `ajax()` Method
        The .ajax() method is at the heart of all asynchronous requests for the entire jQuery library. 
        There are a couple of ways you can call the .ajax() method:
        
        $.ajax(<url-to-fetch>, <a-configuration-object>);
        
        // or 
        
        $.ajax(<just a configuration object>);
        
        What's a "configuration object"?
        
        A configuration object is just a plain ol' JavaScript object that's used to configure something. For example:
        
        var settings = {
           frosting: 'buttercream',
           colors: ['orange', 'blue'],
           layers: 2,
           isRound: true
        };
        ...the settings configuration object can be used in the imaginary MakeCake constructor function:
        
        const myDeliciousCake = MakeCake( settings );
        
        Alternatively, the settings object could be passed in directly:
        
        const myDeliciousCake = MakeCake({
           frosting: 'buttercream',
           colors: ['orange', 'blue'],
           layers: 2,
           isRound: true
        });
        
        
        Making an Ajax call
        
        jQuery's .ajax() method has to be incredibly versatile and powerful if it's what powers all of 
        jQuery's asynchronous requests. A simple Ajax request would look like this:
        
        $.ajax({
            url: 'https://swapi.co/api/people/1/'
        });