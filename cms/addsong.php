<?php 
include("../includes/init.php");
if(!checkAdminLogin()) {
	header("Location: index.php");
	die();
}
if(isset($_POST['submit']))
{
	try {
		//We have a submitted track! Lets sanitize and check standard input...
		$required = array("genre_type"=>"int", "artist"=>"normal", "song_title"=>"normal", "description"=>"normal", "sharing_title"=>"normal");
		foreach($required as $key=>$value) {
			if(!empty($_POST[$key])) {			
				switch($value) {
					case 'int':
						$$key = Sanitize::int($_POST[$key]);
					break;
					default:
					case 'normal':
						$$key = Sanitize::sql_string($_POST[$key]);
					break;
				}
			}
			else {
				throw new Exception('Missing Required Field: '.$key);
			}
		}
		//Lets try and parse the date
		if(!empty($_POST['date']))
			$date = strtotime($_POST['date']);
		if(!$date)
			throw new Exception('Invalid Date');
		//Finally, lets save the files; I'm not going to do a massive amount of checking as its admin only.
		if(!empty($_FILES['picture']['name'])) {
			$picname = Sanitize::system_string($_FILES['picture']['name']);
			$pictureloc = $config['picturefolder'].$picname;
			if (!move_uploaded_file($_FILES['picture']['tmp_name'], $pictureloc)) {
				throw new Exception('Picture Upload Error');
			}
		}
		if(!empty($_FILES['mobilepicture']['name'])) {
			$mobilepicname = Sanitize::system_string($_FILES['mobilepicture']['name']);
			$mobilepictureloc = $config['mobilepictures'].$mobilepicname;
			if (!move_uploaded_file($_FILES['mobilepicture']['tmp_name'], $mobilepictureloc)) {
				unlink($pictureloc);
				throw new Exception('Mobile Picture Upload Error');
			}
		}
		if(!empty($_FILES['ogg_file']['name'])) {
			$oggname = Sanitize::system_string($_FILES['ogg_file']['name']);
			$oggloc = $config['trackfolder'].$oggname;
			if (!move_uploaded_file($_FILES['ogg_file']['tmp_name'], $oggloc)) {
				unlink($pictureloc);
				unlink($mobilepictureloc);
				throw new Exception('OGG File Upload Error');
			}
		}
		if(!empty($_FILES['mp3_file']['name'])) {
			$mp3name = Sanitize::system_string($_FILES['mp3_file']['name']);
			$mp3loc = $config['trackfolder'].$mp3name;
			if (!move_uploaded_file($_FILES['mp3_file']['tmp_name'], $mp3loc)) {
				unlink($pictureloc);
				unlink($mobilepictureloc);
				unlink($oggloc);
				throw new Exception('MP3 File Upload Error');
			}
		}
		//Finally! If we're still here then lets add the track.
		if(addTrack($genre_type, $song_title, $artist, $description, $sharing_title, $date, $picname, $mobilepicname, $oggname, $mp3name)) {
			header("Location: manage.php?success=1&type=add");
			die();
		}
		else {
			unlink($pictureloc);
			unlink($mobilepictureloc);
			unlink($oggloc);
			unlink($mp3loc);
			throw new Exception('Error Adding Track to Database');
		}
	}
	catch (Exception $e) {
		$message = $e->getMessage();	
	}
}
?>
<!doctype html>

<head>
	<meta charset='utf-8'> 
    <meta http-equiv="Cache-control" content="public">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
     <title>Audible Coffee</title>
    
	<link rel="icon" href="../../img/Large_Mug.ico" type="image/x-icon"> 
    <link rel="shortcut icon" href="../../img/Large_Mug.ico" type="image/x-icon">
   
</head>

<style type="text/css">
body{background-color: black;
	 font-family: 'Quattrocento Sans', sans-serif; 
	 font-weight: 100;}
	 
#container{position: relative;
			margin-left: auto;
			margin-right:auto;
			display: block;
			width:800px;
			top:70px;}

p{color:#848484;
  letter-spacing: 1.5px;
  font-size: 15px;}

