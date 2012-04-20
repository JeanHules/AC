/*!
 * jQuery AC jquery
 *
 * You're Beautiful 
 *
 */
 
$(window).bind("load", function() {

	$(this).joyride();
	
//Checkbox buttons  
		
    $("input[name='genre']").imageTick({
      custom_button: function($label) {
        $label.hide();
        return '<div class="my-custom-button">' + $label.text() + '</div>';
      }
    });
	
		var switched = false;
		function revealToggle(e){
		
      if (!switched) {
        $("input[type='checkbox'],input[type='radio']").css('display', 'inline');
        $(e).val('Hide the REAL checkboxes/radios');
        switched = true;
      } else {
        $("input[type='checkbox'],input[type='radio']").css('display', 'none');
        $(e).val('Show me the REAL checkboxes/radios');
        switched = false;
		  }
		};


//isotope


  		var $container = $('#container'),
        $checkboxes = $('#filters input');
  
  		$container.isotope({
    	itemSelector: '.square'
  		});
  
  		$checkboxes.change(function(){
    	var filters = [];
    	// get checked checkboxes values
    	$checkboxes.filter(':checked').each(function(){
        filters.push( this.value );
    	});
    	// ['.red', '.blue'] -> '.red, .blue'
    	filters = filters.join(', ') || 'none';
    	$container.isotope({ filter: filters });
 	    });
 	    
 	    $('#shuffle').click(function(){
    	$container.isotope('shuffle');
  		});

 	    $('#original-order').click(function(){
        $container.isotope({ sortBy: 'original-order' });
  		});

 	    var $items = $container.children();
  
      // close square when close is clicked
      function closeSquare( event ) {
        var $this = $(this)
        if ( $(event.target).is('a.close') ) {
          // remove this item
          $(".audio").not(":visible").each(function(){
		  $(this).mb_miniPlayer_stop();
		  })
          $container.isotope( 'remove', $this ).isotope('reLayout');
          return false;
          } else {
          // select next item
          var idx = $this.index();
          var $filteredAtoms = $container.data('isotope').$filteredAtoms,
              isoIndex = $filteredAtoms.index( this ),
              nextIndex = ( isoIndex + 1 ) % $filteredAtoms.length;

          $items.filter('.next').removeClass('next');
          $filteredAtoms.eq( nextIndex ).addClass('next');
        }
      }

      function bindSquareEvents( $items ) {
        var $squares = $items.filter('.square');
        // simple hover events
        $squares.hover( function() {
          $(this).addClass('hover')
        }, function() {
          $(this).removeClass('hover')
        });
        $squares.click( closeSquare );
      }

      // initial bind
      bindSquareEvents( $('.square') );
      

//Audio jquery
   		
		
		$(".audio").mb_miniPlayer({
		width:210,
		height:34,
		inLine:false,
		onEnd:playNext
		});

		var $audios = $('.audio');

		function playNext(idx) {
 	   	var actualPlayer=$audios.eq(idx),
       	$filteredAtoms = $container.data('isotope').$filteredAtoms,
      	isotopeItemParent = actualPlayer.parents('.isotope-item'),
        isoIndex = $filteredAtoms.index( isotopeItemParent[0] ),
        nextIndex = ( isoIndex + 1 ) % $filteredAtoms.length;
      
  		$filteredAtoms.eq( nextIndex ).find('.audio').mb_miniPlayer_play();
		};
		
		
//Inifinite Scroll


      var $container = $('#container');
    
      $container.isotope({
        itemSelector : '.square'
      });
      $container.infinitescroll({
        navSelector  : '#page_nav',    // selector for the paged navigation 
        nextSelector : '#page_nav a',  // selector for the NEXT link (to page 2)
        itemSelector : '.square',     // selector for all items you'll retrieve
        animate : false,
        debug : true,
        loading: {
            finishedMsg: 'No more pages to load.',
            img: 'http://i.imgur.com/qkKy8.gif'
          }
        },

	
      // call Isotope as a callback

      	 function( newElements ) {
    var $newElements = $(newElements);
    
        $newElements.find(".audio").mb_miniPlayer({
		width:210,
		height:34,
		inLine:false,
		onEnd:playNext
		});

		var $audios = $('.audio');

		function playNext(idx) {
 	   	var actualPlayer=$audios.eq(idx),
       	$filteredAtoms = $container.data('isotope').$filteredAtoms,
      	isotopeItemParent = actualPlayer.parents('.isotope-item'),
        isoIndex = $filteredAtoms.index( isotopeItemParent[0] ),
        nextIndex = ( isoIndex + 1 ) % $filteredAtoms.length;
      
  		$filteredAtoms.eq( nextIndex ).find('.audio').mb_miniPlayer_play();
		};
      // add hover events for new items
          bindSquareEvents( $newElements );
          setTimeout(function() {
		  $container.isotope('insert', $newElements );
          }, 1000);
     	  });
     	  
})(jQuery);
	     	  

