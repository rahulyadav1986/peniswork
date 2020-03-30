// JavaScript Document Copyright MSL-Software.net 2013
function penisClass()
{
	this.imgMap =Array( 326, 326, 421, 516, 611, 707);
	this.state = 1;
	this.isMorphing = false;
}
penisClass.prototype.constuctor = function(canvas, data, scale) {
	
	this.data = data;
	this.canvasObj = document.getElementById(canvas);
	this.scale = scale;
	
	this.canvasX = this.canvasObj.width;
	this.canvasY = this.canvasObj.height;
	
	this.data.erect.width = this.scaleToPixels( Math.round( (this.data.erect.girth/Math.PI) * 1.1 ) );
	this.data.flaccid.width = this.scaleToPixels( Math.round( (this.data.flaccid.girth/Math.PI) * 1.1) );
	
	this.data.flaccid.length = this.scaleToPixels(this.data.flaccid.length);
	this.data.erect.length = this.scaleToPixels(this.data.erect.length);
	
	this.data.erect.girth = this.scaleToPixels(this.data.erect.girth);
	this.data.flaccid.girth = this.scaleToPixels(this.data.flaccid.girth);
}
penisClass.prototype.loadImages = function(imgObj, imgObj2)
{
	//used to initalise the images based on the values of col and fcol
	this.image = imgObj;
	this.imageflaccid = imgObj2;
	this.draw();
}
penisClass.prototype.loadImageMap = function(imgObj, col)
{
	//used to alter the col and fcol depending on current state
	if(this.state) this.image = imgObj;
	else this.imageflaccid = imgObj;
	this.setColour(col);
	this.draw();
}

penisClass.prototype.draw = function() 
{
	var context = this.canvasObj.getContext("2d");
	context.clearRect(0,0,this.canvasX,this.canvasY);

	if(this.state) this.drawErect(context);
	else this.drawFlaccid(context);
}

penisClass.prototype.drawNewSize = function(length, width ) {
	if(this.state) 
	{
		this.data.erect.length = Math.round(length);
		this.data.erect.width = Math.round(width * 1.1);
		this.data.erect.girth = Math.round( width * Math.PI );
	}
	else
	{
		this.data.flaccid.length = Math.round(length);
		this.data.flaccid.width = Math.round(width * 1.1);
		this.data.flaccid.girth = Math.round( width * Math.PI );
	}
	this.draw();
}
penisClass.prototype.adjustHead = function( xhead, yhead )
{
	if(this.state) 
	{
		if(this.data.erect.skin < 2)
		{
			this.data.erect.xhead = xhead;
			this.data.erect.yhead = yhead;
		}
		else
		{
			this.data.erect.xhead = 100;
			this.data.erect.yhead = 100;
		}
	}
	else 
	{
		if(this.data.flaccid.skin < 2)
		{
			this.data.flaccid.xhead = xhead;
			this.data.flaccid.yhead = yhead;
		}
		else
		{
			this.data.flaccid.xhead = 100;
			this.data.flaccid.yhead = 100;
		}
	}
	this.draw();
}

penisClass.prototype.drawErect = function(context)
{
	
}

penisClass.prototype.drawFlaccid = function(context)
{
	
}

penisClass.prototype.morphStart = function()
{
	if(this.state)
	{
		this.startLength = this.data.erect.length;
		this.endLength = this.data.flaccid.length;
		this.startWidth = this.data.erect.width;
		this.endWidth = this.data.flaccid.width;
		
		this.startXhead = Math.round((this.startWidth * this.data.erect.yhead) / 100);
		this.startYhead = Math.round((this.startWidth * this.data.erect.xhead) / 100);
		this.endXhead = Math.round((this.endWidth * this.data.flaccid.yhead) / 100);
		this.endYhead = Math.round((this.endWidth * this.data.flaccid.xhead) / 100);
	}
	else
	{
		this.startLength = this.data.flaccid.length;
		this.endLength = this.data.erect.length;
		this.startWidth = this.data.flaccid.width;
		this.endWidth = this.data.erect.width;
		
		this.startXhead = Math.round((this.startWidth * this.data.flaccid.yhead) / 100);
		this.startYhead = Math.round((this.startWidth * this.data.flaccid.xhead) / 100);
		this.endXhead = Math.round((this.endWidth * this.data.erect.yhead) / 100);
		this.endYhead = Math.round((this.endWidth * this.data.erect.xhead) / 100);
	}
	this.isMorphing = true;
}

