import { createBar, dolphinsArray } from './dolphinsCreater';

// new app can be imported from here, here is the example:
// import { exampleApp } from './apps/exampleApp/exampleApp';
// import { exampleAppLogo } from './apps/exampleApp/imgs.json';  //app logo's base64 code 
const apps = [
    // {
    //     name: 'example',
    //     logo: exampleAppLogo,
    //     creater: exampleApp
    // }
];

createBar('0', apps);

//contact with popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "toggle") {

        if(dolphinsArray.length === 0) {
            dolphinsArray.push({
                id: '0',
                element: createBar('0', apps)
            })
        } else {
            if (dolphinsArray[0].element.style.display === 'none') {
                dolphinsArray.forEach(container => {
                    container.element.style.display = 'flex';
                })
            } else {
                dolphinsArray.forEach(container => {
                    container.element.style.display = 'none';
                })
            }
        }
   
        sendResponse({response: "Function called"});
    }
});

//setting css style
var style = document.createElement('style');
style.type = 'text/css';
style.innerText = `
.dolphinsContainer {
    --main-color: rgb(30, 100, 240);
    z-index: 20;
    display: flex;
    flex-direction: column;
    width: 150px;
    min-width: 150px;
    height: 30px;
    min-height: 30px;
    background-color: white;
    text-align: center;
    line-height: 100px;
    position: fixed;
    resize: none;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 1px 1px 3px 2px rgb(180,180,180);
    border: none;
    transition: width 0.5s ease, min-width 0.5s ease, height 0.5s ease
}

.dolphinsContainer * {
    line-height: 18px;
    font-family: Arial, sans-serif;
    font-size: 12px;
}

.dolphinsHomePage {
    position: absolue;
    top: 30px;
    left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
    width: 100%;
    height: 100%;
}

.dolphinsStartButton {
    width: 120px;
    height: 35px;
    margin: 50px 0 110px 0;
    background-color: rgba(30, 100, 240, 0.5);
    border: none;
    border-radius: 5px;
    transition: background-color 0.5s ease, box-shadow 0.5s ease;
    color: white;
    cursor: pointer;
    font-size: 18px;
}

.dolphinsStartButton:hover {
    background-color: var(--main-color);
    font-weight: bold;
    box-shadow: 2px 2px 2px 2px rgb(180,180,180);
}

.dolphinsLinks {
    position: absolute;
    bottom: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: rgb(180,180,180);
}

.listFieldSet {
    width: 50%;
    background-color: white;
    border: 1px solid rgb(200,200,200);
    margin: 2px 1px 2px 2px;
    padding: 25px 8px 8px 8px;
    transition: height 0.5s ease;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: auto;
    flex-wrap: wrap;
    border-radius: 5px;
}

.listFieldSet::-webkit-scrollbar {
    height: 8px; 
    width: 8px; 
    margin: 2px;
    opacity: 0.3;
}
.listFieldSet::-webkit-scrollbar-thumb {
    background-color: rgba(30, 100, 240, 0.3); 
    border-radius: 5px;
}
.listFieldSet::-webkit-scrollbar-thumb:hover {
    background-color: var(--main-color); 
    border-radius: 5px;
}

.buttonStyle {
    padding: 2px;
    width: 110px;
    height: 20px;
    margin: 2px;
    background-color: var(--main-color);
    border-radius: 5px;
    border: none;
    cursor: pointer;
    color: white
}

.buttonStyle:hover {
    border: 1px solid black;
    font-weight: bold; 
}

.checkBoxStyle {
    width: 110px;
    padding: 2px;
    height: 20px;
    margin: 2px;
    border: 1px solid var(--main-color);
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    cursor: default;
    text-align: center;
    disabled: false;
    opacity: 1;
}

.inputButtonStyle {
    width: 110px;
    padding: 2px;
    height: 60px;
    margin: 2px;
    border: 1px solid var(--main-color);
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    cursor: default;
    text-align: center;
    overflow: 'hidden';
}

.inputUrl {
    height: 100%;
    width: 90%;
    background-color: rgb(240, 240, 240, 0.8);
    border-radius: 2px;
    margin: 0 2px;
    border: none;
    text-align: center;
}

.inputUrl:focus {
    outline: 1px solid var(--main-color);
}

.copyBtn {
    z-index: 25;
    display: none;
    width: 50px;
    height: 20px;
    color: white;
    font-weight: bold;
    border-radius: 2px;
    border: none;
    background-color: rgb(30, 100, 240);
    position: absolute;
    top: 0px;
    left: 0px;
    margin: 2px;
}

.imgSelectBtn {
    z-index: 25;
    width: 20px;
    height: 20px;
    color: white;
    font-weight: bold;
    border-radius: 2px;
    border: none;
    background-color: rgb(30, 100, 240);
    position: absolute;
    top: -5px;
    left: -5px;
    margin: 2px;
}

.linksSelectBtn {
    z-index: 25;
    width: 20px;
    height: 20px;
    color: white;
    font-weight: bold;
    font-size: 12px;
    border-radius: 2px;
    border: none;
    background-color: rgb(30, 100, 240);
    position: absolute;
    top: -5px;
    right: -5px;
    margin: 2px;
}

.imgSelectBtn:hover, .linksSelectBtn:hover, .copyBtn:hover {
    background-color: red;
}

.recordBtn {
    width: 50px;
    height: 20px;
    border-radius: 5px;
    border: none;
    background-color: var(--main-color);
    // box-shadow: 1px 1px 1px 0 gray;
    padding: 2px;
    margin: 2px 10px;
    color: white;
    transition: opacity 0.3s ease;
    opacity: 0.7;
}

.deleteBtn {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: none;
    background-color: var(--main-color);
    box-shadow: 1px 1px 1px 0 gray;
    color: white;
    transition: opacity 0.3s ease;
    opacity: 0.5;
    position: absolute;
    top: 0px;
    left: 0px;
    font-size: 12px;
    margin: 2px;
}

.recordBtn:hover, .deleteBtn:hover {
    opacity: 1;
    font-weight: bold;
}

.notesInput {
    height: 70%;
    width: 98%;
    border-radius: 5px;
    margin: 0;
    padding: 8px;
    border: none;
    resize: none;
    color: black;
}

.notesInput:focus {
    outline: none;
}

#imgSelectNotesButton .tooltiptext, #linksSelectNotesButton .tooltiptext {
    width: 120px;
    background-color: white;
    color: black;
    text-align: center;
    border-radius: 2px;
    padding: 2px;
    z-index: 15;
    opacity: 0;
    transition: opacity 0.3s ease 0.5s;
    margin: 20px 0 0 10px;
    position: absolute;
  }
  
#imgSelectNotesButton:hover .tooltiptext, #linksSelectNotesButton:hover .tooltiptext {
    opacity: 1;
}

.iframeStyle {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0
    border: none;
    margin-top: 30px;
}
`;
document.head.appendChild(style);

