// JavaScript Document Copyright MSL-Software.net 2013

// sizerPenisClass
//***************************************** sizerPenisClass *************************************************/
sizerPenisClass.prototype = new penisClass();
function sizerPenisClass()
{
	this.state = 1;
}

sizerPenisClass.prototype.drawErect = function(context)
{
	var length = this.data.erect.length;
	var width = this.data.erect.width;
	var shaft = length - width;
	
	var xhead = Math.round((width * this.data.erect.yhead) / 100);
	var yhead = Math.round((width * this.data.erect.xhead) / 100);
	var topShift = Math.round((width - yhead) /2);
	
	
	//centre image
	var posY = Math.round((this.canvasY - width) / 2);
	
	context.drawImage(this.image, 0,0, 231, 95, 0, posY, shaft, width);
	context.drawImage(this.image, 231, 0, 95, 95, shaft, posY, width, width);
	if(this.data.erect.skin > 1) 
	{
		context.drawImage(this.image, this.imgMap[this.data.erect.skin], 0, 95, 95, shaft, posY, width, width);
	}
	else
	{
		
		context.drawImage(this.image, this.imgMap[this.data.erect.skin], 0, 95, 95, length - xhead, posY + topShift, xhead, yhead);
		//add folded back skin if required
		if(this.data.erect.skin == 1) context.drawImage(this.image, this.imgMap[5], 0, 95, 95, shaft, posY, width, width);
	}
}

sizerPenisClass.prototype.drawFlaccid = function(context)
{
	var length = this.data.flaccid.length;
	var width = this.data.flaccid.width;
	var shaft = length - width;
	
	var xhead = Math.round((width * this.data.flaccid.yhead) / 100);
	var yhead = Math.round((width * this.data.flaccid.xhead) / 100);
	var topShift = Math.round((width - yhead) /2);
	
	//centre image
	var posY = Math.round((this.canvasY - width) / 2);
	context.drawImage(this.imageflaccid, 0,0, 231, 95, 0, posY, shaft, width);
	context.drawImage(this.imageflaccid, 231,0, 95, 95, shaft, posY, width, width);
	if(this.data.flaccid.skin > 1) 
	{
		context.drawImage(this.imageflaccid, this.imgMap[this.data.flaccid.skin], 0, 95, 95, shaft, posY, width, width);
	}
	else
	{
		
		context.drawImage(this.imageflaccid, this.imgMap[this.data.flaccid.skin], 0, 95, 95, length - xhead, posY + topShift, xhead, yhead);
		//add folded back skin if required
		if(this.data.flaccid.skin == 1) context.drawImage(this.imageflaccid, this.imgMap[5], 0, 95, 95, shaft, posY, width, width);
	}
}
sizerPenisClass.prototype.morphFrame = function(framecnt, frames)
{
	var context = this.canvasObj.getContext("2d");
	context.clearRect(0,0,this.canvasX,this.canvasY);
	
	var length = this.startLength + Math.round(((this.endLength - this.startLength)/frames) * framecnt);
	var width = this.startWidth + Math.round(((this.endWidth - this.startWidth)/frames) * framecnt);
	var shaft = length - width;
	
	var xhead = this.startXhead + Math.round(((this.endXhead - this.startXhead)/frames) * framecnt);
	var yhead = this.startYhead + Math.round(((this.endYhead - this.startYhead)/frames) * framecnt);
	var topShift = Math.round((width - yhead) /2);
	
	//centre image
	var posY = Math.round((this.canvasY - width) / 2);
	
	var percdone = Math.round((framecnt/frames) * 100);
	
	
	if( ( (this.state && percdone > 80) || (!this.state && percdone < 20) ) )
	{
		//drawing cock 0 (flaccid)
		context.drawImage(this.imageflaccid, 0,0, 231, 95, 0, posY, shaft, width);
		context.drawImage(this.imageflaccid, 231,0, 95, 95, shaft, posY, width, width);
	
		var imgNum = this.data.flaccid.skin;
		if(this.data.flaccid.skin == 4) //only do the foreskin anim if flaccid is covered
		{
			if( percdone > 80  || percdone < 20) imgNum = 3;
			if( percdone > 90  || percdone < 10) imgNum = 2;
		}
		
		if( this.data.flaccid.skin >1 ) //foreskin
		{
			context.drawImage(this.imageflaccid, this.imgMap[imgNum], 0, 95, 95, shaft, posY, width, width);
		}
		else
		{
			context.drawImage(this.imageflaccid, this.imgMap[imgNum], 0, 95, 95, length - xhead, posY + topShift, xhead, yhead);
			if(this.data.flaccid.skin == 1) context.drawImage(this.imageflaccid, this.imgMap[5], 0, 95, 95, shaft, posY, width, width);
		}
	}
	else
	{
		//drawing cock 1 (erect)
		context.drawImage(this.image, 0,0, 231, 95, 0, posY, shaft, width);
		context.drawImage(this.image, 231,0, 95, 95, shaft, posY, width, width);
		
		if( this.data.erect.skin >1 ) //foreskin
		{
			context.drawImage(this.image, this.imgMap[this.data.erect.skin], 0, 95, 95, shaft, posY, width, width);
		}
		else
		{
			context.drawImage(this.image, this.imgMap[this.data.erect.skin], 0, 95, 95, length - xhead, posY + topShift, xhead, yhead);
			if(this.data.erect.skin == 1) context.drawImage(this.image, this.imgMap[5], 0, 95, 95, shaft, posY, width, width);
		}
	
	}
	
	return { 'length': length, 'girth': Math.round((width * .909) * Math.PI)};	
}

