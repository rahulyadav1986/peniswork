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





