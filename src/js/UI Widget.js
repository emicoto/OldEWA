
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
			var newchar = '<span class="space"></span>';
		}
		else{
			var newchar = '<span class="weffect' + rng + '">' + currentchar + '</span>';
		}
		newtext = newtext + newchar;
	}
	$passage.html(newtext);
}
window.weirdeffect = weirdeffect

function anouncePopUP(args){
    var text = args
    V.log.anouce.push(text)
    if(V.log.anouce.length > 100) V.log.anouce.deleteAt(0);

    new Wikifier(null,"<<replace '#action-text>>"+text+"<</replace>>")
    new Wikifier(null,"<<replace '#action-text2'>>"+text+"<</replace>>")
    ShowPopUP()
}
window.anouncePopUP = anouncePopUP


function ShowPopUP() {
    $('#action-popup').removeClass('hidden'); setTimeout(() => { $('#action-popup').addClass('hidden') }, 3200);
    $('#action-popup').addClass('popup'); setTimeout(() => { $('#action-popup').removeClass('popup') }, 1000);
    $('#action-text2').addClass('notransition flash'); setTimeout(() => { $('#action-text2').removeClass('notransition flash') }, 100);
}
window.ShowPopUP = ShowPopUP


function movebutton() {
    
    if (V.movebutton == false) {
        new Wikifier(null,"<<replace '#movebutton'>><<link '▼ 移动'>><<run movebutton()>><</link>><</replace>>")
        $('#navi').removeClass('navi_unable'); $('#navi').addClass('navi_active')
        $('#links').removeClass('hidden') 
        $('#links').addClass('movedown'); setTimeout(() => {$('#links').removeClass('movedown')},1500)
    }
    else {
        new Wikifier(null,"<<replace '#movebutton'>><<link '▶ 移动'>><<run movebutton()>><</link>><</replace>>")
        $('#navi').removeClass('navi_active'); $('#navi').addClass('navi_unable')
        $('#links').addClass('hidden') 
    }

   V.movebutton = !V.movebutton 
}
window.movebutton = movebutton