#logo {
	position: relative;
	margin-left: auto;
	margin-right:auto;
	margin-bottom:27px;
	display: block;
	}

h2{color:white;
   font-family: 'Quattrocento Sans', sans-serif; 
   font-weight: 100;
   font-size: 20px;
   position: relative;
	top: -48px;
	left: 100px;}
	
h1{color:#848484;
   font-family: 'Quattrocento Sans', sans-serif; 
   font-weight: 100;
   font-size: 20px;
   position: relative;
	top: 13px;
	left: -1px;}
	
	
.genreinput{color:#848484;
   font-family: 'Quattrocento Sans', sans-serif; 
   font-weight: 100;
   font-size: 20px;
   position: relative;
	top: 13px;
	left: 144px;}
   
#adminlogin{left: 58px;
			display: block;
			position: relative;}
			
input, select {
	width:600px;
	height: 45px;
	margin-bottom: 5px;
	font-size:20px;
	}
   
.submit{top: 0px;
		left: 4px;
		display: block;
		position: relative;}
		
.middle{margin-bottom: 13px;}

.fileinput{color: #848484;
		   font-size: 12px;}

ol{list-style: none;
   }

#genre_type{width:300px;
			position: relative;
			left:157px;}
			
#theforms{position: relative;
		  left:68px;}
		  
#submit{
	height: 50px;
	width: 200px;
	position: relative;
	left: 200px;
	top: 20px;
	border-radius: 15px;}
	
.fileinput{margin-bottom:-5px;}

#topfile{margin-top:23px;}

</style>


<body>



<div id="container">
<img src="http://www.audiblecoffee.com/img/AC_LOGO-Rasterized.png" id="logo" />

<form method="post" enctype="multipart/form-data" action="addsong.php" id="theforms">
<ol>
<?php if(isset($message)) echo '<li style="font-weight:bold;color:red;">'.$message.'</li>';?>
<li>
<h1 class="genreinput">To start, pick the genre of your song!</h1>
<select name="genre_type" id="genre_type">
			<?php foreach(getGenres() as $value)
				{
				echo "<option value=\"{$value['ID']}\">{$value['Name']}</option>";
				}
    		echo '</select>';
    		?>
</li>
<li>
	<h1 class="nameoffield">Artist</h1>
	<input type="text" name="artist" id="artist" >
</li>
<li>
	<h1 class="nameoffield">Title</h1>
	<input type="text" name="song_title" id="song_title" >
</li>
<li>
<h1 class="nameoffield">Description</h1>
<textarea name="targetme" rows="7" cols="40" name="description" id="description">

</textarea>
</li>
<li>
	<h1 class="nameoffield">Description</h1>
	<input type="text" name="description" id="description" >
</li>
<li>
	<h1 class="nameoffield">Date</h1>
	<?php $defaultdate = date('m/d/y');
	echo "<input type=\"text\" name=\"date\" id=\"date\" onFocus=\"if(this.value=='$defaultdate')this.value='';\" value=\"$defaultdate\">";
	?>
</li>
<li>
	<h1 class="nameoffield">Sharing Text</h1>
	<input type="text" name="sharing_title" id="sharing_title" >
</li>
<li class="fileinput" id="topfile">
	<h1 class="nameoffield">DJ Picture (300x300 px)</h1>
	<input type="file" name="picture" id="picture" class="fileinput">
</li>
<li class="fileinput">
	<h1 class="nameoffield">MOBILE DJ Picture (150x150 px)</h1>
	<input type="file" name="mobilepicture" id="mobilepicture" class="fileinput">
</li>
<li class="fileinput">
	<h1 class="nameoffield">ogg File</h1>
	<input type="file" name="ogg_file" id="ogg_file" class="fileinput">
</li>
<li class="fileinput">
	<h1 class="nameoffield">mp3 File</h1>
	<input type="file" name="mp3_file" id="mp3_file" class="fileinput">
</li>


<li class="submit">
	<input type="submit" name="submit" id="submit" value="submit">
</li>
</ol>
</form>


</div>	
</body>

