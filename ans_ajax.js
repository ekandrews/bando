/*
requeset - get response
updater - changes element on request
*/

/* Add to Cart */

function sendform(asin){
    var parameters = $('#' + asin).serialize();
    
    $('#add-'+asin).disable().val('Adding...'); 
    $('#response').innerHTML = t.responseText;
            
    var opt = {
        method:'post', 
        success: function(t) { $('#add-'+asin).enable().val('Add to Cart'); $('#response-'+asin).innerHTML = t.responseText; }
        }

    $.ajax('cart.php?' + parameters, opt);
}

/* Paging  Requests */

function ajaxUpdater(id,url) {

  window.scrollTo(0,0);

  Element.show('pageLoading');
  new Ajax.Updater(id,url,{asynchronous:true});
  Element.hide('pageLoading');
  //setTimeout("Effect.toggle('pageLoading');", 1000);
}  

/* Cart Update/Remove Requests */

function cartUpdater(url) {
	new Ajax.Updater('items',url+'&items',{asynchronous:true});
	new Ajax.Updater('subtotal',url+'&subtotal',{asynchronous:true});
	new Ajax.Updater('csubtotal',url+'&subtotal',{asynchronous:true});
}  

/* tabs */

/*-----------------------------------------------------------
    Toggles element's display value
    Input: any number of element id's
    Output: none 
    ---------------------------------------------------------*/
function toggleDisp() {
    for (var i=0;i<arguments.length;i++){
        var d = $(arguments[i]);
        if (d.style.display == 'none')
            d.style.display = 'block';
        else
            d.style.display = 'none';
    }
}
/*-----------------------------------------------------------
    Toggles tabs - Closes any open tabs, and then opens current tab
    Input:     1.The number of the current tab
                    2.The number of tabs
                    3.(optional)The number of the tab to leave open
                    4.(optional)Pass in true or false whether or not to animate the open/close of the tabs
    Output: none 
    ---------------------------------------------------------*/
function toggleTab(num,numelems,opennum,animate) {
    if ($('tabContent'+num).style.display == 'none'){
        for (var i=1;i<=numelems;i++){
            if ((opennum == null) || (opennum != i)){
                var temph = 'tabHeader'+i;
                var h = $(temph);
                if (!h){
                    var h = $('tabHeaderActive');
                    h.id = temph;
                }
                var tempc = 'tabContent'+i;
                var c = $(tempc);
                if(c.style.display != 'none'){
                        toggleDisp(tempc);
                }
            }
        }
        var h = $('tabHeader'+num);
        if (h)
            h.id = 'tabHeaderActive';
        h.blur();
        var c = $('tabContent'+num);
        c.style.marginTop = '2px';
            toggleDisp('tabContent'+num);
    }
}