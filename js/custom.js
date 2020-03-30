
$(document).ready(function () {
    //When page loads...
        $(".tab_content").hide(); //Hide all content
        $("ul.tabs li:first").addClass("active").show(); //Activate first tab
        $(".tab_content:first").show(); //Show first tab content
        //On Click Event
        $("ul.tabs li").click(function () {
            $("ul.tabs li").removeClass("active"); //Remove any "active" class
            $(this).addClass("active"); //Add "active" class to selected tab
            $(".tab_content").hide(); //Hide all tab content
            var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
            $(activeTab).fadeIn(); //Fade in the active ID content
            return false;
        }); 
        
        $('#login').click(function(){
            $('#login-open').addClass('open');
        });
        $('.close-login').click(function(){
            $('#login-open').removeClass('open');
        });
        $('#forgot-pass').click(function(){
            $('#forgotten-pass-open').addClass('open');
        });
        $('#subs-id').click(function(){
            $('#forgotten-pass-open').removeClass('open');
            $('#subs-id-open').addClass('open');
        });

        $('#back-f-id').click(function(){
            $('#forgotten-pass-open').removeClass('open');
        });
        $('#back-s-id').click(function(){
            $('#subs-id-open').removeClass('open');
        });
        /* $('#enter').click(function(){
            $('#enter-value').addClass('open');
        }); */
		
		$("#check").change(function() {
			var ischecked= $(this).is(':checked');
			if(!ischecked){
				$('#enter-value').removeClass('open');
			}else{
				$('#enter-value').addClass('open');
			}		
			/* alert('uncheckd ' + $(this).val()); */
		});
});





var age = 0;
var eightteen = 1017273600000;
var now = new Date();
var mnths = new Array('','January','February','March','April','May','June','July','August','September','October','November','December');

function chk()
{
	var current = new Date();
	
	var day = $('#day').val();
	var month = $('#month').val();
	var year = $('#year').val();
	
	if( day == "" || month == "" || year == "") return;
	
	var d = new Date(year, month - 1, day, 0, 0, 0, 0);
	
	if( d.valueOf() <= eightteen )
	{
		$('#elegible').addClass('open');
		/*document.getElementById("dob").value = d.valueOf();*/
		age = current.getFullYear() - d.getFullYear();
		document.getElementById('ageline').innerHTML = "I am/was " + age + " years old on the "+ day + " " + mnths[month] +" <br />this year and agree with above";
        return
	}
	else 
	{
		$('#not-elegible').addClass('open');		
	}
}


var leftcock, rightcock;
var imageObj_w = new Image();
var imageObj_s = new Image();
var imageObj_b = new Image();
imageObj_w.src = "images/parts/w.png";
imageObj_s.src = "images/parts/s.png";
imageObj_b.src = "images/parts/b.png";
var tapeImageObj = new Image();
tapeImageObj.src = "images/ruler/taperule.png";
var lefttimer, righttimer, leftframes, rightframes, leftfcnt, rightfcnt;

leftframes = 50;
rightframes =  50;
estimated = "";
var path = "index.php?rt=visdisplay&pg=visgraphview&";
var thevis = 'graph';
//**************
var cock = new sizerPenisClass();
var headSizerX, headSizerY, theSizer;
var disable = false;
var morphing = false;
var skins = new Array("", "t", "q", "u", "v");
var timer = 0;
var frames = 0;
var framecnt = 0;
var scale = 1.5;
var scalePerc = 1;
//**************

