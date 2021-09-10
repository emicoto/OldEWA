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

function anounceAppend(args){
    var text = args

    if(document.getElementById('append-text') != null){
        //优先在append-text显示
        document.getElementById('append-text').innerHTML = document.getElementById('append-text').innerHTML + text
        $('#append-text').addClass('action-flash'); setTimeout(()=> {$('#append-text').removeClass('action-flash')},500)
    }
    else if(document.getElementById('situation') != null){
        //失败了就在situation前显示
        document.getElementById('situation').innerHTML = document.getElementById('situation').innerHTML + "<div id='add-text'>" +text+"</div>"
        $('#add-text').addClass('action-flash'); setTimeout(()=> {$('#add-text').removeClass('action-flash')},500)
    }
    //不管有没有找到对应元素，都会在弹出窗口显示一次
    anouncePopUP(args)
}

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
