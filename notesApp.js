import { cleanClipboard } from './dolphinsCreater';
import { asBlob } from './dependencies/html-docx';

var containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2px'
}

var contentStyle = {
    flex: '4',
    width: '95%',
    borderRadius: '5px',
    margin: '8px 8px 4px 8px',
    padding: '8px',
    border: '1px solid rgb(200,200,200)',
    lineHeight: '1.5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollBehavior: 'smooth'
}

var inputContainerStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
    borderRadius: '5px',
    margin: '8px 8px 80px 8px',
    padding: '8px',
    border: '1px solid rgb(200,200,200)',
    color: 'black',
    backgroundColor: 'white'
}

var btnContainterStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '5px 0 0 0'
}

var syncBtnStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '300px',
    height: '20px',
    padding: '4px',
    margin: '2px',
    background: 'none',
    border: 'none',
    cursor: 'default',
    color: 'gray'
}

var messageStyle = {
    backgroundColor: 'white',
    borderRadius: '2px',
    margin: '2px',
    padding: '2px',
    width: '95%',
    overflowWrap: 'break-word'
}

var messageTimeStyle = {
    fontSize: '12px',
    color: 'gray'
}

var clipboardContainerStyle = {
    position: 'relative',
    width: '100%'
}

var id = 0;
var messageArray = [];

const saveData = (data) => {

    chrome.runtime.sendMessage({
        action: "notes-save", 
        data: data
    });

    // if (typeof(Storage) !== "undefined") {
    //     // Code to handle localStorage
    //     localStorage.setItem('notesData', data);
    // } else {
    //     // No Web Storage support
    //     console.error('Local Storage is not supported.')
    // }
}

// 将chrome.runtime.sendMessage包装成返回Promise的函数
const sendMessage = (message) => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(message, function(response) {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(response);
            }
        });
    });
};

// 使用async/await使readData函数表现得像同步函数
const readData = async (content) => {
    try {
        const response = await sendMessage({ action: "notes-read" });
        // console.log("Response from background script:", response.data);
        content.innerHTML = response.data;
        let deleteBtnInitial = content.querySelectorAll('button[class="deleteBtn"]');
        deleteBtnInitial.forEach(deleteBtn => {
            deleteBtn.onclick = (event) => {
                event.target.parentNode.remove();
                saveData(content.innerHTML);                
            };
        })
        let imgSelectBtnInitial = content.querySelectorAll('button[class="imgSelectBtn"]');
        imgSelectBtnInitial.forEach(btn => {
            btn.remove();
        })
    } catch (error) {
        console.error("Error sending message:", error);
        throw error; 
    }
};

// const readData = () => {
//     if (typeof(Storage) !== "undefined") {
//         // Code to handle localStorage
//         let result = localStorage.getItem('notesData');
//         return result
//     } else {
//         // No Web Storage support
//         console.error('Local Storage is not supported.')
//     }
// }


//downloadDocx
const downloadDocx = (htmlString) => {

    var content = document.createElement('div');
    content.innerHTML = htmlString;
    content.querySelectorAll('button').forEach(btn => {
        btn.remove()
    })
    content.querySelectorAll('p[class="currentMsgTime"]').forEach(p => {
        p.remove()
    })
    
    var docxContent = content.innerHTML;
    var data = `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            ${docxContent}
        </body>
    </html>`

    var blob = asBlob(data);
    const url = URL.createObjectURL(blob);

    chrome.runtime.sendMessage({
        action: "downloadDocx", 
        url: url
    });
}

const recordMsg = (message, content) => {

    let currentMsgContainer = document.createElement('div');
    let currentMsgTime = document.createElement('p');
    let currentMsg = document.createElement('div');
    let deleteBtn = document.createElement('button');

    Object.assign(currentMsgTime.style,messageTimeStyle);
    Object.assign(currentMsg.style, messageStyle);
    currentMsgContainer.style.width = '100%';
    currentMsgContainer.style.position = 'relative';
    
    currentMsgTime.innerText = `${new Date().toLocaleString()}`;
    currentMsgTime.classList.add('currentMsgTime');
    currentMsg.innerHTML = message.innerHTML;
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.innerText = 'x';
    deleteBtn.onclick = (event) => {
        event.target.parentNode.remove();
        saveData(content.innerHTML)
    };

    currentMsgContainer.append(currentMsgTime);
    currentMsgContainer.append(deleteBtn);
    currentMsgContainer.append(currentMsg);
    currentMsgContainer.id = id;

    messageArray.push(currentMsgContainer);
    content.appendChild(currentMsgContainer);
    id++;

    saveData(content.innerHTML);

    content.scrollTop = content.scrollHeight;
}

