// JavaScript Document
function TurnOn(control)
{
	document.getElementById("select0").disabled=true;
	document.getElementById("select1").disabled=true;
	document.getElementById("select2").disabled=true;
	document.getElementById("select3").disabled=true;
	document.getElementById("select4").disabled=true;
	document.getElementById("select5").disabled=true;
    {
        if(control == '0' ) { document.getElementById("select0").disabled=false;  }
        if(control == '1' )  { document.getElementById("select1").disabled=false; }
        if(control == '2' )  { document.getElementById("select2").disabled=false;  }
        if(control == '3' )  { document.getElementById("select3").disabled=false;  }
        if(control == '4' )  { document.getElementById("select4").disabled=false;  }
        if(control == '5' )  { document.getElementById("select5").disabled=false; }

        if(control == '6')
        {
        		document.getElementById("customvis").disabled=false;
				showCustom();
        }
    }
}
function loadpreset(theid)
{
	loader.closeDiv('fast');
	presetid = theid;
	if( theid == "custom" )
	{
		
		if( thevis != 'graph' )
		{
			$('#framecontainer').show();
			$('#graphcont').hide();
			$('#itemstab').hide();
			var cusl = cock.scaleTomm(cock.data.erect.length);
			var cusg = cock.scaleTomm(cock.data.erect.girth);
			var cusc = cock.data.erect.colour;
			var cskin = cock.data.erect.skin;
			var arg = arg + "&clength=" + cusl + "&cgirth=" + cusg + "&ccolour=" + cusc + "&cskin=" + cskin;
			arg = path + arg + "&preset=" + theid + "&0=" + theid;
			$('#lineupframe').hide();
			lineupframe.location=arg;
			$('#lineupframe').load( function() { $('#lineupframe').fadeIn('slow'); } );
		}
		else 
		{
			$('#framecontainer').hide();
			$('#graphcont').fadeIn('fast');
			if(scalePerc == 1) $('#itemstab').show(); //only show the objects if the scale is 1
			data = "Custom Cock|";
			data += cock.scaleTomm(cock.data.erect.length) + "|";
			data += cock.scaleTomm(cock.data.erect.girth) + "|";
			data += cock.data.erect.xhead + "|";
			data += cock.data.erect.yhead + "|";
			data += cock.data.erect.colour + "|";
			data += cock.data.erect.skin + "|";
			data += cock.scaleTomm(cock.data.flaccid.length) + "|";
			data += cock.scaleTomm(cock.data.flaccid.girth) + "|";
			data += cock.data.flaccid.xhead + "|";
			data += cock.data.flaccid.yhead + "|";
			data += cock.data.flaccid.colour + "|";
			data += cock.data.flaccid.skin + "|";
			data += "Custom Cock" + "|";
			data += "" + "|";
		
		cockTo(righttimer, 20, rightfcnt, data);
		}
	}
	else if ( parseInt(theid) > 0 )
	{
		
		if( thevis != 'graph')
		{
			$('#framecontainer').show();
			$('#graphcont').hide();
			$('#itemstab').hide();
			var arg = path + "&preset=" + theid + "&0=" + theid;
			$('#lineupframe').hide();
			lineupframe.location=arg;
			$('#lineupframe').load( function() { $('#lineupframe').fadeIn('slow'); } );
		}
		else
		{


			$('#framecontainer').hide();
			$('#graphcont').fadeIn('fast');
			if(scalePerc == 1) $('#itemstab').show(); //only show the objects if the scale is 1
			$.post('http://localhost/visualier/ajaxgetpreset.php', 'preset='+ theid, function(data) {
				$('.response_val').html(data);
				var res = $('.response_val').html();
				cockTo(righttimer, 20, rightfcnt, res);
				
			});
		}
	}
}
function changevis(vis)
{
	thevis = vis;
	if(thevis == "vis") { path = "index.php?rt=visdisplay&pg=visprofilerview&"; document.getElementById('titlespan').innerHTML = "The Profiler Visualisation"; }
	else if(thevis == "preset") { path = "index.php?rt=visdisplay&pg=visinspectorview&"; document.getElementById('titlespan').innerHTML = "The 'Inspector' line up Visualisation"; }
	else if(thevis == "mission") { path = "index.php?rt=visdisplay&pg=vismissionaryview&"; document.getElementById('titlespan').innerHTML = "The 'Missionary' Visualisation"; }
	else { path = "";  document.getElementById('titlespan').innerHTML = "State Morph Visualisation"; }
	
	if ( parseInt(presetid) > 0 ) loadpreset(presetid);
	else if (presetid == "custom")loadpreset(presetid);
}


function showCustom()
{
	$('#measurecont').animate({left:0},500);
	$('#mask').fadeTo('fast', 0.1);
	document.getElementById('girth').value = cock.scaleTomm(cock.getGirth());
}
function hideCustom()
{
	$('#measurecont').animate({left:-850},500);
	$('#mask').fadeOut('fast');
	loadpreset("custom");
}


