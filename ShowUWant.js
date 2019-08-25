//辅助函数
function loadStyle(css){
    if(typeof GM_addStyle!='undefined')    {
        GM_addStyle(css);
    }
	else{
        var heads=document.getElementsByTagName('head');
        if(heads.length>0){
            var node=document.createElement('style');
            node.type='text/css';
            node.id="ShowUWantStyle";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node);
        }
    }
}
function $(CssSelector){
	'use script';
	if(typeof id != 'undefined'){
		return document.querySelector(CssSelector);
	}
}

var isopen = false;
var floatWindowWidthMax = 170;
var floatWindowHeightMax = 72;
var floatWindowWidthMin = 14;
var floatWindowHeightMin = 14;
var cur_paper_index = 1;
var maxPage = document.querySelectorAll("div.links>div").length;

//添加按钮
var float_window = document.createElement('div');
var float_button = document.createElement('div');
var float_content = document.createElement('div');
float_button.id = 'float_button';
float_window.id = 'float_window';
float_content.id = 'float_content';
float_window.className = "closed";
float_button.innerHTML = '<';
document.body.appendChild(float_window);
float_window.appendChild(float_button);
float_window.appendChild(float_content);
var box = '<div id = "score" ></div>';
    box += '<div>';
    box += '<label>查看第</label>';
    box += '<input id = "SetPage" type="text" maxlength = 3></input>';
    box += '<label>篇</label>';
    box += '<input class = "view btn" type="button" value="查看"/>';
    box += '</div>';
    box += '<p></p>';
    box += '<div>';
    box += '<input type = "button" class = "preview btn" value="上一篇"/>';
	box += '<input type = "button" class = "next btn" value="下一篇"/>';
    box += '</div>';
float_content.innerHTML = box;

var css = "@namespace url(http://www.w3.org/1999/xhtml);";
    css += '#float_window{ background-color:#FCFCFC;top:20%;right:10px;position:fixed;padding:4px;border:2px;border-radius:4px;box-shadow:0px 0px 8px #dddddd;z-index:9999;transition: all 0.5s;overflow:hidden;}';
    css += '#float_window *{margin:2px; transition: all 0.5s;}';
    css += '#float_window .btn{border:1px solid #BBBBBB;border-radius:3px;background-color:#FCFCFC;margin:3px;}';
    css += '#float_window #SetPage{width:30px;}';
	css += '#float_content{background-color:#f7f7f7;padding:1px;border:1px solid rgb(221,221,221);border-radius:4px;overflow:hidden; }';
	css += '#float_button{background-color:whitesmoke;width:16px;height:16px;position:absolute;top:0px;right:0px;border:1px solid #BBBBBB;border-radius:4px;text-align:center;cursor:pointer;z-Index:9 }';
    css += '#float_window p{margin:4px;border:1px solid rgba(140, 140, 140, 0.7);padding:0!important}';
    css += '#float_window.closed{width:' + floatWindowWidthMin + 'px;height:' + floatWindowHeightMin + 'px;}';
    css += '#float_window.closed>#float_content{width:1px;height:1px;}';
    css += '#float_window.open{width:' + floatWindowWidthMax + 'px;height:' + floatWindowHeightMax + 'px; background-color: #FCFCFC4C;}';
    css += '#float_window.open:hover{background-color:#FCFCFC;}';
    css += '#float_window.open>#float_content{opacity:0.3;}';
    css += '#float_window.open:hover>#float_content{opacity:1;}';
    css += 'div#body > a:not([name=""]){display:None;}';
loadStyle(css);

float_button.addEventListener('click',showmenu,false);
$(".preview").addEventListener('click',function(){showPaper(cur_paper_index-1);},false);
$(".next").addEventListener('click',function(){showPaper(cur_paper_index+1);},false);
$(".view").addEventListener('click',function(){
    let targetPage = $("#SetPage").value;
    if(!/^[-,+]?\d+$/.test(targetPage)){
        console.log("not integer");
        return;
    }else if(targetPage < 1){
        console.log("too small");
        return;
    }else if(targetPage > maxPage){
        console.log("too large");
        return;
    }
    showPaper(+targetPage);
},false);

function showmenu(){
	if(isopen){
		float_button.innerHTML = '<';
        float_window.classList.replace("open", "closed");
        float_content.classList.replace("open", "closed");
	}else{
        float_button.innerHTML = '>';
        float_window.classList.replace("closed", "open");
        float_content.classList.replace("closed", "open");
    }
    isopen = !isopen;
}

function showPaper(index){
    if(index > 0){
        let curstyle = $("#ShowUWantStyle").innerText;
        curstyle = curstyle.replace(/a:not\(\[name="\d*"\]\)/,'a:not([name="' + index + '"])');
        $("#ShowUWantStyle").innerText = curstyle;
        cur_paper_index = index;
    }
}