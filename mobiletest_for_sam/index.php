<?php
require("../includes/init.php");
//Lets first get some genres...
$genres = getGenres();
//Lovely, now lets get some tracks and do some pagination..
$perpage = 20;
$page = 1;
//Check if user wants a different page..
if(!empty($_GET['page'])) {
	//Lets check if they gave us a valid page number...
	$tmppage = Sanitize::int($_GET['page']);
	if($tmppage > 0)
		$page = $tmppage;
}
$startrecord = ($page - 1) * $perpage;
$trackdata = getTracks($startrecord,$perpage);
$tracks = $trackdata[0];
if(empty($tracks)) {
	//We've hit the end of the line... (we'll display a nice error message below)
	header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found");
	header("Status: 404 Not Found");
	$nextpage = -1;
}
else {
	$nextpage = $page + 1;
}
?>
<!doctype html>
<head>
	<meta charset='utf-8'> 
    <meta http-equiv="Cache-control" content="public">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    
    <title>Audible Coffee</title>
    
    <meta property="og:title" content="Audible Coffee" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="http://www.audiblecoffee.com/" />
	<meta property="og:image" content="http://www.audiblecoffee.com/img/logo1.jpg" />
	<meta property="fb:admins" content="184905639" />
	
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	
	<link rel="image_src" href="http://www.audiblecoffee.com/img/logo1.jpg"/>
	<link rel="icon" href="/img/Large_Mug.ico" type="image/x-icon"> 
    <link rel="shortcut icon" href="/img/Large_Mug.ico" type="image/x-icon">
    
    <link rel="stylesheet" type="text/css" href="layoutmobile.css"/>
    <link href='http://fonts.googleapis.com/css?family=Quattrocento+Sans' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" type="text/css" href="css/miniplayertest.css"/>

