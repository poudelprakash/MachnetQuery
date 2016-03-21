// Anonymous function
(function () {

// =========================== document selection and manipulation ===============

    // MQ returns new MachnetQuery object that hold our selector. Ex: MQ('.wrapper')
    var MQ = function (params) {
        return new MachnetQuery(params);
    };

    // In our Library we get our selector with querySelectorAll (we do not support < ie8)
    var MachnetQuery = function (params) {
        // Get params
        var selector = document.querySelectorAll(params);
        var i = 0;
        // Get selector length
        this.length = selector.length;

        // Add selector to object for method chaining
        for (; i < this.length; i++) {
            this[i] = selector[i];
        }

        /**
         * Hide element(s) from DOM
         * @returns {*}
         */
        this.hide = function () {
            var len = this.length;
            // Here we simply loop through our object (this) and set the css to display none. 
            //If you got more than 1 node from DOM selected with querySelectorAll, you would hide them all.
            while (len--) {
                this[len].style.display = 'none';
            }

            // It's important to return this if you want to chain methods!
            return this;
        },

        /**
         * Show element(s) from DOM
         * @returns {*}
         */
         this.show =  function () {
            var len = this.length;
            while (len--) {
                this[len].style.display = 'block';
            }

            return this;
        }

        // Return as object
        return this;
    };


    //============================ AJAX Utilities ================================
    var initXMLhttp = function() {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            //code for IE7,firefox chrome and above
            xmlhttp = new XMLHttpRequest();
        } else {
            //code for Internet Explorer
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        return xmlhttp;
    }

    // change data to url params when get request
    var convertDataToGetParams = function(data) {
        var paramsArray = [];

        if( typeof data === "string" ){
            var tmpArr = String.prototype.split.call(data,'&');
            for(var i = 0, j = tmpArr.length; i < j; i++){
                var datum = tmpArr[i].split('=');
                paramsArray.push(encodeURIComponent(datum[0]) + "=" + encodeURIComponent(datum[1]));
            }
        }else if( typeof data === 'object' && !( data instanceof String || (FormData && data instanceof FormData) ) ){
            for (var k in data) {
                var datum = data[k];
                if( Object.prototype.toString.call(datum) == "[object Array]" ){
                    for(var i = 0, j = datum.length; i < j; i++) {
                        paramsArray.push(encodeURIComponent(k) + "[]=" + encodeURIComponent(datum[i]));
                    }
                }else{
                    paramsArray.push(encodeURIComponent(k) + "=" + encodeURIComponent(datum));
                }
            }
        }
        return paramsArray.join('&');
    }

    MQ.ajax = function(config) {
        /*Config Structure
        url:"reqesting URL"
        type:"GET or POST"
        async: "(OPTIONAL) Boolean True for async and False for Non-async | By default its Async"
        data: "(OPTIONAL) another Nested Object which should contains reqested Properties in form of Object Properties"
        success: "(OPTIONAL) Callback function to process after response | function(data,status)"
        */

        if (!config.url) {
            console.log("No Url!");
            return;
        }

        if (!config.type) {
            console.log("No Default type (GET/POST) given!");
            return;
        }

        if (!config.async) {
            config.async = true;
        }

        // common Content-type / Mime type
        // application/json
        // application/x-www-form-urlencoded
        // multipart/form-data
        // text/html
        if (!config.contentType) {
            config.contentType = "application/x-www-form-urlencoded";
        }

        var xmlhttp = initXMLhttp();

        xmlhttp.onreadystatechange = function() {

            // if request completed
            if (xmlhttp.readyState === 4){

                if (xmlhttp.status === 200){
                   config.success(xmlhttp.responseText, xmlhttp.status, xmlhttp.readyState);
                } else{
                    config.error(xmlhttp.responseText, xmlhttp.status, xmlhttp.readyState); 
                }

            }else{
                // is incomplete

            }

        }

        if (config.type === "GET") {
            var urlParams = convertDataToGetParams(config.data)
            xmlhttp.open("GET", config.url + "?" + urlParams, config.async);
            xmlhttp.send();

        }
        if (config.type === "POST") {
            xmlhttp.open("POST", config.url, config.async);
            xmlhttp.setRequestHeader("Content-type", config.contentType);
            xmlhttp.send(config.data);

        }
    }

    // Assign our MQ object to global window object.
    if(!window.MQ) {
        window.MQ = MQ;
    }
})();