$(document).ready(function(e) {
    $('#close-icon').click( function(e) { e.preventDefault(); loader.closeDiv(); });
    $('#exampletab').click(function(e) { e.preventDefault(); loader.setwidth(320); $('#dym-div-inner .listbox').hide(); $('#selectdiv').show(); loader.openDiv(); } );	
    
    $('#vischain').click( function(){ gotoDevicePage('?rt=visualiser&chaingang=true'); } );
    
    $('#visualisertab').click(function(e) { e.preventDefault(); loader.setwidth(320); $('#dym-div-inner .listbox').hide(); $('#selectvis').show(); loader.openDiv();});
    $('#itemstab').click(function(e) { e.preventDefault(); loader.setwidth(320); $('#dym-div-inner .listbox').hide(); $('#selectitem').show(); loader.openDiv(); } );
    
    $('#create').click( hideCustom ) ;
    $('#customcock').click( function(e) { e.preventDefault(); showCustom(); } );
    $('#cancelcustom').click( function() { $('#measurecont').animate({left:-850},500); $('#mask').fadeOut('fast'); } );
    
    $('#tapes').click(displaytapes);
    $('#metrictape').click(displaytapes);
    
    $('#uk').click(function() { hidehands('images/items/ukroll.jpg');} );
    $('#us').click(function() { hidehands('images/items/usroll.jpg');} );
    $('#mouse').click(function() { hidehands('images/items/mouse.jpg');} );
    $('#iphone').click(function() { hidehands('images/items/phone.png');} );
    $('#soda').click(function() { hidehands('images/items/coke.png');} );
    $('#hand').click(function() { showhands(); } );
});
function hidehands(image)
{
$('#leftspace').css('background-image', 'none');
$('#rightspace').css('background-image', 'none');
document.getElementById('leftimg').src = image;
$('#leftimg').fadeIn('fast');
document.getElementById('rightimg').src = image;
$('#rightimg').fadeIn('fast');
loader.closeDiv('fast'); 
}
function showhands()
{
$('#leftspace').css('background-image', 'url(images/ruler/vhandleft.png)');
$('#rightspace').css('background-image', 'url(images/ruler/vhandright.png)');
$('#leftimg').fadeOut('fast');
$('#rightimg').fadeOut('fast');
loader.closeDiv('fast'); 
}
function getDevice()
{
document.cookie="pagewidth="+parseInt($('#container').css('width'))+";  path=/";
var width = parseInt($('#container').css('width'));
loader.setwidth(width);
initCocks();
}
function initCocks()
{

/*Special Area For init Cock*/

leftcock = new comparePenisClass(); 
leftcock.constuctor("left", { 
erect: { length: 220, girth: 109, xhead: 100, yhead: 100, colour: 'w', skin: 1, 'name': 'Your Cock' }, 
flaccid: { length: 134, girth: 89, xhead: 90, yhead: 90, colour: 'w' , skin: 4, 'name': 'Your Cock' }
}, scale 
);

rightcock = new comparePenisClass();
rightcock.constuctor("right", { 
erect: { length: 96, girth: 105, xhead: 90, yhead: 90, colour: 'w', skin: '1', 'name': 'Example' }, 

flaccid: { length: 153, girth: 128, xhead: 100, yhead: 100, colour: 'w' , skin: '4', 'name': 'Example' } 
}, scale
);

getFrameNum(leftcock);
getFrameNum(rightcock);
var context = document.getElementById('imgCanvas_w').getContext("2d");
context.rotate(-90*Math.PI/180);
context.drawImage(imageObj_w, -802,0, 802, 95);

context = document.getElementById('imgCanvas_s').getContext("2d");
context.rotate(-90*Math.PI/180);
context.drawImage(imageObj_s, -802,0, 802, 95);

context = document.getElementById('imgCanvas_b').getContext("2d");
context.rotate(-90*Math.PI/180);
context.drawImage(imageObj_b, -802,0, 802, 95);

leftcock.loadImages(document.getElementById('imgCanvas_w'), document.getElementById('imgCanvas_w'));
leftcock.draw();

rightcock.loadImages(document.getElementById('imgCanvas_w'), document.getElementById('imgCanvas_w'));
rightcock.draw();

document.getElementById('select3').value = '56';
TurnOn('3');
loadpreset($('#select3').val());


/************ custom cock init */
cock.constuctor("cockcanvas", { 
erect: { length: 153, girth: 128, xhead: 100, yhead: 100, colour: 'w', skin: 1, 'name': 'Erect' }, 
flaccid: { length: 96, girth: 105, xhead: 90, yhead: 90, colour: 'w' , skin: 4, 'name': 'Flaccid' }  
}, scale 
);


cock.loadImages(imageObj_w, imageObj_w);
cock.draw();

headSizerX = new headSizerClass();
headSizerY = new headSizerClass();
theSizer = new sizerClass();
theSizer.constuctor( cock );
theSizer.allowresize = '1';
theSizer.maxlength = 456;

headSizerX.constuctor('slideX','xhead', cock.data.erect.xhead, cock );
headSizerY.constuctor('slideY','yhead', cock.data.erect.yhead, cock );

headSizerClass.prototype.adjustHead();
getSkin();

//**************/
}
var menuout = false;




var leftcock, rightcock;
var imageObj_w = new Image();
var imageObj_s = new Image();
var imageObj_b = new Image();
imageObj_w.src = "../images/parts/w.png";
imageObj_s.src = "../images/parts/s.png";
imageObj_b.src = "../images/parts/b.png";
var tapeImageObj = new Image();
tapeImageObj.src = "../images/ruler/taperule.png";
var lefttimer, righttimer, leftframes, rightframes, leftfcnt, rightfcnt;

leftframes = 50;
rightframes =  50;
estimated = "";
var path = "index.php?rt=visdisplay&pg=visgraphview&";
var thevis = 'graph';
//**************
var cock = new sizerPenisClass();
var headSizerX, headSizerY, theSizer;
var disable = false;
var morphing = false;
var skins = new Array("", "t", "q", "u", "v");
var timer = 0;
var frames = 0;
var framecnt = 0;
var scale = 1.5;
var scalePerc = 1;
//**************