<style type="text/css">

  .square.playing h1 { color: #f710ef; }
  .square.playing h2 { color: #f710ef; }

  .square.playing .img1 { opacity: 0.5; }
  .square.playing .background { opacity: 1; }

  .square.playing .box { opacity: 0.8; }

</style>

<style type="text/css">

		   
</style>
</head>  


<body onload="setTimeout(function() { window.scrollTo(0, 1) }, 100);">

<div id="header">
<h2 class="headername">AUDIBLE COFFEE</h2>
</div>
<div id="headerbutton"></div>


<div id="filters">
<ul>
	<?php
	if(!empty($genres)) {
		$genredb = array();
		foreach($genres as $value) {
			echo "<li><input type='checkbox' value='.{$value['ClassName']}' name='genre' id='{$value['ClassName']}' checked='checked' />
		<label for='{$value['ClassName']}'>{$value['Name']}</label></li>";
			//We're also going to be clever here and generate a new array that will be used for lookups in the track loop
			$genredb[$value['ID']] = $value;
		}
	}
	?>
</ul>
</div>

<div class="thegoods">
<h1 class="instructions">Tap a song to play</h1>

<div id="audiocontrols">

	<div class="social">
				<div class="facebook">
				    <a href="https://www.facebook.com/AudibleCoffee" target="_blank"> <div class="fab_button"></div> </a>
				</div>
				
				<div class="twitter">
					<a href="https://twitter.com/#!/audiblecoffee" target="_blank"> <div class="twi_button"></div> </a>
				</div>
				
				<div class="email">
					<a href="mailto:music@audiblecoffee.com"> <div class="email_button"></div> </a>
				</div>
				
	</div>
	<div id="sharelink"></div>
	<div id="globalcontrols">
	<div id="globalforward"></div>
	<div id="globalback"></div>
	<div id="globalplaypause">
	<div id="globalplay"></div>
	<div id="globalpause"></div>
	</div>
	</div>
	<div id="shufflebuttons">
	<img src="../img/shufflegrey.png" id="shuffle" class="shuffles"/>
	<img src="../img/shuffle.png" id="original-order" class="shuffles"/>
	<span class="onshuffle">On</span>
	<span class="offshuffle">Off</span>
	</div>
</div>

<div class="container">
<?php
	if(!empty($tracks)) {
		foreach($tracks as $value) {
			if(isset($genredb[$value['GenreID']]))
				$trackgenre = $genredb[$value['GenreID']];
			else
				$trackgenre = array(1,"Track","track",0);
			$trackdate = array(date('M',$value['Date']),date('d',$value['Date']));
			echo "<div class='square {$trackgenre['ClassName']}'>
    <!-- DJ Picture -->
    <img src='/mobilepictures/{$value['ArtistImage']}' class='img1' />
    		
    	    <div class='datespace'><span class='date'>{$trackdate[0]}<br/>{$trackdate[1]}</span></div>
    		<div class='box'>	
    		<!-- DJ Name -->
    		<h1>{$value['Artist']}</h1>
    		<!-- Song Title -->
    		<h2>{$value['Title']}</h2>
    		
    		<div class='player'>
				<a id='m{$value['ID']}' class=\"audio {skin:'#010101',showVolumeLevel:false,showTime:true,showRew:false}\" href='/mp3/{$value['MP3File']}'></a>
			</div>
			</div>
	</div>";
		}
	}
	
	
	?>

</div> <!--Container-->
</div> <!--thegoods-->

<nav id="page_nav">
<?php if($nextpage > 0) echo "<a href='page$nextpage.html'></a>";?>
</nav>

<!-- jQuery -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
	<script src="../mobile_inc/jquery.232fd31.min.js"></script>
	<script src="../mobile_inc/debug.js"></script>
	<script src="../mobile_inc/jquery.scrollTo-min.js"></script>
	
<script type="text/javascript">

var infloadmore = false;

//delay
		jQuery(document).ready(function(){
		delayShow();
		});
		
		function delayShow() {
		var secs = 2000;
		setTimeout('jQuery("body").css("visibility","visible");', secs);
		}
		
//checkbox 
		$("input[name=genre]").attr("checked","checked");
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
		//if($('.isotope-item:not(.isotope-hidden)').length < 2)
		//{
		//$('.container').infinitescroll('retrieve')
		//}
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
		//Now check if we have enough..
		setTimeout(function() {
			if($('.isotope-item:not(.isotope-hidden)').length < 4 && !$('.container').data('infinitescroll').options.state.isDone && !infloadmore)
				{
				infloadmore = setInterval(function() { 
					if($('.isotope-item:not(.isotope-hidden)').length < 4 && !$('.container').data('infinitescroll').options.state.isDone)
						{
						$('.container').infinitescroll('retrieve');
						}
					else
						{
						clearInterval(infloadmore);
						infloadmore = false;
						}
					}, 500);
				}
			}, 250)
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
		boxel = $(sitem).parents(".box");
		document.title = boxel.children("h1").text()+' - '+boxel.children("h2").text();
		$(sitem).parents(".square").addClass("playing")	
		$('#globalplay').css('display','none');
		$('#globalpause').css('display','block');
        $('#globalcontrols,#shufflebuttons').fadeIn('slow', function() {})
        };
	
		function playNext(idx,sitem) {
		var $isoItem = $(sitem).parents(".square"),
		$filteredAtoms = $container.data('isotope').$filteredAtoms,
		isoIndex = $filteredAtoms.index(  $isoItem  ),
		
		nextIndex = ( isoIndex + 1 ) % $filteredAtoms.length;
		next = $filteredAtoms.eq( nextIndex ).find('.audio');
		$("#"+"MP_"+next.attr("id")).jPlayer("stop"); 
		next.mb_miniPlayer_play();
		$.scrollTo( $filteredAtoms.eq( nextIndex ), 800, {over:-0.5} );
		
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
		animate : false
		},function( newElements ) {
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
		$('#headerbutton').toggle( 
		function() {
		$('.thegoods').animate({ left: 312 }, 'slow', function() {
		});
		$('#filters').animate({ left: 0 }, 'slow', function() {
		});
		}, 
		function() {
		$('.thegoods').animate({ left: 0 }, 'slow', function() {
		});
		$('#filters').animate({ left: -312 }, 'slow', function() {
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
		
//global previous
		
		function playPrevious(idx,sitem) {
		ID = $('.playing').find('.audio').attr("id");
		var $isoItem = $(sitem).parents(".square"),
		$filteredAtoms = $container.data('isotope').$filteredAtoms,
		isoIndex = $filteredAtoms.index(  $isoItem  ),
		
		nextIndex = ( isoIndex - 1 ) % $filteredAtoms.length;
		$("#"+"MP_"+ID).jPlayer("stop"); 
		next = $filteredAtoms.eq( nextIndex ).find('.audio');
		$("#"+"MP_"+next.attr("id")).jPlayer("stop"); 
		next.mb_miniPlayer_play();
		$.scrollTo( $filteredAtoms.eq( nextIndex ), 800, {over:-0.5} );
		};

	
//global back
		$('#globalback').click(function() { playPrevious(0,$('.playing .box')); });
	
//global forward		
		$('#globalforward').click(function() { 
		ID = $('.playing').find('.audio').attr("id");
		$("#"+"MP_"+ID).jPlayer("stop");
		playNext(0,$('.playing .box'));
		});


//global play/pause (button toggle)		
		$('#globalplaypause').toggle( 
		function() {
		$('#globalplay').css('display','block');
		$('#globalpause').css('display','none');
		$('.playing').find('.play').click();
		}, 
		function() {
		$('#globalplay').css('display','none');
		$('#globalpause').css('display','block');
		$('.playing').find('.play').click();
		});
	
//global play/pause (button toggle)		
		$('.play').toggle( 
		function() {
		$('#globalplay').css('display','none');
		$('#globalpause').css('display','block');
		}, 
		function() {
		$('#globalplay').css('display','block');
		$('#globalpause').css('display','none');
		});

//Whats your roast color change		
		$("#roastbutton").hover(function(){
		$("#filters h5").css('color', '#f710ef');
		}, function(){
		$("#filters h5").css('color', 'white');
		});
		
$(".square").click(function(){
		$("#audiocontrols").animate({ bottom: 0 }, 'slow', function() {
		});
		$(".square").find(this).css('color', '#f710ef');
		});

		$('#sharelink').toggle(function() {
		$(".social").css('display', 'block');
		}, 
		function() {
		$(".social").css('display', 'none');
		});
		
		
</script>        

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-27304177-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

  
	
</body>
</html>