//***************************************** end sizerPenisClass ************************************************/







//sizerClass
//***************************************** sizerClass ************************************************/
function sizerClass() {}
sizerClass.prototype = { offsetX: 0,  pointerX: 0,  offsetY: 0,  pointerY: 0, moveMeasure: false, length: 0, girth: 0, maxlength: 458, allowresize: true };
sizerClass.prototype.constuctor = function(cock)
{
	this.cock = cock;
	this.length = this.cock.getLength();
	this.girth = this.cock.getGirth();
	this.width = Math.round( this.girth/ Math.PI );
	
	this.matrixHeight = parseInt($('#gthdiv').css('height'));
	this.ruleHeight = parseInt($('#gthrule').css('height'));
	this.ruleOffset = Math.round(this.ruleHeight - (this.matrixHeight / 2)); 
	
	this.init();
}
sizerClass.prototype.init = function()
{
	document.getElementById('pointer').style.left = this.length + "px";
	document.getElementById('gthrule').style.top = ((0-this.ruleOffset) + this.girth) + "px";
	this.update();
}
sizerClass.prototype.startX = function(e)
{
	e.preventDefault();
	if(this.cock.isErect() && !this.allowresize) this.moveMeasure= false;
	else this.moveMeasure = true;
	var pointerPos = $('#pointer').position();
	this.offsetX = e.pageX - pointerPos.left;
}
sizerClass.prototype.moveX = function(e)
{
	e.preventDefault();
	x = e.pageX - this.offsetX;
	
	if(!this.cock.isErect()) maxlength = this.cock.data.erect.length; //stop flaccid being bigger than erect
	if( this.moveMeasure && x < this.maxlength )
	{
		if( x > (this.width * 1.5) )
		{
			this.length = x;
			document.getElementById('pointer').style.left = this.length + "px";
			this.update();
			this.cock.drawNewSize(this.length, this.width);	
		}
		
	}
}
sizerClass.prototype.startY = function(e)
{
	e.preventDefault();
	if(this.cock.isErect() && !this.allowresize) this.moveMeasure= false;
	else this.moveMeasure = true;
	var pointerPos = $('#gthrule').position();
	this.offsetY = e.pageY - pointerPos.top;
}
sizerClass.prototype.moveY = function(e)
{
	e.preventDefault();
	y = e.pageY - this.offsetY;		
	if( this.moveMeasure && y < 0 && y > -240 )
	{
		document.getElementById('gthrule').style.top = y + "px";
		
		//pixelWidth = getwidth(pixelGirth);
		//this.pixelGirth = -292 + (intGirth * 1.5);
		/*if( pixelLength < headlen + spacer ) //this traps odd sizes and increases the length
		{
			pixelLength = headlen + spacer;
			document.getElementById('pointer').style.left = pixelLength + "px";
		}*/
		//calcDisplay(pixelLength, getwidth(pixelGirth) );
		if(this.update()) this.cock.drawNewSize(this.length, this.width);	
	}
}

