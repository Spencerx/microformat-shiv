
window.onload = function() {

    var form;
    form= document.getElementById('mf-form'); 
    
    form.onsubmit = function(e){
        e.preventDefault();
        
        var html,
            baseUrl,
            collapsewhitespace,
            dateformatElt,
            dateformat,
            node,
            options,
            mfJSON,
            parserJSONElt;
    
        // get data from html
        html = document.getElementById('html').value;
        baseUrl = document.getElementById('baseurl').value;
        collapsewhitespace = document.getElementById('collapsewhitespace').checked;   
        dateformatElt = document.getElementById("dateformat");
        dateformat = dateformatElt.options[dateformatElt.selectedIndex].value;
        parserJSONElt = document.querySelector('#parser-json pre code')
        
        // create dom node for parsing
        node = document.createElement('div');
        node.innerHTML = html;
        
        // create options 
        options ={
            'node': node,
            'dateFormat': dateformat
        }
        if(baseUrl.trim() !== ''){
            options.baseUrl = baseUrl;
        }
        if(collapsewhitespace === true){
            options.textFormat = 'normalised';
        }
        
        // parse
        mfJSON = microformats.getItems( options );
        
        // format output
        parserJSONElt.innerHTML = htmlEscape( js_beautify( JSON.stringify(mfJSON) ) );
        prettyPrint(); 
        
    }
    
    function htmlEscape(str) {
        return String(str)
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
    }
  
  
};  