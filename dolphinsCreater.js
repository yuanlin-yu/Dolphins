import { notes, syncClipboard, cancelSyncClipboard } from './notesApp';
import imgs from './imgs/imgs.json';
import jscolor from './dependencies/jscolor.min.js';

var clipboardContent = '';
export const cleanClipboard = () => {
    clipboardContent = '';
}

export var dolphinsArray = [];

export const createBar = (id, apps = [], initialPosition = {top: '150px', right: '25vw'}) => {

    const container = document.createElement('div');
    const homePage = document.createElement('div');
    const header = document.createElement('div');
    const button = document.createElement('button');
    const title = document.createElement('button');
    const ai = document.createElement('iframe');
    const select = document.createElement('button');
    const clone = document.createElement('button');
    const close = document.createElement('button');
    const list = document.createElement('div');
    const appList = document.createElement('div');
    const functionPanel = document.createElement('div');
    const stylePanel = document.createElement('div');
    const input = document.createElement('input');
    const copyBtn = document.createElement('button');

    const aiUrl = {
        "kimi": "https://kimi.moonshot.cn/chat",
        "doubao": "https://www.doubao.com/chat",
        "baidu": "https://yiyan.baidu.com/",
        "tencent": "https://yuanbao.tencent.com/chat",
        "ali":"https://bailian.console.aliyun.com/"
    }

    const createAiAppButton = (text, url, logo) => {
        let button = document.createElement('button');
        let img = document.createElement('img');
        let name = document.createElement('span');
        img.classList.add('dolphinsImgs');
        name.classList.add('dolphinsText');

        button.addEventListener('click', () => {
            AppContainer.forEach(container =>{
                container.style.display = 'none'
            })            
            pageContainer.style.display = 'none';
            homePage.style.display = 'none';
            container.style.width = '550px';
            container.style.height = '700px';

            ai.style.display = 'block';
            ai.src = url;
            list.style.height = '0px';
            list.style.paddingTop = '0px';

        })
        img.src = logo;
        name.textContent = text;

        let imgStyle = {
            display: 'block',
            height: '40px',
            minHeight: '40px',
            backgroundColor: 'transparent',
            color: 'white',
            borderRadius: '5px',
            margin: '2px auto',
            border: 'none',
            cursor: 'pointer',
            resizeMode: 'center',
        }
        let nameStyle = {
            textAlign: 'center',
            fontSize: '12px',
            color: 'black'
        }

        let buttonStyle ={
            display: 'block',
            border: 'none',
            margin: '2px',
            background: 'none',
            cursor: 'pointer',
            height: '65px',
            width: '65px',
        }
        Object.assign(img.style, imgStyle);
        Object.assign(name.style, nameStyle);
        Object.assign(button.style, buttonStyle);

        button.appendChild(img);
        button.appendChild(name);

        return button
    }

    const AppContainer = [];
    const createAppButton = (text, logo, container) => {
        let button = document.createElement('button');
        let img = document.createElement('img');
        let name = document.createElement('span');
        img.classList.add('dolphinsImgs');

        AppContainer.push(container);

        button.addEventListener('click', () => {
            container.style.display = 'block';
            list.style.height = '0px';
            list.style.paddingTop = '0px';
            pageContainer.style.display = 'none';
            ai.style.display = 'none';
            homePage.style.display = 'none';

            AppContainer.filter(item => item != container).forEach(container => {
                container.style.display = 'none'
            })
        })
        img.src = logo;
        name.textContent = text;

        let imgStyle = {
            display: 'block',
            height: '40px',
            minHeight: '40px',
            backgroundColor: 'transparent',
            color: 'white',
            borderRadius: '5px',
            margin: '2px auto',
            border: 'none',
            cursor: 'pointer',
            resizeMode: 'center',
        }
        let nameStyle = {
            textAlign: 'center',
            fontSize: '12px',
            color: 'black'
        }

        let buttonStyle ={
            display: 'block',
            border: 'none',
            margin: '2px',
            background: 'none',
            cursor: 'pointer',
            height: '65px',
            width: '65px',
        }
        Object.assign(img.style, imgStyle);
        Object.assign(name.style, nameStyle);
        Object.assign(button.style, buttonStyle);

        button.appendChild(img);
        button.appendChild(name);

        return button
    }

    const createApp = (name, logo, srcFunction) => {
        //scrFunction parameter should return a HTML component.
        const appContainer = document.createElement('div');
        const appButton = createAppButton(name, logo, appContainer);
        appList.appendChild(appButton);
        appContainer.appendChild(srcFunction);
        container.appendChild(appContainer);
        appContainer.classList.add('iframeStyle');
        appContainer.style.display = 'none';
    }

    const createFunctionButton = (text, type, f) => {

        if(type === 'button') {
            const button = document.createElement('button');
            button.classList.add('buttonStyle');
            button.addEventListener('click', f);
            button.innerText = text;    

            return button
        } else if(type === 'checkbox') {
            const button = document.createElement('button');
            const checkboxElement = document.createElement('input');
            const label = document.createElement('label');
            checkboxElement.type = 'checkbox';
            checkboxElement.name = text;
            checkboxElement.id = text;
            label.innerText = text;  
            label.style.margin = '0px auto'; 
            label.style.cursor = 'default'; 
            button.classList.add('checkBoxStyle');
            checkboxElement.addEventListener('click', f);
            button.appendChild(checkboxElement);
            button.appendChild(label);

            return button
        } 
    }
    
    //container
    container.classList.add('dolphinsContainer');
    container.style.top = initialPosition.top;
    container.style.right = initialPosition.right;
    container.id = id;  
    document.body.appendChild(container);

    //homePage
    homePage.innerHTML = `
        <img src=${imgs.logo.dolphins} style="height: 160px;">
        <h2 class="dolphinsText" style="font-size: 30px;margin: 30px;color: black;">欢迎使用 Dolphins !</h2>
        <p class="dolphinsText" style="color: gray;font-size: 18px;">您的个人多功能综合AI助手</p>
        <p class="dolphinsText" style="color: gray; position: absolute; bottom: 90px;">了解更多</p>
    `;
    homePage.classList.add('dolphinsHomePage');
    container.appendChild(homePage);

    const startButton = document.createElement('button');
    startButton.innerText = "马上开始";
    startButton.classList.add('dolphinsStartButton');
    homePage.appendChild(startButton);
    startButton.addEventListener('click', () => {
        select.click();
    })
    
    const links = document.createElement('p');
    links.classList.add('dolphinsLinks');
    links.innerHTML = `<a style="cursor: pointer" href="https://www.douyin.com/user/MS4wLjABAAAAjb0KgqmCF7O4LfAqhpipqruEqI0jsOfnsF5O40fPjLdskHfT1jCVIo871zVg2sUy?from_tab_name=main"><img src=${imgs.logo.douyin} style="height: 25px; margin: 10px 15px;"></a> <p class="dolphinsText" style="font-weight: lighter;">|</p> <a style="cursor: pointer" href="https://github.com/yuanlin-yu"><img src=${imgs.logo.github} style="height: 25px; margin: 10px;"></a>`;
    homePage.appendChild(links);

    //header
    var headerStyle = {
        zIndex: 30,
        position: 'absolute',
        top: '0px',
        left: '0px',
        height: '30px',
        width: '100%',
        backgroundColor: 'var(--main-color)',
        boxShadow: '0 2px 2px 0 gray',
        cursor: 'move',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
    Object.assign(header.style, headerStyle);
    container.appendChild(header);
    header.id = 'dolphinsAI助手';

    //window size control button
    var buttonStyle = {
        position: 'absolute',
        top: '0px',
        left: '0px',
        height: '26px',
        width: '26px',
        background: 'none',
        border: 'none',
        fontSize: '14px',
        color: 'white',
        margin: '2px',
        cursor: 'pointer'
    }
    Object.assign(button.style, buttonStyle);
    button.innerHTML = `<img src=${imgs.logo.dolphinsButton} style="height: 22px;margin: 2px 0 0 -2px;">`;

    var lastContainerSize = {
        height: '',
        width: ''
    };

    button.addEventListener('click', () => {

        if(lastContainerSize.height === '') {
            lastContainerSize.height = '700px';
            lastContainerSize.width = '550px';
        }

        if(container.style.height === '30px') {
            container.style.height = lastContainerSize.height;
            container.style.width = lastContainerSize.width;
            container.style.minWidth = '550px';
            container.style.resize = 'both';
            select.style.display = 'block';
            button.style.transformOrigin = '55% 60%';
            button.style.transform = 'rotate(-60deg)';
    
        } else {
            lastContainerSize.height = container.style.height;
            lastContainerSize.width = container.style.width;
            container.style.height = '30px';
            container.style.width = '150px';
            container.style.minWidth = '150px';
            container.style.resize = 'none';
            select.style.display = 'none';
            button.style.transformOrigin = '55% 60%';
            button.style.transform = 'rotate(0deg)';
        }
    })
    header.appendChild(button);

    document.addEventListener('keydown', (event) => {

        if (event.altKey && event.key === '1') {
            if(container.style.display === 'none') {
                container.style.display = 'block'
            } else {
                container.style.display = 'none'
            }
            event.preventDefault();
        }


        if (event.altKey && event.key === '`' ) {
            
            if(lastContainerSize.height === '') {
                lastContainerSize.height = '700px';
                lastContainerSize.width = '550px';
            }

            if(container.style.height === '30px') {
                container.style.height = lastContainerSize.height;
                container.style.width = lastContainerSize.width;
                container.style.minWidth = '550px';
                container.style.resize = 'both';
                select.style.display = 'block';   
                button.style.transform = 'rotate(-60deg)';
            } else {

                lastContainerSize.height = container.style.height;
                lastContainerSize.width = container.style.width;

                container.style.height = '30px';
                container.style.width = '150px';
                container.style.minWidth = '150px';
                container.style.resize = 'none';
                select.style.display = 'none';
                button.style.transform = 'rotate(0deg)';
            }
            event.preventDefault();
        }

        //刷新获取图片功能
        if (event.altKey && (event.key === 'a' || event.key === 'A')) {
            if(imgSelectNotes.childNodes[0].checked) {
                removeImgeSelectFunction();
                imageSelectFunction();
            }
            event.preventDefault();
        }   

        //清空clipboard
        if (event.altKey && (event.key === 'q' || event.key === 'Q')) {
            clipboardContent = '';
            syncClipboard(clipboardContent, notesApp.content, isSyncClipboard);
            event.preventDefault();
        }

        //clipboard撤销上一步
        if (event.ctrlKey && (event.key === 'z' || event.key === 'Z')) {
            rovokeLast();       
            syncClipboard(clipboardContent, notesApp.content, isSyncClipboard);;
            event.preventDefault();
        }    

    })

    //clone button
    var cloneButtonStyle = {
        zIndex: 2,
        position: 'absolute',
        top: '-1px',
        right: '25px',
        height: '25px',
        width: '25px',
        background: 'none',
        border: 'none',
        fontSize: '14px',
        color: 'white',
        margin: '3px',
        cursor: 'pointer'
    }
    Object.assign(clone.style, cloneButtonStyle);
    clone.innerText = '▞';
    clone.addEventListener('click', (event) => {
        let currentContainer = event.target.parentNode.parentNode;
        let top = currentContainer.style.top.split('px')[0];
        let right = `${25*(1 + (-0.5 + Math.random()))}vw`;
        createBar(new Date().getTime(), apps, {top: `${Number(top)+35}px`, right: right});
    })
    header.appendChild(clone);

    //close button
    var closeButtonStyle = {
        zIndex: 2,
        position: 'absolute',
        top: '0px',
        right: '0px',
        height: '25px',
        width: '25px',
        background: 'none',
        border: 'none',
        fontSize: '14px',
        color: 'white',
        margin: '3px',
        cursor: 'pointer'
    }
    Object.assign(close.style, closeButtonStyle);
    close.innerText = 'X';
    close.addEventListener('click', (event) => {
        let currentContainer = event.target.parentNode.parentNode;
        document.body.removeChild(currentContainer);
        dolphinsArray = dolphinsArray.filter(element => element.id != currentContainer.id);
    })
    header.appendChild(close);

    //title
    var titleStyle = {
        margin: '0 0 0 25px',
        fontSize: '14px',
        color: 'white',
        cursor: 'pointer',
        background: 'none',
        border: 'none'
    }
    title.innerText = 'Dolphins';
    title.id = 'dolphinsAI助手标题'
    title.classList.add('dolphinsText');
    Object.assign(title.style, titleStyle);
    header.appendChild(title);

    title.addEventListener('click', () => {
        AppContainer.forEach(container => {
            container.style.display = 'none';
        })
        ai.style.display = 'none';
        pageContainer.style.display = 'none';
        homePage.style.display = 'flex';
    })

    //appList
    appList.classList.add('listFieldSet')
    appList.innerHTML= `<legend class="dolphinsText" style="position: absolute; top: 8px; background-color: white; padding: 2px;width: 45%;">- AI及应用 -</legend>`;

    const kimi = createAiAppButton('kimi', aiUrl.kimi, imgs.logo.kimi);
    const doubao = createAiAppButton('豆包', aiUrl.doubao, imgs.logo.doubao);
    const yiyan = createAiAppButton('文心一言', aiUrl.baidu, imgs.logo.wenxin);
    const yuanbao = createAiAppButton('腾讯元宝', aiUrl.tencent, imgs.logo.yuanbao);
    const tongyi = createAiAppButton('通义千问', aiUrl.ali, imgs.logo.qianwen);
    appList.appendChild(kimi);
    appList.appendChild(doubao);
    appList.appendChild(yiyan);
    appList.appendChild(yuanbao);
    appList.appendChild(tongyi);

    //function panel
    functionPanel.classList.add('listFieldSet');
    functionPanel.innerHTML= `<legend class="dolphinsText" style="position: absolute; top: 8px; background-color: transparent; padding: 2px;">- 信息获取 -</legend>`;
    functionPanel.style.width = "48%";

    const getPageContextFunction = () => {
        var context = '';
        const contextElements = document.querySelectorAll('p, span, h1, h2, h3, label, textarea, input, a, legend')
        for(var i=0; i<contextElements.length; i++) {
            if(contextElements[i].classList.contains('dolphinsText')) {
                break;
            }
            context += contextElements[i].textContent + ' ';
        }
        navigator.clipboard.writeText(context)
        .then(() => {
            alert('页面全文本已复制，Crtl+V粘贴！');
        })
        .catch(err => {
            console.error('无法复制此文本：', err);
        });
    }

    const getPageContext = createFunctionButton('一键获取全文', 'button', getPageContextFunction);

    //一键下载所有图片
    
    const downloadAllImgs = () => {

        const imgs = document.body.querySelectorAll('img');
        
        for(var i=0; i<imgs.length; i++) {
            if(!imgs[i].classList.contains('dolphinsImgs')) {
                chrome.runtime.sendMessage({
                    action: "download", 
                    url: imgs[i].src ,
                    filename: new Date().getTime() + `.${imgs[i].type}`
                });
            }
        } 
    }

    const getAllImages = createFunctionButton('下载所有图片', 'button', downloadAllImgs);

    //划词加入剪贴板功能
    copyBtn.innerText = "+";
    copyBtn.classList.add('copyBtn');
    document.body.appendChild(copyBtn);   

    var selection = '';
    var lastClipboardContent = '';
    var isSelectMode = false;
    var splitString = ' ';
    var isSyncClipboard = false;

    // 监听点击事件以复制文本
    copyBtn.addEventListener('click', () => {
        lastClipboardContent = clipboardContent;
        clipboardContent += `<p>${selection}</p>`;

        const clipboardContentObject = document.createElement('div');
        clipboardContentObject.innerHTML = clipboardContent;

        let textContent = ''
        clipboardContentObject.querySelectorAll('p').forEach(p => {
            textContent += p.innerText + splitString;
        })
        navigator.clipboard.writeText(textContent);
        syncClipboard(clipboardContent, notesApp.content, isSyncClipboard);;
        console.log('Text copied to clipboard');
        // 复制成功后隐藏按钮
        copyBtn.style.display = 'none';
    });

    // 撤销上一步功能
    const rovokeLast = () => {
        clipboardContent = lastClipboardContent;
    }

    // 监听鼠标事件以确定选择的文本
    document.addEventListener('mouseup', function(e) {
        if(isSelectMode) {
            const selectedText = window.getSelection().toString().trim();
            if (selectedText) {
                selection = selectedText;
                copyBtn.style.display = 'block';
                copyBtn.style.left = `${e.pageX + 5}px`; // 偏移量，确保按钮不会覆盖选中的文本
                copyBtn.style.top = `${e.pageY + 5}px`;
            } else {
                copyBtn.style.display = 'none';
            }
        }
    });

    const toggleSelectTextMode = () => {
        if(textSelect.childNodes[0].checked) {
            if(textSelectNotes.childNodes[0].checked) {
                textSelectNotes.childNodes[0].checked = false;
            }
            isSelectMode = true;
        } else {
            isSelectMode = false;
            clipboardContent = '';
            copyBtn.style.display = 'none';
        }
    };

    const textSelect = createFunctionButton('划词模式', 'checkbox', toggleSelectTextMode);
 
    functionPanel.appendChild(getPageContext);
    functionPanel.appendChild(getAllImages);
    functionPanel.appendChild(textSelect);

    //style panel
    var initialBackgroundStyle = [];
    var initialFontStyle = [];

    const getInitialColor = () => {
        const backgroundElements = document.querySelectorAll('div, p, span, h1, h2, h3, label, textarea, input, a, pre');
        for(var i=0; i<backgroundElements.length; i++) {
            if(backgroundElements[i].id === 'dolphinsAI助手') {
                break;
            }
            initialBackgroundStyle.push({
                backgroundColor: backgroundElements[i].style.backgroundColor,
            })
            initialFontStyle.push({
                color:  backgroundElements[i].style.color,
                fontFamily: backgroundElements[i].style.fontFamily
            })        
        }

        initialBackgroundStyle.push({
            backgroundColor: document.body.style.backgroundColor,
        });
        initialFontStyle.push({
            color: document.body.style.color,
            fontFamily: document.body.style.fontFamily
        }); 
    }

    const lightsOffFunction = () => {
        const lightsOffElements = document.querySelectorAll('div, p, span, h1, h2, h3, label, textarea, input, a, pre');
        for(var i=0; i<lightsOffElements.length; i++) {
            if(lightsOffElements[i].id === 'dolphinsAI助手') {
                break;
            }
            lightsOffElements[i].style.backgroundColor = 'black';
            lightsOffElements[i].style.color = 'white';
        }
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
    }
    const lightsOnFunction = () => {
        const lightsOnElements = document.querySelectorAll('div, p, span, h1, h2, h3, label, textarea, input, a, pre');
        for(var i=0; i<lightsOnElements.length; i++) {
            if(lightsOnElements[i].id === 'dolphinsAI助手') {
                break;
            }
            lightsOnElements[i].style.backgroundColor = initialBackgroundStyle[i].backgroundColor;
            lightsOnElements[i].style.color = initialFontStyle[i].color;
            lightsOnElements[i].style.fontFamily = initialFontStyle[i].fontFamily;
        }
        document.body.style.backgroundColor = initialBackgroundStyle[initialBackgroundStyle.length-1].backgroundColor;
        document.body.style.color = initialFontStyle[initialFontStyle.length-1].color;
        document.body.style.fontFamily = initialFontStyle[initialFontStyle.length-1].fontFamily;
    }

    const toggleLights = () => {
        if(lightsOff.childNodes[0].checked) {
            getInitialColor();
            lightsOffFunction();
        } else {
            lightsOnFunction();
        }
        console.log(lightsOff.childNodes[0].checked)
    };

    const lightsOff = createFunctionButton('关   灯', 'checkbox', toggleLights);
    stylePanel.classList.add('listFieldSet');
    stylePanel.innerHTML= `<legend class="dolphinsText" style="position: absolute; top: 8px;background-color: transparent; padding: 2px;">- 页面设置 -</legend>`;
    stylePanel.style.width = "48%";
    stylePanel.appendChild(lightsOff);

    //改变背景颜色
    var isChangingColor = false;
    const setBackgroundColor = () => {
            const inline = document.createElement('div');
            const checkbox = document.createElement('input');
            const button = document.createElement('button');
            const label = document.createElement('label');
            const alphaValue = document.createElement('input');
            const alphaValue2 = document.createElement('input');
            const color1 = document.createElement('button');
            color1.innerText = '背景: ';
            color1.style.cursor = 'default';
            color1.style.background = 'none';
            color1.style.border = 'none';
            color1.style.marginLeft = '2px';
            color1.style.display = 'flex';
            color1.style.flexDirection = 'row';
            const color2 = document.createElement('button');
            color2.innerText = '字体: ';
            color2.style.cursor = 'default';
            color2.style.background = 'none';
            color2.style.border = 'none';
            color2.style.marginLeft = '2px';
            color2.style.display = 'flex';
            color2.style.flexDirection = 'row';

            var colorBarStyle = {
                width: '15px',
                height: '12px',
                overflow: 'hidden',
                border: 'none',
                margin:'2px 0 0 8px',
                outline: 'none',
                cursor: 'pointer',
                color: 'white'
            }

            const setColorBar1 = document.createElement('input');
            setColorBar1.value = '#000000';
            Object.assign(setColorBar1.style, colorBarStyle)
            new jscolor(setColorBar1, {
                alpha: 0.5, 
                alphaChannel: true,
                alphaElement: alphaValue
            });
            color1.appendChild(setColorBar1);

            const setColorBar2 = document.createElement('input');
            setColorBar2.value = '#000000';
            Object.assign(setColorBar2.style, colorBarStyle);
            new jscolor(setColorBar2, {
                alpha: 1, 
                alphaChannel: true,
                alphaElement: alphaValue2
            });
            color2.appendChild(setColorBar2);

            label.innerText = ' 改变网页颜色';  
            label.style.margin = '0px auto'; 
            label.style.cursor = 'default';
            button.classList.add('inputButtonStyle');
            button.style.height = '70%'

            setColorBar1.addEventListener('change', (event) => {
                if(isChangingColor) {
                    let color = hexToRgba(event.target.value, alphaValue.value);
                    console.log(color)
                    changeBackgroundColor(color);
                }
            });

            setColorBar2.addEventListener('change', (event) => {
                if(isChangingColor) {
                    let color = hexToRgba(event.target.value, alphaValue2.value)
                    changeFontColor(color);
                }
            });

            checkbox.type = "checkbox";
            checkbox.style.margin = '0px';
            checkbox.addEventListener('click', (event) => {
                if(event.target.checked === true) {
                    getInitialColor();
                    isChangingColor = true;
                } else {
                    isChangingColor =false;
                    lightsOnFunction();
                }
            })

            inline.style.margin = '2px';
            inline.appendChild(checkbox);
            inline.appendChild(label);
            button.appendChild(inline);
            button.appendChild(color1);
            button.appendChild(color2);

            return button
    }

    const changeBackgroundColor = (color) => {
        const backgroundElements = document.querySelectorAll('div, p, span, h1, h2, h3, label, textarea, input, a, pre');
        for(var i=0; i<backgroundElements.length; i++) {
            if(backgroundElements[i].id === 'dolphinsAI助手') {
                break;
            }
            backgroundElements[i].style.backgroundColor = color;
        }
        document.body.style.backgroundColor = color;
    }

    const changeFontColor = (color) => {
        const backgroundElements = document.querySelectorAll('div, p, span, h1, h2, h3, label, textarea, input, a, pre');
        for(var i=0; i<backgroundElements.length; i++) {
            if(backgroundElements[i].id === 'dolphinsAI助手') {
                break;
            }
            backgroundElements[i].style.color = color;
        }
        document.body.style.color = color;
    }

    const hexToRgba = (hex, a) => {
        // 移除16进制值前的'#'号
        hex = hex.replace(/^#/, '');
      
        // 检查16进制值是否为3位或6位
        if (hex.length === 3) {
          // 如果是3位16进制值，扩展为6位
          hex = hex.split('').map(function(x) { return x + x; }).join('');
        }
      
        // 将16进制值转换为RGB值
        var r = parseInt(hex.slice(0, 2), 16);
        var g = parseInt(hex.slice(2, 4), 16);
        var b = parseInt(hex.slice(4, 6), 16);
      
        // 返回RGB值
        return `rgba(${r},${g},${b},${a})`
      }

    stylePanel.appendChild(setBackgroundColor());

    const panelContainer = document.createElement('div');
    panelContainer.appendChild(functionPanel);
    panelContainer.appendChild(stylePanel);
    var panelContainerStyle = {
        display:'flex',
        flexDirection: 'row',
        width: '100%',
        height: '79%'
    }
    Object.assign(panelContainer.style, panelContainerStyle);

    //surf internet
    const pageContainer = document.createElement('iframe');
    const inputField = document.createElement('div');

    pageContainer.addEventListener('mouseover', function() {
        // 让iframe获得焦点
        this.contentWindow.focus();
      });

    container.appendChild(pageContainer);

    pageContainer.classList.add('iframeStyle');
    pageContainer.style.display = 'none';
    inputField.classList.add('listFieldSet');
    inputField.style.padding = '2px';
    inputField.style.height = '15%';
    inputField.style.width = '97%';
    inputField.style.flexDirection = 'row';
    inputField.style.overflow = 'hidden';

    input.type = "text";
    input.placeholder = "输入网址按回车跳转(MOYU)或选右边菜单";
    input.classList.add("inputUrl");
    inputField.appendChild(input);   

    const mySelect = document.createElement('select');
    var mySelectStyle = {
        width: '18px', 
        border: 'none', 
        background: 'none',
        zIndex: '10'
    }
    Object.assign(mySelect.style, mySelectStyle);
    inputField.appendChild(mySelect);

    const option0 = document.createElement('option');
    option0.innerText = '请选择：';
    option0.value = '';
    mySelect.appendChild(option0);

    const option1 = document.createElement('option');
    option1.innerText = '小霸王游戏';
    option1.value = 'https://www.yikm.net/';
    mySelect.appendChild(option1);

    const option2 = document.createElement('option');
    option2.innerText = 'kbh小游戏';
    option2.value = 'https://kbhgames.com/';
    mySelect.appendChild(option2);

    const option3 = document.createElement('option');
    option3.innerText = '2D吃鸡';
    option3.value = 'https://suroi.fpsgo.net/';
    mySelect.appendChild(option3);

    const option4 = document.createElement('option');
    option4.innerText = 'sketchpad';
    option4.value = 'https://sketchpad.app/zh/';
    mySelect.appendChild(option4);

    const option5 = document.createElement('option');
    option5.innerText = '今天吃什么？';
    option5.value = 'https://toolwa.com/eat/';
    mySelect.appendChild(option5);

    const functionContainer = document.createElement('div');
    functionContainer.appendChild(panelContainer);
    functionContainer.appendChild(inputField);
    functionContainer.style.width = '50%';
    functionContainer.style.margin = '0';

    mySelect.addEventListener('change', () => {
        let selectVaule = mySelect.value;
        pageContainer.src = selectVaule;
        pageContainer.style.display = 'block';
        list.style.height = '0px';
        list.style.paddingTop = '0px';

        AppContainer.forEach(container => {
            container.style.display = 'none';
        })
        ai.style.display = 'none';
        homePage.style.display = 'none';

        container.style.height = '600px';
        container.style.width = '800px';
        lastContainerSize.height = container.style.height;
        lastContainerSize.width = container.style.width;

    })

    input.addEventListener('keydown', (event) => {

        if(event.key === 'Enter' || event.keyCode === 13) {
            if(input.value.slice(0,5) != 'https') {
                input.value = 'https://' + input.value;
            }
            pageContainer.src = input.value;
            pageContainer.style.display = 'block';
            list.style.height = '0px';
            list.style.paddingTop = '0px';
            input.value = '';
            event.stopPropagation();
            event.preventDefault();

            container.style.height = '600px';
            container.style.width = '800px';
            lastContainerSize.height = container.style.height;
            lastContainerSize.width = container.style.width; 
            
            AppContainer.forEach(container => {
                container.style.display = 'none';
            })
            ai.style.display = 'none';
            homePage.style.display = 'none';
        }
    })

    //list
    var listStyle = {
    zIndex: '20',
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: '30px',
    right: '0px',
    height: '0px',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,1)',
    boxShadow: '2px 2px 2px 0 gray',
    borderRadius: '0 0 5px 0',
    margin: '2px 0',
    transition: 'height 0.5s ease',
    overflow: 'hidden'
    }
    Object.assign(list.style, listStyle);
    list.appendChild(functionContainer);
    list.appendChild(appList);
    container.appendChild(list);

    //select list control button
    var selectButtonStyle = {
        position: 'absolute',
        top: '2px',
        right: '16px',
        height: '30px',
        width: '100px',
        background: 'none',
        border: 'none',
        fontSize: '24px',
        color: 'white',
        textAlign: 'center',
        cursor: 'pointer',
        display: 'none'
    }
    Object.assign(select.style, selectButtonStyle);
    select.innerText = '≡';
    select.addEventListener('click', () => {
        if(list.style.height === '175px') {
            list.style.height = '0px';
            list.style.paddingTop = '0px';
        } else {
            list.style.height = '175px';
            list.style.paddingTop = '2px';
        }
    })
    header.appendChild(select);

    //ai
    ai.src = aiUrl.kimi;  // set kimi as default
    ai.classList.add('iframeStyle');
    ai.style.display = 'none';
    container.appendChild(ai);

    //笔记app
    const notesContainer = document.createElement('div');
    const notesHeader = document.createElement('div');
    notesContainer.classList.add('iframeStyle');
    notesContainer.style.position = 'absolute';
    notesContainer.style.backgroundColor = 'rgb(240,240,240)';
    notesContainer.style.display = 'none';
    notesContainer.style.zIndex = '10';   

    var notesHeaderStyle = {
        height: '40px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden'
    }
    Object.assign(notesHeader.style, notesHeaderStyle);
    notesHeader.innerHTML = `<div style="width: 180px;margin: 10px 0 0 10px;display: flex;flex-direction: row; align-items: center; ">  
        <img class="dolphinsImgs" src=${imgs.logo.notes} style="height: 30px; margin: 5px;">
        <p style="text-align: left;"><strong> Dolphins 笔记<s/trong></p>    
    </div>`;
    notesContainer.appendChild(notesHeader);

    const notesApp = notes();
    notesContainer.appendChild(notesApp.container);

    const notesButton = createAppButton('Dolp.笔记', imgs.logo.notes, notesContainer);
    notesButton.addEventListener('click', () => {
        container.style.width = '550px';
        container.style.height = '700px';
    })

    appList.appendChild(notesButton);
    container.appendChild(notesContainer); 
    
    //获取全文
    const getPageContextNotes = createFunctionButton('获取全文', 'button', getPageContextFunction);

    //划词模式
    const toggleSelectTextModeNotes = () => {
        if(!isSelectMode) {
            if(textSelect.childNodes[0].checked) {
                textSelect.childNodes[0].checked = false;
            }
            isSyncClipboard = true;
            isSelectMode = true;
            textSelectNotes.childNodes[0].checked = true;
            textSelectNotes.style.backgroundColor = 'var(--main-color)';
            textSelectNotes.style.borderColor = 'black';
            textSelectNotes.style.color = 'white';
            textSelectNotes.style.fontWeight = 'bold';
        } else {
            isSelectMode = false;
            clipboardContent = '';
            copyBtn.style.display = 'none';
            if(imgSelectNotes.childNodes[0].checked === false) {
                cancelSyncClipboard(notesApp.content);
                isSyncClipboard = false;
            }
            textSelectNotes.childNodes[0].checked = false;
            textSelectNotes.style.backgroundColor = 'white';
            textSelectNotes.style.borderColor = 'var(--main-color)';
            textSelectNotes.style.color = 'gray';
            textSelectNotes.style.fontWeight = 'normal';
        }
    };
    const textSelectNotes = createFunctionButton('划词模式', 'checkbox',toggleSelectTextModeNotes);
    textSelectNotes.style.color = 'gray';
    textSelectNotes.style.cursor = 'pointer';
    textSelectNotes.childNodes[1].style.cursor = 'pointer';
    textSelectNotes.childNodes[0].style.display = 'none';
    textSelectNotes.addEventListener('click',toggleSelectTextModeNotes);

    //图片获取
    var btns = [];
    var selectImgs = '';

    const convertUrlToBase64 = (imageUrl, callback) => {
        fetch(imageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function() {
                callback(reader.result);
            };
        })
        .catch(error => console.error('Error converting image to base64', error));
    }

    const imageSelectFunction = () => {
        btns = [];
        const imgs = document.querySelectorAll('img:not(.dolphinsImgs)');
        for(var i=0; i<imgs.length-1; i++) {
            let btn = document.createElement('button');
            btns.push(btn);
            btns[i].classList.add('imgSelectBtn');
            btns[i].id = i;
            btns[i].innerText = '+';
            btns[i].style.zIndex = '5';
            btns[i].style.cursor = 'crosshair';
            if(imgs[i].parentNode.nodeName === 'A' || imgs[i].parentNode.tagName === 'A') {
                imgs[i].parentNode.parentNode.appendChild(btn);
                imgs[i].parentNode.parentNode.style.overflow = 'visible';    
                imgs[i].parentNode.parentNode.style.overflow = 'relative';   
            } else {
                imgs[i].parentNode.appendChild(btn);
                imgs[i].parentNode.style.overflow = 'visible';  
                imgs[i].parentNode.style.position = 'relative';                  
            }      

            btns[i].addEventListener('contextmenu', function(event) {    
                convertUrlToBase64(imgs[event.target.id].src,  (base64data) => {
                    selectImgs = `<img width="250" src=${base64data}>`;            
                    lastClipboardContent = clipboardContent;
                    clipboardContent += selectImgs;
                    syncClipboard(clipboardContent, notesApp.content, isSyncClipboard);;  
                }); 

                //禁止右键菜单
                event.preventDefault(); 
                event.stopPropagation();
                return false;
            })
        }
    }

    const removeImgeSelectFunction = () => {
        document.body.querySelectorAll('button[class="imgSelectBtn"]').forEach(btn => {
            btn.remove();
        });
        btns = [];
    }

    var isSelectImgMode = false;
    const toggleSelectImgModeNotes = () => {   
        if(!isSelectImgMode) {
            isSyncClipboard = true;
            isSelectImgMode = true;
            imgSelectNotes.childNodes[0].checked = true;
            imageSelectFunction();
            imgSelectNotes.style.backgroundColor = 'var(--main-color)';
            imgSelectNotes.style.borderColor = 'black';
            imgSelectNotes.style.color = 'white';
            imgSelectNotes.style.fontWeight = 'bold';
        } else {
            removeImgeSelectFunction();
            selectImgs = '';
            clipboardContent = '';
            if(textSelectNotes.childNodes[0].checked === false) {
                cancelSyncClipboard(notesApp.content);;
                isSyncClipboard = false;
            }
            isSelectImgMode = false;
            imgSelectNotes.childNodes[0].checked = false;
            imgSelectNotes.style.backgroundColor = 'white';
            imgSelectNotes.style.borderColor = 'var(--main-color)';
            imgSelectNotes.style.color = 'gray';
            imgSelectNotes.style.fontWeight = 'normal';
        }
    };
    
    const imgSelectNotes = createFunctionButton('选图模式', 'checkbox', () => toggleSelectImgModeNotes('checkbox'));
    imgSelectNotes.style.color = 'gray';
    imgSelectNotes.style.cursor = 'pointer';
    imgSelectNotes.childNodes[1].style.cursor = 'pointer';
    imgSelectNotes.childNodes[0].style.display = 'none';
    imgSelectNotes.addEventListener('click', () => toggleSelectImgModeNotes('button'));

    imgSelectNotes.id = "imgSelectNotesButton";
    const topTipText = document.createElement('span');
    topTipText.classList.add('tooltiptext');
    topTipText.innerText = "开启后右键点击图片左上角按钮选取图片";
    imgSelectNotes.appendChild(topTipText);

    getPageContextNotes.style.margin = '10px 5px 0 5px';
    getPageContextNotes.style.width = '80px';
    getPageContextNotes.innerText = '获取全文';
    textSelectNotes.style.margin = '10px 5px 0 5px';
    textSelectNotes.style.width = '80px';
    imgSelectNotes.style.margin = '10px 5px 0 5px';
    imgSelectNotes.style.width = '80px';
    notesHeader.appendChild(getPageContextNotes);
    notesHeader.appendChild(textSelectNotes);
    notesHeader.appendChild(imgSelectNotes);

    //dragable setting
    header.onmousedown = function (e) {
    e.preventDefault();
    var startX = e.clientX;
    var startY = e.clientY;
    var initialX = container.offsetLeft;
    var initialY = container.offsetTop;

    document.onmousemove = function (e) {
        container.style.left = (initialX + e.clientX - startX) + 'px';
        container.style.top = (initialY + e.clientY - startY) + 'px';
    };

    document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    };
    };

    //create new app
    apps.forEach(app => {
        createApp(app.name, app.logo, app.creater());
    })

    dolphinsArray.push(
        {
            id: id,
            element: container
        }
    )

    return container
}
