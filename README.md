# MachnetQuery
This is jQuery like lightweight implementation in vanilla js. Feel free to add functions and use

## Usage Example

Your html
```
<div class="wrapper">
  <h1>This is a headline</h1>
</div>
```

### select element

```js
MQ('.wrapper');
```

### hide element
```js
MQ('.wrapper').hide();
```

### show element
```js
MQ('.wrapper').show();
```

## ajax request examples

```
MQ.ajax({
    url:"http://localhost:3000",//request URL
    type:"GET",//Request type GET/POST
    //CALLBACK FUNCTION with RESPONSE as argument
    success: function(data){
      console.log(data);
    }

  });
```

TODO: write documentation for ajax
similar to <https://github.com/flouthoc/minAjax.js>