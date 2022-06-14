# autowechat

node.js 编写的微信群发小程序，模拟鼠标和键盘的操作

## 配置环境

nut.js 库
https://github.com/nut-tree/nut.js

iconv-lite 库
npm install iconv-lite

## 使用步骤

打开 index.js

txt 中输入想群发的文字内容

qunfaAll("输入群名称", "搜索群名称后显示出的图片截图", txt)

图片截图存放的位置：/resouce/path

示例：qunfaAll("元岛 2 班", "1.jpg", txt)

qunfaAll：群发并@所有人

qunfa：发送普通消息
