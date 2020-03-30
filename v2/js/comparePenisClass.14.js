// JavaScript Document Copyright MSL-Software.net 2013
comparePenisClass.prototype = new penisClass();
function comparePenisClass()
{
	this.imageHead = { '': 476, 't': 381, 'q': 286, 'u': 191, 'v': 96, 'skin': 0, 'shaft': 571, 'shaftend': 476 }
	this.imgMap =Array( 381, 381, 286, 191, 96, 571, 476);
	this.state = 1;
	this.showtape = false;
	this.metric = false;
}

comparePenisClass.prototype.drawErect = function(context)
{
	var length = this.data.erect.length;
	var width = this.data.erect.width;
	var shaft = length - width;
	var headY = this.canvasY - length;
	
	var yhead = Math.round((width * this.data.erect.yhead) / 100);
	var xhead = Math.round((width * this.data.erect.xhead) / 100);
	var leftShift = Math.round((width - xhead) /2);
	
	
	//centre image
	var posX = Math.round((this.canvasX - width) / 2);
	
	context.drawImage(this.image, 0,this.imageHead.shaft, 95, 231, posX, this.canvasY - shaft, width, shaft );
	context.drawImage(this.image, 0, this.imageHead.shaftend, 95, 95, posX, headY, width, width);
	if(this.data.erect.skin > 1) 
	{
		context.drawImage(this.image, 0, this.imgMap[this.data.erect.skin], 95, 95, posX, headY, width, width);
	}
	else
	{
		
		context.drawImage(this.image, 0, this.imgMap[this.data.erect.skin], 95, 95, posX+leftShift, headY, xhead, yhead);
		//add folded back skin if required
		if(this.data.erect.skin == 1) context.drawImage(this.image, 0, this.imageHead.skin, 95, 95, posX, headY, width, width);
	}
	if(this.showtape) this.drawTape(context, this.metric, width, length);	
} 
comparePenisClass.prototype.drawFlaccid = function(context)
{
	var length = this.data.flaccid.length;
	var width = this.data.flaccid.width;
	var shaft = length - width;
	var headY = this.canvasY - length;
	
	var yhead = Math.round((width * this.data.flaccid.yhead) / 100);
	var xhead = Math.round((width * this.data.flaccid.xhead) / 100);
	var leftShift = Math.round((width - xhead) /2);
	
	//centre image
	var posX = Math.round((this.canvasX - width) / 2);

	context.drawImage(this.imageflaccid, 0,this.imageHead.shaft, 95, 231, posX, this.canvasY - shaft, width, shaft );
	context.drawImage(this.imageflaccid, 0, this.imageHead.shaftend, 95, 95, posX, headY, width, width);
	if(this.data.flaccid.skin > 1) 
	{
		context.drawImage(this.imageflaccid, 0, this.imgMap[this.data.flaccid.skin], 95, 95, posX, headY, width, width);
	}
	else
	{
		
		context.drawImage(this.imageflaccid, 0, this.imgMap[this.data.flaccid.skin], 95, 95, posX+leftShift, headY, xhead, yhead);
		//add folded back skin if required
		if(this.data.flaccid.skin == 1) context.drawImage(this.imageflaccid, 0, this.imageHead.skin, 95, 95, posX, headY, width, width);
	}
	if(this.showtape) this.drawTape(context, this.metric, width, length);	
}
comparePenisClass.prototype.morphFrame = function(framecnt, frames)
{
	var context = this.canvasObj.getContext("2d");
	context.clearRect(0,0,this.canvasX,this.canvasY);
	
	var length = this.startLength + Math.round(((this.endLength - this.startLength)/frames) * framecnt);
	var width = this.startWidth + Math.round(((this.endWidth - this.startWidth)/frames) * framecnt);
	var shaft = length - width;
	
	var yhead = this.startXhead + Math.round(((this.endXhead - this.startXhead)/frames) * framecnt);
	var xhead = this.startYhead + Math.round(((this.endYhead - this.startYhead)/frames) * framecnt);
	var leftShift = Math.round((width - xhead) /2);
	
	var headY = this.canvasY - length;
	
	//centre image
	var posX = Math.round((this.canvasX - width) / 2);
	
	var percdone = Math.round((framecnt/frames) * 100);
	
	if( ( (this.state && percdone > 80) || (!this.state && percdone < 20) ) )
	{
		//drawing cock 0 (flaccid)
		context.drawImage(this.imageflaccid, 0,this.imageHead.shaft, 95, 231, posX, this.canvasY - shaft, width, shaft );
		context.drawImage(this.imageflaccid, 0, this.imageHead.shaftend, 95, 95, posX, headY, width, width);
	
		var imgNum = this.data.flaccid.skin;
		if(this.data.flaccid.skin == 4) //only do the foreskin anim if flaccid is covered
		{
			if( percdone > 80  || percdone < 20) imgNum = 2;
			if( percdone > 90  || percdone < 10) imgNum = 3;
		}
		
		if( this.data.flaccid.skin >1 ) //foreskin
		{
			context.drawImage(this.imageflaccid, 0, this.imgMap[imgNum], 95, 95, posX, headY, width, width);
		}
		else
		{
			context.drawImage(this.imageflaccid, 0, this.imgMap[this.data.flaccid.skin], 95, 95, posX+leftShift, headY, xhead, yhead);
			if(this.data.erect.skin == 1) context.drawImage(this.imageflaccid, 0, this.imageHead.skin, 95, 95, posX, headY, width, width);
		}
	}
	else
	{
		//drawing cock 1 (erect)
		context.drawImage(this.image, 0,this.imageHead.shaft, 95, 231, posX, this.canvasY - shaft, width, shaft );
		context.drawImage(this.image, 0, this.imageHead.shaftend, 95, 95, posX, headY, width, width);
		
		if( this.data.erect.skin >1 ) //foreskin
		{
			context.drawImage(this.image, 0, this.imgMap[this.data.erect.skin], 95, 95, posX, headY, width, width);
		}
		else
		{
			context.drawImage(this.image, 0, this.imgMap[this.data.erect.skin], 95, 95, posX+leftShift, headY, xhead, yhead);
			if(this.data.erect.skin == 1) context.drawImage(this.image, 0, this.imageHead.skin, 95, 95, posX, headY, width, width);
		}
	
	}
	if(this.showtape) this.drawTape(context, this.metric, width, length);		
}