export const notes = () => {

    const container = document.createElement('div');
    const inputContainer = document.createElement('div');
    const input = document.createElement('textarea');
    const btnContainter = document.createElement('div');
    const recordBtn = document.createElement('button');
    const clearBtn = document.createElement('button');
    const syncBtn = document.createElement('button');
    const syncBtnText = document.createElement('p');
    const outputBtn = document.createElement('button');
    const message = document.createElement('div');
    const content = document.createElement('div');

    container.id = new Date() + 'notes';

    Object.assign(container.style, containerStyle);
    Object.assign(content.style, contentStyle);
    Object.assign(inputContainer.style, inputContainerStyle);
    Object.assign(btnContainter.style, btnContainterStyle);
    Object.assign(syncBtn.style, syncBtnStyle);
    Object.assign(message.style, messageStyle);
    input.classList.add('notesInput');
    recordBtn.classList.add('recordBtn');
    clearBtn.classList.add('recordBtn');
    outputBtn.classList.add('recordBtn');
    outputBtn.style.position = 'absolute'; 
    outputBtn.style.top = '13px'; 
    outputBtn.style.right = '2px'; 
    outputBtn.style.zIndex = '10'; 
    outputBtn.style.height = '20px'; 

    container.appendChild(content);
    container.appendChild(inputContainer);
    inputContainer.appendChild(input);
    inputContainer.appendChild(btnContainter);
    btnContainter.appendChild(syncBtn);

    const clearAndRecordBtn = document.createElement('div');
    clearAndRecordBtn.style.display = 'flex';
    clearAndRecordBtn.style.flexDirection = 'row';
    clearAndRecordBtn.style.justifyContent = 'flex-end';
    clearAndRecordBtn.appendChild(clearBtn);
    clearAndRecordBtn.appendChild(recordBtn);
    btnContainter.appendChild(clearAndRecordBtn);

    input.placeholder = '粘贴网页内容于此处或输入文本...';
    recordBtn.innerText = '记录';
    clearBtn.innerText = '清空';
    syncBtnText.textContent = '*Alt+Q清空动态信息;Alt+A刷新选图/获取链接;';
    syncBtnText.classList.add('dolphinsText');
    syncBtn.appendChild(syncBtnText);
    outputBtn.innerText = '导出';
    container.appendChild(outputBtn);
    
    //读取记录信息
    readData(content);

    input.addEventListener('change', () => {
        message.innerHTML = `<div style="text-align: left;">
             ${input.value}        
        </div>`
        const imgs = message.querySelectorAll('img');
        imgs.forEach(img => {
            img.style.display = 'block';
            img.style.margin = '10px auto';
            img.style.maxWidth = '90%';
        })

    })

    input.addEventListener('keydown', (event) => {
        if(event.key === 'Enter') {
            if(input.value.length > 0) {
                message.innerHTML = `<div style="text-align: left;">
                    ${input.value}        
                </div>`;
                input.value = '';
                recordMsg(message, content);
                event.preventDefault();
            }
        }
    })

    recordBtn.addEventListener('click', () => {
        if(input.value.length > 0) {
            recordMsg(message, content);
            input.value = '';
        }        
    })

    clearBtn.addEventListener('click', () => {
        content.innerHTML = ``;
        input.value = '';   
        saveData(content.innerHTML);
    })

    outputBtn.addEventListener('click', () => {
        if(content.innerHTML.length > 0) {
            downloadDocx(content.innerHTML);
        }
    })    

    return {
        container: container,
        content: content
    }
}

//clipboard
const clipboardContainer = document.createElement('div');
const clipboardMsg = document.createElement('div');
const confirmBtn = document.createElement('button');
const cancleBtn = document.createElement('button');
clipboardContainer.classList.add('clipboardContainer');
Object.assign(clipboardContainer.style, clipboardContainerStyle);
Object.assign(clipboardMsg.style, messageStyle);
clipboardMsg.style.width = '100%';
clipboardMsg.style.margin = '0';
clipboardMsg.style.border = '1px solid var(--main-color)';
confirmBtn.classList.add('deleteBtn');
confirmBtn.innerText = '√';
cancleBtn.classList.add('deleteBtn');
cancleBtn.innerText = 'x';
cancleBtn.style.margin = '2px 2px 2px 25px';
clipboardContainer.appendChild(confirmBtn);
clipboardContainer.appendChild(cancleBtn);
clipboardContainer.appendChild(clipboardMsg);

export const syncClipboard = (data, content, isSyncClipboard = false) => {    
    if(isSyncClipboard) {       

        if(data.length === 0) {
            content.removeChild(clipboardContainer);
            return
        }

        let dataContainner = document.createElement('div');
        dataContainner.innerHTML = `<div style="text-align: left;">
                ${data}        
        </div>`
        let imgs = dataContainner.querySelectorAll('img');
        imgs.forEach(img => {
            img.style.display = 'block';
            img.style.margin = '10px auto';
            img.style.maxWidth = '90%';
        })

        clipboardMsg.innerHTML = dataContainner.innerHTML;
        content.appendChild(clipboardContainer);
        content.scrollTop = content.scrollHeight;

        confirmBtn.addEventListener('click', () => {
            content.removeChild(clipboardContainer);
            recordMsg(clipboardMsg, content);
            cleanClipboard();
        })
        
        cancleBtn.addEventListener('click', () => {
            cancelSyncClipboard(content);
            cleanClipboard();
        })
    }
}

export const cancelSyncClipboard = (content) => {
    clipboardMsg.innerHTML = ``;
    if(content.contains(clipboardContainer)) {
        content.removeChild(clipboardContainer);
    }
}