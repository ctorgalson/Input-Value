/**
 * inputValue jQuery plugin
 * 
 * @name inputValue
 * @descripton intelligently sets, clears and resets the default value attribute of an input element                                   
 * @version 1.3
 * @requires jQuery 1.2.6 +
 * @author Christopher Torgalson <manager@bedlamhotel.com>
 * @license GPL 3
 * @param string d Default input field value
 *
 * Example usage:
 *
 * $('input[id^=edit-search-theme-form-1]').inputValue('Search this site');
 *
 */
(function($){
  $.fn.inputValue = function(d) {
    return this.each(function(i,e){
      // We need a collection containing the current element, and we need to 
      // test the field's value to see if we can continue:
      var $field = $(e),
          $originalValue = $.trim(d ? d : $field.val());
      // Can we continue?
      if ($originalValue.length < 1) { // Nothing to do in this case...
        return;
      }
      else { // Otherwise, go ahead...
        var $form = $field.parents('form'); // Store the parent form element...
        if ($field.val().length < 1) {
          $field.val($originalValue);
        }
        // Set up field event handlers:
        $field
          // Focus handler:
          .focus(function(){
            // If the field contains the default value when clicked, empty it:
            if ($.trim($field.val()) == $originalValue) {
              $field.val('');
            }
          })
          // Blur handler:
          .blur(function(){
            // If the field is empty on blur, restore the original value:
            if ($.trim($field.val()).length < 1) {
              $field.val($originalValue);
            }
          });
        // Set up form event handler:
        $form
          // Submit handler:
          .submit(function(){
            // If the field contains the original value on submit, empty it prior
            // to the form submission:
            if ($.trim($field.val()) == $originalValue) {
              $originalValue.val('');
            }
          });
      }      
    });
  };
})(jQuery);