sizerClass.prototype.update = function()
{
	var skin = ''; //document.getElementById('colourinx').value;
	var pointerPos = $('#gthrule').position();
	
	intGirth = Math.round((pointerPos.top + this.ruleOffset) * this.cock.invertScale() );
	this.girth = Math.round(pointerPos.top + this.ruleOffset);
	this.width = Math.round( this.girth/ Math.PI );
	
	intLength = Math.round(this.length * this.cock.invertScale());
	intWidth = Math.round(this.width * this.cock.invertScale());
	if(intWidth < 13) return false;
	
	document.getElementById('length').value = intLength;
	document.getElementById('girth').value = intGirth;
	document.getElementById('width').innerHTML = "WIDTH: " + this.mmToInch( intWidth ) + "&quot; (" + intWidth + " mm)";
	
	return true;
}
sizerClass.prototype.setSize = function(length, girth)
{
	if(this.cock.isErect() && !this.allowresize) this.moveMeasure= false;
	else
	{
		this.length = Math.round(length * this.cock.scale);
		this.girth = Math.round( girth * this.cock.scale );
		this.width = Math.round( this.girth / Math.PI  );
		
		document.getElementById('pointer').style.left = this.length + "px";
		document.getElementById('gthrule').style.top = ((0-this.ruleOffset) + this.girth ) + "px";
		
		//this.update();
		this.cock.drawNewSize(this.length, this.width, '');	
	}
}
sizerClass.prototype.morph = function(length, girth)
{
	this.length = length;
	this.girth = girth
	//alert(girth);
	this.width = Math.round( this.girth/ Math.PI );
	document.getElementById('pointer').style.left = this.length + "px";
	document.getElementById('gthrule').style.top = ((0-this.ruleOffset) + this.girth) + "px";
	this.update();
}
sizerClass.prototype.morphComplete = function()
{
	this.morph(this.cock.getLength(), this.cock.getGirth());
}
sizerClass.prototype.mmToInch = function( mm )
{
	return ( Math.round((mm * 100)/254) ) / 10;	
}



//***************************************** headSizerClass ************************************************

function headSizerClass() {}
headSizerClass.prototype = { offset: 0,  pointer: 0,  moveMeasure: false, pointerObj: '',  selectObj: '' };
headSizerClass.prototype.constuctor = function(pointerObj, selectObj, perc, cock) { 
	this.cock = cock;
	this.pointerObj = pointerObj; 
	this.selectObj = selectObj;
	this.setPointer(perc);
	this.setPercentage(perc); 
}
headSizerClass.prototype.start = function(e)
{
	e.preventDefault();
	this.moveMeasure= true;
	var pointerPos = $('#' + this.pointerObj).position();
	this.offset = e.pageX - pointerPos.left;
}
headSizerClass.prototype.move = function(e)
{
	//e.preventDefault();
	var x = e.pageX - this.offset;
	if( this.moveMeasure && x < 100 && x > 0 && !disable)
	{
		this.pointer = x;
		this.setPercentage(	Math.round( (this.pointer / 3.3 ) + 80 ) );	
		this.setPointer( Math.round( (this.pointer / 3.3 ) + 80 ) );
		this.adjustHead();			
	}
}
headSizerClass.prototype.setPercentage = function(perc)
{
	document.getElementById(this.selectObj).value = perc;
}
headSizerClass.prototype.setPointer = function(perc)
{
	this.pointer = Math.round((perc - 80) * 3.3 );
	document.getElementById(this.pointerObj).style.left = this.pointer + "px";
	this.adjustHead();
}
headSizerClass.prototype.adjustHead = function()
{
	cock.adjustHead( document.getElementById('xhead').value, document.getElementById('yhead').value );
}

