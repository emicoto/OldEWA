/* 通用 */

function weirdeffect(){
	
	var $passage = $('#eventsituation');
	var rawtxt = $passage.html();
	var len = rawtxt.length;
	var newtext = '';
	
	for(var i = 0; i < len; i ++){	
		var rng = Math.floor(Math.random() * 5) + 1;
		var currentchar = rawtxt.charAt(i);
		if(currentchar == ' '){
			var newchar = '<span class="space"> </span>';
		}
		else{
			var newchar = '<span class="weffect' + rng + '">' + currentchar + '</span>';
		}
		newtext = newtext + newchar;
	}
	$passage.html(newtext);
}
window.weirdeffect = weirdeffect

function anouncePopUP(args,sound="弹出通知"){
    var text = args
    V.log.anouce.push(text)
    if(V.log.anouce.length > 100) V.log.anouce.deleteAt(0);

    ShowPopUP()
    new Wikifier(null,"<<replace '#action-text'>>"+text+"<</replace>>")
    new Wikifier(null,`<<audio '${sound}' volume 0.5 play>>`)
    return ""
}
window.anouncePopUP = anouncePopUP
DefineMacroS("anouncePopUP", anouncePopUP);


function ShowPopUP() {
    $('#action-popup').addClass('show'); setTimeout(() => { $('#action-popup').removeClass('show') }, 3200);
    $('#action-popup').addClass('popup'); setTimeout(() => { $('#action-popup').removeClass('popup') }, 1000);
    $('#action-text2').addClass('notransition flash'); setTimeout(() => { $('#action-text2').removeClass('notransition flash') }, 100);
}
window.ShowPopUP = ShowPopUP

window.movebutton = function() {
    
    if (V.movebutton == false) {
        new Wikifier(null,"<<replace '#movebutton'>><<link '▽ 移动'>><<run movebutton()>><</link>><</replace>>")
        $('#navi').addClass('navi_active'); $('#navi').removeClass('navi_unable')
        $('#links').removeClass('hidden') 
        $('#links').addClass('movedown'); setTimeout(() => {$('#links').removeClass('movedown')},1500)
    }
    else {
        new Wikifier(null,"<<replace '#movebutton'>><<link '▷ 移动'>><<run movebutton()>><</link>><</replace>>")
        $('#navi').addClass('navi_unable'); $('#navi').removeClass('navi_active')
        $('#links').addClass('hidden') 
    }

   V.movebutton = !V.movebutton 
}

window.menubutton = function(){
    if(V.menubutton == false){
         $('#menu_container').addClass('menu_active');setTimeout(() => {$('#menu_container').removeClass('menu_hide')},500);
    }
    else{
        $('#menu_container').addClass('menu_hide');setTimeout(() => {$('#menu_container').removeClass('menu_active')},500); 
    }
    V.menubutton = !V.menubutton
}

function delay(id,text) {
    if(typeof(text)=="string"){
        $('#'+id).append("<span class='delay'>"+text+"<br></span>")
    }else if(Array.isArray(text)==true){
        $( "#"+id ).append( "<span class='h"+i+" hidden'>"+text[i]+"<br></span>");
        setTimeout(() => {$("#combat_message .h"+i).removeClass('hidden').addClass('delay')}, (500*i))
    }
}
F.delay = delay
DefineMacroS("delay",delay)
