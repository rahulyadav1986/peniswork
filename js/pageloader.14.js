// JavaScript Document
function pageLoader() {}
pageLoader.prototype = { width: -620, dymDivOut: false };
pageLoader.prototype.openDivLoadHtml = function(page, arg)
{
	$('body').animate( { scrollTop: 0 }, 400, 'swing');
	$('#timer').show();
	if(menuout) showmenu();
	$('#dym-div').show(); 
	$('#close-icon').show(); 
	this.dymDivOut = true;
	$('#dym-div').animate({right:this.width},'slow', function()
	{
		$.post("ajax/"+page,arg, function(data) {
			$('#dym-div-inner').html(data);
			$('#dym-div').animate({right:0},'slow', function() { 
				$('#mask').fadeTo('fast', 0.1); 
				$('#timer').hide();
			});
		});
	});
}
pageLoader.prototype.openDiv = function()
{
	this.dymDivOut = true;
	$('#close-icon').show();
	$('#timer').show();
	$('#dym-div').show(); 
	if(menuout) showmenu();  
	$('body').animate( { scrollTop: 0 }, 400, 'swing');
	$('#dym-div').animate({right:0},'slow', function() { 
		$('#mask').fadeTo('fast', 0.1); 
		$('#timer').hide();
	});
}
pageLoader.prototype.closeDiv = function(speed)
{
	if(this.dymDivOut)
	{
		this.dymDivOut = false;
		$('#dym-div').animate({right:this.width},speed, function() { 
		//if(menuout) showmenu(); 
		$('#close-icon').hide(); 
		$('#mask').fadeOut('fast'); 
		$('#dym-div').hide(); 
		});
	}
}
pageLoader.prototype.setwidth = function(width)
{
	if(width < 600)
	{
		$('#dym-div').css('width',width - 20);
		this.width = 0 - width;
		$('#dym-div').css('right', this.width +"px");
	}
}
loader = new pageLoader();