headSizerClass.prototype.redraw = function()
{
	document.getElementById('xhead').value = cock.getXhead();
	document.getElementById('yhead').value = cock.getYhead();
	document.getElementById('slideX').style.left =  Math.round((cock.getXhead() - 80) * 3.3 ) + "px";
	document.getElementById('slideY').style.left = Math.round((cock.getYhead() - 80) * 3.3 ) + "px";
}
//***************************************** end headSizerClass ************************************************

//general non class functions
function savechanges()
{
	var url = "";
	var length = document.getElementById('length').value;
	var girth = document.getElementById('girth').value;
	
	var xhead = cock.data.erect.xhead;
	var yhead = cock.data.erect.yhead;
	var fxhead = cock.data.flaccid.xhead;
	var fyhead = cock.data.flaccid.yhead;
	
	var skin = cock.data.erect.skin;
	var col = cock.data.erect.colour;
	
	var fskin = cock.data.flaccid.skin;
	var fcol = cock.data.flaccid.colour;
	
	var ballwidth = document.getElementById('ballWidth').value;
	
	if(cock.isErect())
		url = "state=erect&length=" + length + "&girth=" + girth + "&xhead=" + xhead + "&yhead=" + yhead +"&skin=" + skin + "&colour=" + col;
	else url = "flength=" + length + "&fgirth=" + girth + "&fxhead=" + fxhead + "&fyhead=" + fyhead +"&fskin=" + fskin + "&fcolour=" + fcol + "&ballwidth=" + ballwidth;
	
	$.post("skins/save", url, function(data) {
		alters = data.split('-');
		if(alters[0] >= 2)
		{ 
			theSizer.allowresize = false;
			document.getElementById('length').disabled = true;
			document.getElementById('girth').disabled = true;
		}
		message.show("VisualSizer", alters[1]);
		document.getElementById('message').innerHTML = alters[2];
	});
}
function loadImageMap()
{
	var imageObj = new Image();
	var col = document.getElementById('colour').value;
	timeout = 0;
	if(col == 'b') imageObj.src = "images/parts/b.png";
	else if (col == 's') imageObj.src = "images/parts/s.png";
	else imageObj.src = "images/parts/w.png";
	
	timer=setInterval( function()
	{
		if(imageObj.complete || timeout == 1)
		{
			window.clearInterval(timer);
			if(timeout == 1 ) alert('cannot load imagery');
			cock.loadImageMap(imageObj, col);
		}
		else
		{
			timeout++;
		}
		
	}, 200);
}

function initSizer()
{
	cock.loadImages(imageObj, imageObj2);
	
	headSizerX.constuctor('slideX','xhead', cock.data.erect.xhead, cock );
	headSizerY.constuctor('slideY','yhead', cock.data.erect.yhead, cock );
	
	headSizerClass.prototype.adjustHead();
	document.getElementById('state').innerHTML = cock.getName();
	cockMorph();
}

function setSize()
{
	theSizer.setSize(document.getElementById("length").value, document.getElementById("girth").value);
}
function setSkin()
{
	var skin = 0;
	if(document.getElementById('adjust-radio').checked)
	{
		//adjustable
		if(document.getElementById('tskin').checked ) skin = 1;
		document.getElementById('foreskins').disabled = true;
		$('#slidercont').slideDown('fast');
	}
	else //foreskin
	{
		skin = document.getElementById('foreskins').value;
		document.getElementById('foreskins').disabled = false;
		$('#slidercont').slideUp('fast');
	}
	cock.setSkin(skin);	
	cock.draw();

}
function getSkin()
{
	var skin = cock.getSkin();
	var colour = cock.getColour();
	if(skin == 0)
	{
		document.getElementById('adjust-radio').checked = true;
		document.getElementById('foreskins').disabled = true;
		$('#slidercont').slideDown('fast');
	}
	else if(skin == 1) 
	{
		document.getElementById('adjust-radio').checked = true;
		document.getElementById('tskin').checked = true;
		document.getElementById('foreskins').disabled = true;
		$('#slidercont').slideDown('fast');
	}
	else
	{
		document.getElementById('foreskin-radio').checked = true;
		document.getElementById('foreskins').disabled = false;
		document.getElementById('foreskins').value = skin;
		$('#slidercont').slideUp('fast');
	}
	document.getElementById("colour").value = colour;
}
