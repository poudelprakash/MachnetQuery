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

    // Assign our MQ object to global window object.
    if(!window.MQ) {
        window.MQ = MQ;
    }
})();



