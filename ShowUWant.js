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
	if(typeof CssSelector != 'undefined'){
		return document.querySelector(CssSelector);
	}
}

var isopen = false;
var floatWindowWidthMax = 170;
var floatWindowHeightMax = 118;
var floatWindowWidthMin = 14;
var floatWindowHeightMin = 14;
var cur_paper_index = 1;
var cur_item_index = 0;
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
    box += '<button class = "view btn">查看</button>';
    box += '</div>';
    box += '<div>';
    box += '<label>查看</label>';
    box += '<button class = "preview paper btn">上一篇</button>';
    box += '<button class = "next paper btn">下一篇</button>';
    box += '</div>';
    box += '<p></p>';
    box += '<div>';
    box += '<label>跳转</label>';
    box += '<button class = "preview item btn" >上一处</button>';
    box += '<button class = "next item btn" >下一处</button>';
    box += '</div>';
float_content.innerHTML = box;

var css = "@namespace url(http://www.w3.org/1999/xhtml);";
    css += '#float_window{ background-color:#FCFCFC;top:20%;right:10px;position:fixed;padding:4px;border:2px;border-radius:4px;box-shadow:0px 0px 8px #dddddd;z-index:9999;transition: all 0.5s;overflow:hidden;}';
    css += '#float_window *{margin:2px; transition: all 0.5s;}';
    css += '#float_window .btn{border:1px solid #BBBBBB;border-radius:3px;background-color:#FCFCFC;margin:3px;padding:3px;}';
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
    css += 'div#body > a:not([name=""]){display:block;}';
loadStyle(css);

float_button.addEventListener('click',showmenu,false);
$(".preview.paper").addEventListener('click',function(){showPaper(cur_paper_index-1);},false);
$(".next.paper").addEventListener('click',function(){showPaper(cur_paper_index+1);},false);
$(".view").addEventListener('click',function(){
    let targetPage = $("#SetPage").value;
    if(!/^[-,+]?\d+$/.test(targetPage)){
        alert("输入不是整数");
        return;
    }else if(targetPage < 1){
        alert("数值太小");
        return;
    }else if(targetPage > maxPage){
        alert("数值太大");
        return;
    }
    showPaper(+targetPage);
},false);
$(".preview.item").addEventListener('click',function(){
    scrollToIndex(cur_item_index - 1);
},false);
$(".next.item").addEventListener('click',function(){
    scrollToIndex(cur_item_index + 1);
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
        let styleField = $("#ShowUWantStyle");
        curstyle = styleField.innerText.replace(/a:not\(\[name="\d*"\]\)\{display:\w+/,'a:not([name="' + index + '"]){display:None;');
        styleField.innerText = curstyle;
        cur_paper_index = index;
        cur_item_index = 0;
        scrollToIndex(0);
    }
}

function scrollToIndex(index) {
    if(index >= 0){
        let a = document.querySelectorAll('a[name="' + cur_paper_index + '"]');
        if(index >= a.length) return;
        scrollTo(0, a[index].offsetTop-50);
        cur_item_index = index;
    }
}