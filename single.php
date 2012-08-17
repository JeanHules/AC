<?php
require("includes/init.php");

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

    <link rel="image_src" type="image/jpeg" href="http://www.audiblecoffee.com/img/logo.jpg">
	<link rel="icon" href="/img/Large_Mug.ico" type="image/x-icon"> 
    <link rel="shortcut icon" href="/img/Large_Mug.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="/css/layoutsingle.css"/>
    <link href='http://fonts.googleapis.com/css?family=Quattrocento+Sans' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="/css/miniplayer.css"/>
 	<link rel="stylesheet" href="/css/puzzle.css"/>

<style type="text/css">
  .square h1 { color: #a3a8a4; }
  .square.hover h1 { color: #f710ef; }
  .square.playing h1 { color: #f710ef; }
  
  .square h2 { color: #a3a8a4; }
  .square.hover h2 { color: white; }
  .square.playing h2 { color: white; }
  
  .square .smallname { color: #a3a8a4; }
  .square.hover .smallname { color: #f710ef; }
  .square.playing .smallname { color: #f710ef; }
  
  .square .smalltitle { color: #a3a8a4; }
  .square.hover .smalltitle { color: white; }
  .square.playing .smalltitle { color: white; }
  
  .square.hover .img1 { opacity: 0.5; }
  .square.hover .background { opacity: 0.9; }
  .square.playing .img1 { opacity: 0.5; }
  .square.playing .background { opacity: 0.9; }

  .square .box { height: 50px; opacity: 0.7; }
  .square.hover .box { height: 160px; opacity: 0.8; }
  .square.playing .box { height: 160px; opacity: 0.8; }
  
  .square .close,
  .square .boxtop 
  .square.social{ display: none; }
  .square.hover .close,
  .square.hover .boxtop, 
  .square.hover .social { display: block; }
  .square.playing .close,
  .square.playing .boxtop, 
  .square.playing .social { display: block; }
</style>

<style type="text/css">
#thetextbox{position: absolute;
			top: 52px;
			left: -145px;
			width: 210px;
			display: none;}
			
.facebook{position: relative;
		  top:0px;
		  left:-1px;
		  z-index:1;
		  height:29px;
		  width:29px;
		  opacity: .8;
		  border-radius: 15px;}
		  
.twitter{position: relative;
 		 top:-31px;
 		 left:55px;
 		 z-index: 3;
 		 height:29px;
		 width:29px;
		 opacity: .8;
		 border-radius: 15px;}
 		 
.thelink{position: relative;
 		 top:-60px;
 		 left:110px;
 		 z-index: 3;
 		 height:59px;
		 width:50px;
		 opacity: .8;
		 border-radius: 15px;}
		 
.googleplus{position: relative;
 		 top:-87px;
 		 left:165px;
 		 z-index: 3;
 		 height:29px;
		 width:29px;
		 opacity: .8;
		 border-radius: 15px;}
		 
.social{position: absolute;
		top:56px;
		right:85px;
		display: none;
		width:151px;}
		
.fab_button:hover{background: url(/img/socialbuttonsBW1.png)-3px -417px;
		   height:49px;
		   width:50px;
		   opacity: .9;
		   }
		   
		
.fab_button{background: url(/img/socialbuttonsBW1.png)-3px -466px;
		   height:49px;
		   width:50px;
		   opacity: .9;
		   }
		   
		
.twi_button:hover{background: url(/img/socialbuttonsBW1.png)-3px -515px;
height: 49px;
width: 50px;
opacity: .9;
		   }
		   
		
.twi_button{
background: url(/img/socialbuttonsBW1.png)-3px -566px;
height: 52px;
width: 50px;
opacity: .9;

	}
		  
		   
		 
.email_button{background: url(/img/socialbuttonsBW1.png)-3px -619px;
		   height:50px;
		   width:50px;
		   opacity: .9;
		   }
		   
		
.email_button:hover{background: url(/img/socialbuttonsBW1.png)-3px -670px;
		   height:50px;
		   width:50px;
		   opacity: .9;
		   }
		    
</style>
</head>
<body>
<div id="topheader">
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=255228347849970";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>

<div id="sharetabs">
			
				<div class="twittab">
					<div class="twitcon"></div>
					<div class="twitterbutton"><a href="https://twitter.com/audiblecoffee" class="twitter-follow-button" data-show-count="false">Follow</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
					</div>
				</div>
				
				<div id="googfaceblack">
					<div class="gogplustab">
						<div class="googlecon"></div>
						<div class="gicon">
							<div class="g-plusone" data-size="tall" data-annotation="inline" data-width="100"  data-href="http://www.audiblecoffee.com"></div>
						</div>
					</div>
						
					<div id="faceblack">
						<div class="fbooktab">
							<div class="fbookcon"></div>
							<div class="fb-like" data-href="http://www.facebook.com/audiblecoffee" data-send="false" data-layout="button_count" data-width="60" data-show-faces="false" data-font="arial">
							</div>
						</div>
					
					</div>
					</div>

</div>
<div id="topbuttons">
<a href="http://www.audiblecoffee.com/about/" target="_blank" id="about">About</a>
<a href="http://www.audiblecoffee.com/faq/" target="_blank" id="faq">FAQ</a>
</div>
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
					<a href="http://www.facebook.com/sharer.php?s=100&amp;p[url]=http://www.audiblecoffee.com/singles/m<?php echo $trackinfo['ID'];?>&amp;p[images][0]=http://www.audiblecoffee.com/img/logo.jpg&amp;p[title]=<?php echo $trackinfo['SharingTitle'];?>&amp;p[summary]=Revolutionizing the way you discover and listen to electronic dance music." target="_blank">
					<div class="fab_button"></div>
					</a>
				</div>
			
				
				<div class="twitter">
					<a href="http://twitter.com/home/?status=♫ <?php echo $trackinfo['SharingTitle'];?> @AudibleCoffee www.audiblecoffee.com/singles/m<?php echo $trackinfo['ID'];?>" 
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
		
//social Toggle

$(".twittab").mouseenter(showNav).mouseleave(hideNav);

function showNav(){  
    $('#googfaceblack').stop().animate({ left: 174 }, 'slow');
    $('.twittab').stop().animate({ width: 193 }, 'slow')};
function hideNav(){  
    $('#googfaceblack').stop().animate({ left: 27 }, 'slow');
    $('.twittab').stop().animate({ width: 33 }, 'slow')};
		
		
		$('.gogplustab').hover( 
		function() {
		$('#faceblack').stop().animate({ left: 174 }, 'slow', function() {
		});
		$('.gogplustab').stop().animate({ width: 193 }, 'slow')}
		, 
		function() {
		$('#faceblack').stop().animate({ left: 32 }, 'slow', function() {
		});
		$('.gogplustab').stop().animate({ width: 33 }, 'slow')}
		);
		
		$('.fbooktab').hover( 
		function() {
		$('.fbooktab').stop().animate({ width: 163 }, 'slow')}
		, 
		function() {
		$('.fbooktab').stop().animate({ width: 33 }, 'slow')}
		);

        
</script>        

	
</body>

