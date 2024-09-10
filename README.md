
# ![](./src/web/meta/resources/img/logo-70.png) filecat

- 中文 | [English ](./doc/EN_README.md)
- 使用[filebrowser](https://github.com/filebrowser/filebrowser)好看的ui来浏览文件，同时具备服务器管理能力。
## 截图
![展示](https://github.com/user-attachments/assets/c763018e-c420-491f-92b4-e8b12149b7cd)

## 使用
### 体验
url: http://116.198.245.137:5569/
账号密码: `admin`/`admin`暂时没有权限功能，请不要修改密码，影响别人体验
### 直接使用
下载[最新release](https://github.com/xiaobaidadada/filecat/releases)
然后使用各个平台的可执行程序运行;
1. 执行命令`filecat --port 5567 --base_folder d:/ `  不设置username的话，账号密码默认是admin
2. 使用例子中的配置文件，执行命令`filecat --env ./env`；linux下也许需要执行`sudo chmod +x ./filecat-linux`获得执行权限
### linux下安装
对于Linux系统现在提供自动安装功能，推荐使用这种systemd方式运行;只需要下载最新版本的`filecat-liunx`可执行程序后，给与它chod可执行权限，然后运行 `./filecat-linux --install linux`;
### 开发
- 项目目前使用pkg打包，请使用node18.x.x，不打包也要使用node18,一些插件目前只支持node18；
- install 如果失败可能是由于网络问题，单独install一下对应的依赖包。
## 主要特性
-  文件管理
  1. 图片，视频，markdown 等文件格式在线预览。
  2. 代码编辑器，可选择文件打开方式。
  3. 图片编辑器，对图片右键可以进入[图片编辑器](https://github.com/scaleflex/filerobot-image-editor)模式。
  4. sutdio 编辑器，右键文件夹可以打开一个类似vscode的编辑器页面，可用于linux程序临时开发环境。
  5. 切换根目录，在设置中添加多个文件夹路径后，可以在右上角选择切换根目录，只对一个session生效。
  6. 终端，可以实时跟着目录走。
- ssh代理,ftp代理: 可以管理多个linux服务器，作用和winscp类似，让终端和文件管理更方便。
- 索引，是网址收藏夹，可用于保存服务器上其它的网站
- ddns
- http网页代理
- rdp代理(windwos远程控制)
- rtsp代理播放器，输入直播源，比如监控的url可以实时网页观看
- docker容器，镜像管理，查看日志等功能
- 系统内存cpu信息，进程cpu信息（利用c插件、使用极低的资源，实时查看系统全部进程信息，类似windows的任务管理器）,systemd管理(linux下才有)
- wol网络唤醒
- 虚拟网络，可以实现p2p,vpn功能。(不是端口转发，而是利用tun在主机上创建虚拟ip)
## 功能说明
1. 点对点客户端功能在macos下无法使用，在windows需要管理员模式下运行，linux需要root权限才可以使用该功能。此外还很多功能没有在macos下测试过，只支持windwos和Linux;
2. 部分功能目前处于demo阶段，未来会持续优化；
## 路线
1. 优化更多操作细节 
2. 支持更多的文件格式浏览
3. 支持更多的流媒体功能
4. 支持更多的ddns平台
5. 自动化爬虫
6. 路由权限
## 致谢
本项目部分功能还基于或者借鉴于以下项目
- [filebrowser](https://github.com/filebrowser/filebrowser)
- [MeshCentral](https://github.com/Ylianst/MeshCentral)
- [mstsc](https://github.com/citronneur/mstsc.js)
