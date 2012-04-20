<?php
require("../includes/init.php");

//Did they ask for a track....?
if(!empty($_GET['trackid'])) {
	//They don't suck, lets try and get that track
	$trackid = Sanitize::int($_GET['trackid']);
	$trackinfo = getTrack($trackid);
}
if(empty($_GET['trackid'])||!$trackinfo) {
	//They indeed suck, get rid of them
	header("Location: /");
	die();
}
//If we're still here then lets also get the Genre information
$genreinfo = getGenre($trackinfo['GenreID']);
?>
<!doctype html>

<head>
    <title>Audible Coffee</title>
	<meta charset='utf-8'> 
    <meta http-equiv="Cache-control" content="public">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    
    <meta property="og:title" content="Audible Coffee" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="http://www.audiblecoffee.com/" />
	<meta property="og:image" content="http://www.audiblecoffee.com/img/logo.jpg" />
	<meta property="fb:admins" content="184905639" />
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="image_src" type="image/jpeg" href="http://www.audiblecoffee.com/img/logo.jpg">
	<link rel="icon" href="/img/Large_Mug.ico" type="image/x-icon"> 
    <link rel="shortcut icon" href="/img/Large_Mug.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="/singles/layoutsingle.css"/>
    <link href='http://fonts.googleapis.com/css?family=Quattrocento+Sans' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="/css/miniplayer.css"/>
 	<link rel="stylesheet" href="/css/puzzle.css"/>
 	<style type="text/css">
  .square h1 { color: #a3a8a4; }
  .square.hover h1 { color: #f710ef; }
  
  .square h2 { color: #a3a8a4; }
  .square.hover h2 { color: white; }
  
  .square .smallname { color: #a3a8a4; }
  .square.hover .smallname { color: #f710ef; }
  
  .square .smalltitle { color: #a3a8a4; }
  .square.hover .smalltitle { color: white; }
  
  .square.hover .img1 { opacity: 0.3; }
  .square.hover .background { opacity: 0.9; }

  .square .box { height: 50px; opacity: 0.7; }
  .square.hover .box { height: 160px; opacity: 0.8; }
  
  .square .close,
  .square .boxtop, 
  .square .social{ display: none; }
  .square.hover .close,
  .square.hover .boxtop, 
  .square.hover .social{ display: block; }
</style>
</head>
<body>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=255228347849970";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<div id="container">
<a href="http://www.audiblecoffee.com"><img src="/img/AC_LOGO-Rasterized.png" id="logo" /></a>

	<div class="square <?php echo $genreinfo['ClassName'];?>">
    <!-- DJ Picture -->
    <img src="/pictures/<?php echo $trackinfo['ArtistImage'];?>" class="img1" />
    		<div class="boxtop">
    	    <span class="genre"><?php echo $genreinfo['Name'];?></span>
    	    </div>
    	    <div class="social">
				<div class="facebook">
					<a href="http://www.facebook.com/sharer.php?s=100&amp;p[url]=http://www.audiblecoffee.com/singles/m<?php echo $trackinfo['ID'];?>&amp;p[images][0]=http://www.audiblecoffee.com/img/logo.jpg&amp;p[title]=<?php echo $trackinfo['SharingTitle'];?>&amp;p[summary]=As Heard on Audible Coffee" target="_blank">
					<div class="fab_button"></div>
					</a>
				</div>
			
				
				<div class="twitter">
					<a href="http://twitter.com/home/?status=@AudibleCoffee As Heard on Audible Coffee www.audiblecoffee.com/singles/m<?php echo $trackinfo['ID'];?>" 
					target="_blank"><div class="twi_button"></div></a>
				</div>
				
				<div class="email">
					<a href="mailto:?subject=Check out Audible Coffee&amp;body=www.audiblecoffee.com/singles/m<?php echo $trackinfo['ID'];?>"><div class="email_button"></div></a>
				</div>
				
			</div>
    		<div class="box">
    		<a class="close" href="#close">&times;</a>
    		<!-- DJ Name -->
    		<h1><?php echo $trackinfo['Artist'];?></h1>
    		
    		<!-- Song Title -->
    		<h2><?php echo $trackinfo['Title'];?></h2>
    		
    		 <!--Song Description(179 characters with spaces)-->
    		<h4><?php echo $trackinfo['Description'];?></h4> 
    		    
    		    <div class="buttons">
    		    <!--Song file info-->
    			<div class="player">
				<a id="m<?php echo $trackinfo['ID'];?>" class="audio {skin:'#010101',showVolumeLevel:false,showTime:true,showRew:false,ogg:'/mp3/<?php echo $trackinfo['OGGFile'];?>'}" href="/mp3/<?php echo $trackinfo['MP3File'];?>"></a></div>

				</div>
			</div>
	</div>
</div>

<!-- jQuery -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script src="/inc/jquery.232fd31.min.js"></script>
	<script src="/inc/debug.js"></script>
	
<script type="text/javascript">

//delay
		jQuery(document).ready(function(){
		delayShow();
		});
		
		function delayShow() {
		var secs = 2000;
		setTimeout('jQuery("body").css("visibility","visible");', secs);
		}
		
//checkbox 
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
//dave
		var $container = $('.container'),
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
		
		$('#shufflebuttons').toggle( 
		function() {
		$container.isotope('shuffle');
		}, 
		function() {
		$container.isotope({ sortBy: 'original-order' });
		});
		
		var $items = $container.children();
		
		// close square when close is clicked
		function closeSquare( event ) {
		var $this = $(this)
		if ( $(event.target).is('a.close') ) {
		// remove this item
		$(event.target).siblings('.buttons').find('.audio').mb_miniPlayer_stop();
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
//audio
   		$(".audio").mb_miniPlayer({
		width:210,
		height:34,
		inLine:false,
		onEnd:playNext,
		onPlay:playHover
		});
		
		
		var $audios = $('.audio');
		
		function playHover(idx,sitem){
		$('.square').removeClass("playing");
		$(sitem).parents(".square").addClass("playing")	
		}
		function playNext(idx,sitem) {
		$(sitem).parents(".square").nextAll(":not(.isotope-hidden):eq(0)").find('.audio').mb_miniPlayer_play();
		};

//IF
		var $container = $('.container');
		
		$container.isotope({
		itemSelector : '.square'
		});
		$container.infinitescroll({
		navSelector  : '#page_nav',    // selector for the paged navigation 
		nextSelector : '#page_nav a',  // selector for the NEXT link (to page 2)
		itemSelector : '.square',     // selector for all items you'll retrieve
		animate : false,
		debug : true,
		},
		
		
		//callback
		
		function( newElements ) {
		var $newElements = $(newElements);
		
		$newElements.find(".audio").mb_miniPlayer({
		width:210,
		height:34,
		inLine:false,
		onEnd:playNext,
		onPlay:playHover
		});
		
		// add hover events for new items
		bindSquareEvents( $newElements );
		setTimeout(function() {
		$container.isotope('insert', $newElements );
		}, 1000);
		});
//genre
		$('#toggle').toggle( 
		function() {
		$('#filters').animate({ left: 4 }, 'slow', function() {
		});
		}, 
		function() {
		$('#filters').animate({ left: -259 }, 'slow', function() {
		});
		});
//shuffle
		$('#shufflebuttons').toggle( 
		function() {
		$('#original-order, .onshuffle').css('display','block');
		$('#shuffle, .offshuffle').css('display','none');
		}, 
		function() {
		$('#original-order, .onshuffle').css('display','none');
		$('#shuffle, .offshuffle').css('display','block');
		});
        
</script>        

	
</body>

