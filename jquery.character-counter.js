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
        // create object
		this.characterCounter = {};
        $.extend(this.characterCounter,options);
        
        this.getInputLength = function()
        {
        	return parseInt(this.val().length);
        }                

        this.characterCounter.setCounter = function(length)
        {
        	var small_text = this.counter_element.find('small'); 
        	small_text.text(length + ' Character(s) of ' + this.max_characters + ' limit');
        	// set overflow class
        	if( parseInt(length) > parseInt(this.max_characters) ) {
        		small_text.addClass('error');	
        	} else {
        		small_text.removeClass('error');
        	}
        }
        
        this.syncCounter = function() {
        	var value_length = this.getInputLength();
        	this.characterCounter.setCounter(value_length);
        }
        
		// set-up validation if necessary
		if( this.characterCounter.validate === true ) {
			
		}
		// encapsulate counter element
        this.characterCounter.counter_element = $('<div/>')
        											.attr('id','comment-char-counter')
        											.append($('<small/>').text('0 of ' + this.characterCounter.max_characters + ' limit'))
        											.appendTo($(this.characterCounter.container_element));
        
		characterCounterObj = this;
        this.syncCounter();
        // bind keyup event to input
        this.bind('keyup',function() {
        	characterCounterObj.syncCounter();
        });                
		
		// validation
		$(this.characterCounter.submit_element).bind('submit',function(e) {
			var counter = characterCounterObj.characterCounter.counter_element;
			if( counter.find('small').hasClass('error') ) {
				characterCounterObj.characterCounter.validation_error_output();
				e.preventDefault();
			}
		});
		
       	return this;
   }
})(jQuery);