comparePenisClass.prototype.drawTape = function(context, metric, width, length)
{
	var y = 0;
	if(metric) y = 25;
	if( length < 110 ) length = 110;
	var mainY = Math.round(this.canvasY - (length/2) );
	
	var tapeWidth = width * .909; //allows for the 110% space round the edge
	
	var margin = Math.round((100 - tapeWidth) / 2);
	
	var grd=context.createLinearGradient(60,0, 93 ,0);
	grd.addColorStop(0,"#e6dcd2");
	grd.addColorStop(1,"#45423f");
	
	var grd2=context.createLinearGradient(margin +20,0, 60 ,0);
	grd2.addColorStop(0,"#e6dcd2");
	grd2.addColorStop(1,"#d7cbbf");	

	context.fillStyle=grd;
	context.fillRect(50, mainY, Math.round(tapeWidth / 2) + 2,26);
	context.drawImage(tapeImageObj,0, y, Math.round(tapeWidth / 2), 25, 50, mainY, Math.round(tapeWidth / 2), 25);
	
	context.fillStyle=grd2;
	//context.clearRect(margin - 2, mainY + 9,118 - margin,24);
	context.fillRect(margin - 2,mainY + 9,118 - margin,24);
	context.drawImage(tapeImageObj, Math.round(tapeWidth * Math.PI) - 50 + margin, y, 112, 25, margin , mainY + 9,112,25);
	
	context.drawImage(tapeImageObj,380, y, 20, 25, margin - 2, mainY +9, 20, 25);
}

comparePenisClass.prototype.showTape = function(metric) { this.showtape = true; this.metric = metric; }
comparePenisClass.prototype.hideTape = function() { this.showtape = false; }