/* 通用 */

function weirdeffect(){
	
	var $passage = $('#weirdtext');
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

function anounceAppend(args,sound){
    var text = args
    const waittext = function(args,sound){
        if(document.getElementById('append-text') != null){
            //优先在append-text显示
            new Wikifier(null,"<<append '#append-text'>>"+text+"<</append>>")
            $('#append-text').addClass('action-flash'); setTimeout(()=> {$('#append-text').removeClass('action-flash')},500)
        }
        else if(document.getElementById('situation') != null){
            //失败了就在situation前显示
            let copytext = document.getElementById('situation').innerHTML
            new Wikifier(null,"<<replace '#situation'>>"+text+copytext+"<</replace>>")
            $('#add-text').addClass('action-flash'); setTimeout(()=> {$('#add-text').removeClass('action-flash')},500)
        }
        else if(document.getElementById('hd-append-top') != null){
            //situation也找不到就在header append里显示
            new Wikifier(null,"<<append '#hd-append-top'>>"+text+"<</append>>")
            $('#hd-append-top').addClass('action-flash'); setTimeout(()=> {$('#hd-append-top').removeClass('action-flash')},500)
        }
    }
    
    setTimeout(()=> {waittext(args,sound)}, 300)

    //不管有没有找到对应元素，都会在弹出窗口显示一次
    V.anounce.flag = true
    V.anounce.text = text
    if(sound)V.anounce.type = sound;
    
    anouncePopUP(args,sound)
}
window.anounceAppend = anounceAppend

function anouncePopUP(args,sound="弹出通知"){
    var text = args
    V.log.anouce.push(text)
    if(V.log.anouce.length > 100) V.log.anouce.deleteAt(0);

    ShowPopUP()
    new Wikifier(null,"<<replace '#action-text'>>"+text+"<</replace>>")
    if(sound != "无") new Wikifier(null,`<<audio '${sound}' volume 0.5 play>>`);
    return ""
}
window.anouncePopUP = anouncePopUP
DefineMacroS("anouncePopUP", anouncePopUP);


function ShowPopUP() {
    $('#action-popup').addClass('show'); setTimeout(() => { $('#action-popup').removeClass('show') }, 3200);
    $('#action-popup').addClass('popup'); setTimeout(() => { $('#action-popup').removeClass('popup') }, 1000);

    if(document.getElementById('action-text2') != null){
        $('#action-text2').addClass('notransition flash'); setTimeout(() => { $('#action-text2').removeClass('notransition flash') }, 100);   
    }
}
window.ShowPopUP = ShowPopUP

window.movebutton = function() {
    
    if (ui.movebutton == false) {
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

   ui.movebutton = !ui.movebutton 
}

window.menubutton = function(){
    if(ui.menubutton == false){
         $('#menu_container').addClass('menu_active');setTimeout(() => {$('#menu_container').removeClass('menu_hide')},500);
    }
    else{
        $('#menu_container').addClass('menu_hide');setTimeout(() => {$('#menu_container').removeClass('menu_active')},500); 
    }
    ui.menubutton = !ui.menubutton
}

function delay(id,text) {
    if(typeof(text)=="string"){
        $('#'+id).append("<span class='delay'>"+text+"<br></span>")
    }else if(Array.isArray(text)==true){
        $( "#"+id ).append( "<span class='h"+i+" hidden'>"+text[i]+"<br></span>");
        setTimeout(() => {$(`#${id} .h`+i).removeClass('hidden').addClass('delay')}, (500*i))
    }
}
F.delay = delay
DefineMacroS("delay",delay)
