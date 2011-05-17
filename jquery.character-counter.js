(function($) {
  	/**
  	 * Maximum Character Counter
  	 * Author: Ryan Bales, Creative Anvil 2011
  	 * 
  	 * This plugin allows one to specify a container for a character counter element, set the maximum characters, and add an 'error' class to 
  	 * counter elements of offending text inputs
  	 */
	$.fn.jsCharacterCounter = function(options) {
  		// Set default values
  		var defaults = {
            container_element : 'form',
            max_characters : 400,
            validate : false, // true for js validation
            submit_element : 'form', // the submit element, used for js validation
            validation_error_output : function() { alert('Please fix the errors on the page before continuing.'); }
  		}
  		// merge options with defaults
  		var options = $.extend(defaults,options);
        var jsCharacterCounter = this;
        
        var getInputLength = function(jNode)
        {
        	return parseInt(jNode.val().length);
        }                

        var setCounter = function(jNode,length)
        {
        	var small_text = jNode.counter_element.find('small'); 
        	small_text.text(length + ' Character(s) of ' + options.max_characters + ' limit');
        	// set overflow class
        	if( parseInt(length) > parseInt(options.max_characters) ) {
        		small_text.addClass('error');	
        	} else {
        		small_text.removeClass('error');
        	}
        }
        
        var syncCounter = function(jNode) {
        	var value_length = getInputLength(jNode);
        	setCounter(jNode,value_length);
        }
        
        this.setup = function(jNode) {
			// encapsulate counter element
	        jNode.counter_element = $('<div/>')
	        											.attr('id','comment-char-counter')
	        											.append($('<small/>').text('0 of ' + options.max_characters + ' limit'))
	        											.appendTo($(options.container_element));
			// setup counter
	        syncCounter(jNode);
	        // bind keyup event to input
	        jNode.bind('keyup',function() {
	        	syncCounter(jNode);
	        });                
			// set-up validation if necessary
			if( options.validate === true ) {
				// setup validation
				$(options.submit_element).bind('submit',function(e) {
					var counter = jNode.counter_element;
					if( counter.find('small').hasClass('error') ) {
						options.validation_error_output();
						e.preventDefault();
					}
				});
			}			
		}
		
		// 'this' is the jQuery object 
		this.each(function() {
			var jNode = $( this );
			jsCharacterCounter.setup(jNode);
		});
		
       	return this;
   }
})(jQuery);