$(document).ready(function(e) {
    $('#close-icon').click( function(e) { e.preventDefault(); loader.closeDiv(); });
    $('#exampletab').click(function(e) { e.preventDefault(); loader.setwidth(320); $('#dym-div-inner .listbox').hide(); $('#selectdiv').show(); loader.openDiv(); } );	
    
    $('#vischain').click( function(){ gotoDevicePage('?rt=visualiser&chaingang=true'); } );
    
    $('#visualisertab').click(function(e) { e.preventDefault(); loader.setwidth(320); $('#dym-div-inner .listbox').hide(); $('#selectvis').show(); loader.openDiv();});
    $('#itemstab').click(function(e) { e.preventDefault(); loader.setwidth(320); $('#dym-div-inner .listbox').hide(); $('#selectitem').show(); loader.openDiv(); } );
    
    $('#create').click( hideCustom ) ;
    $('#customcock').click( function(e) { e.preventDefault(); showCustom(); } );
    $('#cancelcustom').click( function() { $('#measurecont').animate({left:-850},500); $('#mask').fadeOut('fast'); } );
    
    $('#tapes').click(displaytapes);
    $('#metrictape').click(displaytapes);
    
    $('#uk').click(function() { hidehands('../images/items/ukroll.jpg');} );
    $('#us').click(function() { hidehands('../images/items/usroll.jpg');} );
    $('#mouse').click(function() { hidehands('../images/items/mouse.jpg');} );
    $('#iphone').click(function() { hidehands('../images/items/phone.png');} );
    $('#soda').click(function() { hidehands('../images/items/coke.png');} );
    $('#hand').click(function() { showhands(); } );
});
function hidehands(image)
{
$('#leftspace').css('background-image', 'none');
$('#rightspace').css('background-image', 'none');
document.getElementById('leftimg').src = image;
$('#leftimg').fadeIn('fast');
document.getElementById('rightimg').src = image;
$('#rightimg').fadeIn('fast');
loader.closeDiv('fast'); 
}
function showhands()
{
$('#leftspace').css('background-image', 'url(../images/ruler/vhandleft.png)');
$('#rightspace').css('background-image', 'url(../images/ruler/vhandright.png)');
$('#leftimg').fadeOut('fast');
$('#rightimg').fadeOut('fast');
loader.closeDiv('fast'); 
}
function getDevice()
{
document.cookie="pagewidth="+parseInt($('#container').css('width'))+";  path=/";
var width = parseInt($('#container').css('width'));
loader.setwidth(width);
initCocks();
}
function initCocks()
{

/*Special Area For init Cock*/

leftcock = new comparePenisClass(); 
leftcock.constuctor("left", { 
erect: { length: 220, girth: 109, xhead: 100, yhead: 100, colour: 'w', skin: 1, 'name': 'Your Cock' }, 
flaccid: { length: 134, girth: 89, xhead: 90, yhead: 90, colour: 'w' , skin: 4, 'name': 'Your Cock' }
}, scale 
);

rightcock = new comparePenisClass();
rightcock.constuctor("right", { 
erect: { length: 96, girth: 105, xhead: 90, yhead: 90, colour: 'w', skin: '1', 'name': 'Example' }, 

flaccid: { length: 153, girth: 128, xhead: 100, yhead: 100, colour: 'w' , skin: '4', 'name': 'Example' } 
}, scale
);

getFrameNum(leftcock);
getFrameNum(rightcock);
var context = document.getElementById('imgCanvas_w').getContext("2d");
context.rotate(-90*Math.PI/180);
context.drawImage(imageObj_w, -802,0, 802, 95);

context = document.getElementById('imgCanvas_s').getContext("2d");
context.rotate(-90*Math.PI/180);
context.drawImage(imageObj_s, -802,0, 802, 95);

context = document.getElementById('imgCanvas_b').getContext("2d");
context.rotate(-90*Math.PI/180);
context.drawImage(imageObj_b, -802,0, 802, 95);

leftcock.loadImages(document.getElementById('imgCanvas_w'), document.getElementById('imgCanvas_w'));
leftcock.draw();

rightcock.loadImages(document.getElementById('imgCanvas_w'), document.getElementById('imgCanvas_w'));
rightcock.draw();

document.getElementById('select3').value = '56';
TurnOn('3');
loadpreset($('#select3').val());


/************ custom cock init */
cock.constuctor("cockcanvas", { 
erect: { length: 153, girth: 128, xhead: 100, yhead: 100, colour: 'w', skin: 1, 'name': 'Erect' }, 
flaccid: { length: 96, girth: 105, xhead: 90, yhead: 90, colour: 'w' , skin: 4, 'name': 'Flaccid' }  
}, scale 
);


cock.loadImages(imageObj_w, imageObj_w);
cock.draw();

headSizerX = new headSizerClass();
headSizerY = new headSizerClass();
theSizer = new sizerClass();
theSizer.constuctor( cock );
theSizer.allowresize = '1';
theSizer.maxlength = 456;

headSizerX.constuctor('slideX','xhead', cock.data.erect.xhead, cock );
headSizerY.constuctor('slideY','yhead', cock.data.erect.yhead, cock );

headSizerClass.prototype.adjustHead();
getSkin();

//**************/
}
var menuout = false;





