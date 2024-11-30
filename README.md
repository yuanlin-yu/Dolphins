# Dolphins

Dolphins 是一款浏览器插件，是个人多功能集成浏览器AI助手，帮助用户快速便捷收集网页有用信息、改变网页展示风格，并集成了中国国内主流AI应用便于处理收集的信息。插件以可伸缩可移动可隐藏的悬浮窗口形式存在，同时可以自我克隆，复制出多个窗口，调用不同的应用，适用于各种场景。插件代码提供方便的API，进行后续应用扩展。

Dolphins is a browser extension that serves as a personal multifunctional integrated browser AI assistant, helping users quickly and conveniently collect useful information from web pages, change the style of web page display, and integrate mainstream AI applications in China for processing collected information. The plugin exists in the form of a scalable, movable, and hideable floating window, and can clone itself, creating multiple windows to call different applications, suitable for various scenarios. The plugin code provides a convenient API for subsequent application expansion.

主要功能：
* 一键获取网页全文，便于AI处理；
* 一键下载网页所有图片；
* 划词模式，通过鼠标划词，选取并任意组合文字段；
* 改变网页显示风格：关灯（背景转为黑色，文字白色），或任意设置网页背景、文字的颜色和透明度；
* 集成AI应用：已内置kimi、豆包、文心一言等主流AI大模型网站，可直接进行调用；
* Dolphins笔记应用：插件自带自主开发的笔记应用，可方便收集及处理网页信息，包括获取全文、划词模式、选取图片、获取链接，然后导出word笔记；
* 自我克隆功能：点击dolphins悬浮窗右上角'▞'按钮，即可复制出新的窗口，然后同时调用其他功能，适用于各种场景信息处理；
* 内置网页浏览（MOYU）功能：输入链接可在悬浮窗内浏览网页，默认收集了一些有趣的网页，如小游戏等；

Main features:
* One-click to get the full text of the web page, facilitating AI processing;
* One-click to download all images from the web page;
* Selection mode, select and arbitrarily combine text segments by mouse selection;
* Change web page display style: turn off the lights (background turns black, text white), or set the background and text color and transparency of the web page arbitrarily;
* Integrated AI applications: Built-in mainstream AI model websites such as kimi, DouBao, and WenxinYiYan, which can be directly called;
* Dolphins note application: The plugin comes with its own note application, which can conveniently collect and process web page information, including getting the full text, selection mode, selecting images, and getting links, and then exporting to a Word note;
* Self-cloning function: Click the '▞' button in the upper right corner of the Dolphins floating window to copy a new window, and then call other functions at the same time, suitable for various scenarios of information processing;
* Built-in web browsing (MOYU) function: Enter a link to browse the web page within the floating window, and collect some interesting web pages by default, such as small games, etc.;

快捷键：
* Alt+`:展开/收缩悬浮窗口；
* Alt+1:隐藏/显示悬浮窗口；

Shortcut keys:
* Alt+`: Expand/collapse the floating window;
* Alt+1: Hide/show the floating window;

## :rocket: 开始使用 Getting Started

**1. 克隆本仓库链接 Clone this repository link**:
```bash
git clone 'https://github.com/yuanlin-yu/dolphins.git'
```
或从本页面下载。
Or download from this page.

**2. 导入浏览器插件即可使用 Import the browser extension to use**:

打开浏览器（推荐使用chrome）扩展程序页面，以本项目根目录下的`crx`文件夹作为插件目录导入，任意打开网页，网页页面右上角区域即可看见悬浮窗口，点击logo标记可展开窗口，即可进入欢迎使用页面，通过菜单选取各种功能进行使用，enjoy！

Open the browser (recommended to use Chrome) extension page, import the plugin directory using the `crx` folder under the root directory of this project, open any web page, and you can see the floating window in the upper right corner of the web page. Click the logo mark to expand the window and enter the welcome page, select various functions through the menu to use, enjoy!

**3*. 应用扩展**:

如果想自行开发应用并加入到插件中方便使用，可以使用本项目提供的API，非常简单方便，主要步骤：

1)在跟目录`apps`文件夹内新建应用文件夹，本项目以提供例子`exampleAPP`文件夹，可浏览查看；
2）在`content-script.js`中导入开发的应用文件及logo图像（浏览器环境下建议转成base64码方便使用），并填写`apps`数组，如下所示：

```javascript
// new app can be imported from here, here is the example:
import { exampleApp } from './apps/exampleApp/exampleApp';
import { exampleAppLogo } from './apps/exampleApp/imgs.json';  //app logo's base64 code 
const apps = [  //apps array
    {
        name: 'example',
        logo: exampleAppLogo,
        creater: exampleApp
    }
];
```
3）使用webpack绑定文件

这个扩展包含了外部的JavaScript库，这可能会导致在Chrome中运行困难。解决这个问题的一个方法是使用webpack来打包和更新文件，然后再在Chrome中加载扩展。默认情况下，打包后的文件存储在该仓库的src/dist文件夹中。
`webpack` 已经安装在了这个仓库中，所以当你完成后，可以在根目录下使用下面的命令来打包你的文件。

```bash
npx webpack
```
4)在浏览器扩展程序页面重新刷新插件，即可在菜单“AI及应用”栏目处看到刚新增的应用。

If you want to develop your own applications and add them to the plugin for easy use, you can use the API provided by this project, which is very simple and convenient. The main steps are:

1)Create a new application folder in the apps folder at the root directory. This project provides an example exampleAPP folder, which you can view;
2)In content-script.js, import the developed application files and logo images (it is recommended to convert to base64 code for browser environment use), and fill in the apps array as follows:

```javascript
// new app can be imported from here, here is the example:
import { exampleApp } from './apps/exampleApp/exampleApp';
import { exampleAppLogo } from './apps/exampleApp/imgs.json';  //app logo's base64 code 
const apps = [  //apps array
    {
        name: 'example',
        logo: exampleAppLogo,
        creater: exampleApp
    }
];
```

3)Use webpack to bind files
This extension includes external JavaScript libraries, which may cause difficulty in running in Chrome. One way to solve this problem is to use webpack to bundle and update files before loading the extension in Chrome. The bundled files are stored in the src/dist folder of this repository by default.
webpack is already installed in this repository, so after you finish, you can use the following command in the root directory to bundle your files.

```javascript
npx webpack
```

4)Refresh the plugin in the browser extension page, and you can see the newly added application in the "AI and Applications" menu.


## :green_book: 许可证 License

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html).