function cockMorph(cock, timer, frames, framecnt)
{
	if(!cock.morphing())
	{
		framecnt = 0;
		cock.morphStart();
		
		timer=setInterval( function()
		{
			if(framecnt == frames )
			{
				window.clearInterval(timer);
				cock.morphComplete();
				lmorphing = false;
				
				if(rightcock.isErect()) document.getElementById('rightmorphbut').innerHTML = "Morph To Flaccid";
				else document.getElementById('rightmorphbut').innerHTML = "Morph Erect";
				if(leftcock.isErect()) document.getElementById('leftmorphbut').innerHTML = "Morph To Flaccid";
				else document.getElementById('leftmorphbut').innerHTML = "Morph Erect";
				
				showInfo();
			}
			else
			{
				cock.morphFrame(framecnt, frames);
				framecnt ++;
			}	
		}, 40);
	}
} 	
function cockTo(timer, frames, framecnt, data)
{
	
	$('#righttimer').show();
	if($('.response_val').html() !="")
	{
		
		framecnt = 0;
		var dArray = data.split("|");
		if(rightcock.isErect()) rightcock.morphTo( dArray[1], dArray[2], dArray[3], dArray[4]);
		else rightcock.morphTo( dArray[7], dArray[8], dArray[9], dArray[10]);
		
		timer=setInterval( function()
		{
			if(framecnt == frames )
			{
				window.clearInterval(timer);
				rightcock.constuctor("right", { 
				erect: { length: dArray[1], girth: dArray[2], xhead: dArray[3], yhead: dArray[4], colour: dArray[5], skin: dArray[6], 'name': dArray[0] }, 
				flaccid: { length: dArray[7], girth: dArray[8], xhead: dArray[9], yhead: dArray[10], colour: dArray[11] , skin: dArray[12], 'name': dArray[0]} 
				}, scale );
				rightcock.loadImages(document.getElementById('imgCanvas_'+ dArray[5]), document.getElementById('imgCanvas_'+ dArray[11]) );
				rightcock.isMorphing = false;
				rightcock.draw();
				lmorphing = false;
				rightframes = getFrameNum(rightcock);
				
				document.getElementById('descriptiondiv').innerHTML = "<h1>"+dArray[13]+"</h1>"+dArray[14];
				estimated = dArray[15];
				
				showInfo();
				$('#righttimer').hide();
			}
			else
			{
				rightcock.morphFrame(framecnt, frames);
				framecnt ++;
			}	
		}, 40);
	}
} 
function displaytapes()
{
	var cbox = document.getElementById('tapes');
	var metric = 0;
	if( document.getElementById('metrictape').checked ) metric = 1;
	if(cbox.checked)
	{
		leftcock.showTape(metric);
		rightcock.showTape(metric);
	}
	else 
	{
		leftcock.hideTape();
		rightcock.hideTape();
	}
	leftcock.draw();
	rightcock.draw();
}
function showInfo()
{
	lhard = leftcock.getLength();
	rhard = rightcock.getLength();
	var lvol = leftcock.getVolume();
	var rvol = rightcock.getVolume();
	
	if( lhard < rhard ) 
	{
		document.getElementById('leftdetails').innerHTML = returnSmaller( rhard, lhard);
		document.getElementById('rightdetails').innerHTML = returnLarger( rhard, lhard);
	}
	else
	{
		document.getElementById('leftdetails').innerHTML = returnLarger( lhard, rhard);
		document.getElementById('rightdetails').innerHTML = returnSmaller( lhard, rhard);
	}
	document.getElementById('leftVol').innerHTML = returnVol( lvol, rvol);
	document.getElementById('rightVol').innerHTML = returnVol( rvol, lvol);
	
	$('.statetxt').removeClass('red');
	$('.statetxt').removeClass('greentxt');
	if(leftcock.isErect()) { $('#leftstate').addClass('red'); document.getElementById('leftstate').innerHTML = "ERECT" }
	else { $('#leftstate').addClass('greentxt'); document.getElementById('leftstate').innerHTML = "Flaccid" }
	if(rightcock.isErect()) { $('#rightstate').addClass('red'); document.getElementById('rightstate').innerHTML = estimated + "ERECT" }
	else { $('#rightstate').addClass('greentxt'); document.getElementById('rightstate').innerHTML = estimated + "Flaccid" }
	
	document.getElementById('leftname').innerHTML = leftcock.getName();
	document.getElementById('rightname').innerHTML = rightcock.getName();
		
	function returnSmaller( larger, smaller)
	{
		var perc = 100 - Math.round( (smaller / larger) * 100 );
		return "<h2>" + perc + "% Shorter</h2>";
	}
	function returnLarger( larger, smaller)
	{
		var perc = Math.round( (larger / smaller) * 100 ) - 100;
		return "<h2>" + perc + "% Longer</h2>";
	}
	function returnVol( volume, myvolume)
	{
		perc = Math.round( ((volume / myvolume) * 100 ) );
       	if( perc < 100 ) { perc = 100 - perc; return "Vol=<b>" + volume + "</b>cm&sup3;<br />" + perc + "% <b>SMALLER</b> by volume"; }
       	else if( perc > 100 ) { perc = perc - 100; return "Vol=<b>" + volume + "</b>cm&sup3;<br />" + perc + "% <b>BIGGER</b> by volume"; }
		else { return "Vol=" + volume + "cm&sup3;<br />" + perc + "% equal volume"; }
	}
}

function sizerMorph()
{
	if(!morphing)
	{
		frames = 20;
		framecnt = 0;
		cock.morphStart();
		
		document.getElementById('togglesize').innerHTML = "Adjust " + cock.getName();
		
		timer=setInterval( function()
		{
			if(framecnt == frames )
			{
				window.clearInterval(timer);
				cock.morphComplete();
				theSizer.morphComplete();
				headSizerClass.prototype.redraw();
				getSkin();
			}
			else
			{
				var morphsizes = cock.morphFrame(framecnt, frames);
				theSizer.morph(morphsizes.length, morphsizes.girth);
				theSizer.moveMeasure = false; //stop user trying to adjust
				framecnt ++;
			}
			
		}, 40);
	}
}
function getFrameNum(thecock)
{
	var frames = Math.round((thecock.data.erect.length * thecock.data.erect.girth) / 900);
	if(frames < 20) frames = 20;
	if(frames > 100) frames = 100;
	return frames;
}