penisClass.prototype.morphTo = function(length, girth, toxhead, toyhead)
{
	towidth = this.scaleToPixels( Math.round(girth/Math.PI) * 1.1 );
	tolength = this.scaleToPixels(length);
	this.data.flaccid.skin = this.getSkin(); 
	this.data.erect.skin = this.getSkin(); 
	if(this.state)
	{
		this.startLength = this.data.erect.length;
		this.endLength = tolength;
		this.startWidth = this.data.erect.width;
		this.endWidth = towidth;
		
		this.startXhead = Math.round((this.startWidth * this.data.erect.yhead) / 100);
		this.startYhead = Math.round((this.startWidth * this.data.erect.xhead) / 100);
		this.endXhead = Math.round((this.endWidth * toxhead) / 100);
		this.endYhead = Math.round((this.endWidth * toyhead) / 100);
	}
	else
	{
		this.startLength = this.data.flaccid.length;
		this.endLength = tolength;
		this.startWidth = this.data.flaccid.width;
		this.endWidth = towidth;
		
		this.startXhead = Math.round((this.startWidth * this.data.flaccid.yhead) / 100);
		this.startYhead = Math.round((this.startWidth * this.data.flaccid.xhead) / 100);
		this.endXhead = Math.round((this.endWidth * toxhead) / 100);
		this.endYhead = Math.round((this.endWidth * toyhead) / 100);
	}
	this.isMorphing = true;
}

penisClass.prototype.morphComplete = function()
{
	this.state = 1 - this.state;
	this.isMorphing = false;
	this.draw();
}
penisClass.prototype.morphFrame = function(framecnt, frames)
{
		
}

penisClass.prototype.changeLength = function( length )
{
	if(this.state) this.data.erect.length = this.scaleToPixels(length);
    else this.data.flaccid.length = this.scaleToPixels(length);
	this.draw();
}

penisClass.prototype.changeWidth = function( girth )
{
	if(this.state) this.data.erect.width = this.scaleToPixels( Math.round(girth/Math.PI) * 1.1);
    else this.data.flaccid.width = this.scaleToPixels( Math.round(girth/Math.PI) * 1.1);
	this.draw();
}
penisClass.prototype.getName = function()
{
	if(this.state) return this.data.erect.name;
	else return this.data.flaccid.name;
}
penisClass.prototype.getVolume = function()
{
	var grth = this.scaleTomm(this.getGirth());
	var separation = (grth / 314) * 90;
	var headvol = GetVolume(grth, separation) * .63; 
	var shaftvol = GetVolume(grth, this.scaleTomm(this.getLength()) - separation); 
	return Math.round(headvol+shaftvol);
	
	function GetVolume(grth, lngth)
	{
		var radius = (grth / Math.PI) / 20;
		var area = 3.14 * ( radius * radius);
		return Math.round( area * (lngth / 10), 0);
	}	
}

penisClass.prototype.addComparer = function(name, length, girth, colour, skin, xhead, yhead)
{
	//add comparer loads flaccid cock...
	this.data.flaccid.name = name;
	this.data.flaccid.width = this.scaleToPixels( Math.round(girth/Math.PI) * 1.1 );
	this.data.flaccid.length = this.scaleToPixels(length);
	this.data.flaccid.girth = this.scaleToPixels(girth);
	
	this.data.flaccid.colour = colour;
	this.data.flaccid.skin = skin;
	this.data.flaccid.xhead = xhead;
	this.data.flaccid.yhead = yhead;
	
}


penisClass.prototype.scaleToPixels = function( size ) { return Math.round(size * this.scale); }
penisClass.prototype.scaleTomm = function( size ) { return Math.round(size * this.invertScale() ); }
penisClass.prototype.invertScale = function() { return 1 / this.scale; }
penisClass.prototype.getLength = function( ) { if(this.state) return this.data.erect.length; else return this.data.flaccid.length;}
penisClass.prototype.getGirth = function( ) { if(this.state) return this.data.erect.girth; else return this.data.flaccid.girth;}
penisClass.prototype.getXhead = function( ) { if(this.state) return this.data.erect.xhead; else return this.data.flaccid.xhead;}
penisClass.prototype.getYhead = function( ) { if(this.state) return this.data.erect.yhead; else return this.data.flaccid.yhead;}
penisClass.prototype.setSkin = function(skin) { if(this.state) this.data.erect.skin = skin; else this.data.flaccid.skin = skin; }
penisClass.prototype.getSkin = function() { if(this.state) return this.data.erect.skin; else return this.data.flaccid.skin; }

penisClass.prototype.getColour = function () {if(this.state) return this.data.erect.colour; else return this.data.flaccid.colour;}
penisClass.prototype.setColour = function (col) {if(this.state) this.data.erect.colour = col; else this.data.flaccid.colour = col; }

penisClass.prototype.isErect = function() { return this.state; }
penisClass.prototype.makeHard = function() { this.state = 1;}

penisClass.prototype.morphing = function() { return this.isMorphing; }
