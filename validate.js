 var CHARERROR = 'You have typed in one or more invalid characters! Please make sure your input method is set to English.';
 var INPUT_ERROR = 'ec_validate-input-error';
 var msg_target_list = [];
 var MessagArea;
 var $inputs = $("input[type='text']");
 var MessagArea  = $('<div></div>').addClass('ec_validate-msg').hide();;
 //MessagArea = $('#MessagArea');

 if ($('.stage').length > 0){
	 MessagArea.prependTo($('.stage'));
	 
 }else{
	 MessagArea.prependTo($('body')); 
	 
 }
 
 
 ///////////////////////find continue button
 var $continueBtn =[];
 // testing "continue" or "next" 
 var $continueBtnTxt = /^(.*?\bcontinue\b.*?)|(.*? \bnext\b.*?)$/;
 
 var buttons = $('button'); 
 for (var i=0; i<buttons.length; i++){
		 var txt = $continueBtnTxt;
		 var str =$(buttons[i]).html().toLowerCase();
		 if ( txt.test(str)){
			 $continueBtn.push(buttons[i]);
		 }
 }
 
 buttons = $("input[type='submit']");
 for (var i=0; i<buttons.length; i++){
		 var txt = $continueBtnTxt;
		 var str =$(buttons[i]).attr('value').toLowerCase();
		 if ( txt.test(str) ){
			 $continueBtn.push(buttons[i]);
		 }
 }
 
////////////////////////display
 function refreshMsg(){
	 var html ="";
	 for( var i=0; i < msg_target_list.length; i++){
		 var key = msg_target_list[i]; 
		 html += msg_target_list[key].name +": " + msg_target_list[key].msg + "<br/>";
	 }
	 MessagArea.html(html);
	 if (msg_target_list.length != 0){
		 $($continueBtn).attr('disabled','disabled').addClass('disabled-btn');
	 	//$('button[onclick^="submitForm"]').attr('disabled','disabled').addClass('disabled-btn');
	 }else{
		 $($continueBtn).removeAttr('disabled').removeClass('disabled-btn');
		 //$('button[onclick^="submitForm"]').removeAttr('disabled').removeClass('disabled-btn');
	 }
 }
 
 function showMsg(target, name , msg){
	 
	 if (msg == 'OK'){
		if (msg_target_list.indexOf(target) != -1){
			msg_target_list.pop(target);
			refreshMsg();
			}
		
	  }
	 else{
		 if (msg_target_list.indexOf(target) ==  -1){
		 	 msg_target_list.push(target);
		 	 msg_target_list[target] = {"name":name,"msg":msg};
		 	 refreshMsg();
		   }
		 //intended nothing
	  }
	 if (msg_target_list.length == 0 ){
			MessagArea.fadeOut();
		   }
	 else{
		 MessagArea.fadeIn();
	 }
 }

 
 
 ////////////////////// validate
 function isASCII(str) {
	    if(/^[\x00-\xFF]*$/.test(str)){
	    	return "";
	    }
	    return CHARERROR;
	}
 function isAllowedChar(str){
 	var regex = /^[\w\s#_\.\-\@]*$/;
 	if (regex.test(str)){
 		return "";
 	}
 	return "Some of your special charactors";
 }
 function ec_validateAll(str){
	 var pass = ""; 
	 pass += isASCII(str);
	 pass += isAllowedChar(str);
	 return pass;
 }
 
 
 function checkInput(event){
	 var target = $(this).attr('id');
	 var name = $("label[for=\'" +target+ "\']").html();
	 var msg = ec_validateAll($(this).val());
	 if (msg.length == 0){
		 $(this).removeClass(INPUT_ERROR);
		 showMsg(target,name, 'OK');
		 
	 }
	 else{
		 $(this).addClass(INPUT_ERROR);
		 showMsg(target,name, msg);
		 
	 } 
 }
 	//force recheck all
 function checkAllInput(){
	 $inputs.each(checkInput);
 }
 
 
 $inputs.keyup(checkInput);
 
 $inputs.blur(checkAllInput);
 
 
 /////////////////////// positioning
 var areaY = MessagArea.offset().top + $('#banner').height();
console.log(areaY);
var isFixed = true;


 $(window).scroll( function() {	 
		 var doFix = $(window).scrollTop() > areaY;	 
		 
	     if (doFix && !isFixed) {
	    	 MessagArea.addClass('fixedTop');
	    	 isFixed = true;
	     }
	     if (!doFix && isFixed){
	    	 MessagArea.removeClass('fixedTop');
	    	 isFixed = false;
	     }
	     
  }); 
 
 ////////////////////on load
 
 checkAllInput();