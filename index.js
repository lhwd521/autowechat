//功能：模拟鼠标键盘，进入固定群或联系人，群发微信或@所有人群发
//只针对windows系统，mac系统“复制到剪切板”这一步需要另外编程
//目前只支持文字消息
//使用微信截图时请直接保存为png格式，jpg格式不太清晰有时候找不到
//缺点：当屏幕变换时，找图片的时间较长，大概3秒
//发普通消息6s一个群，@所有人发消息10s一个群
//微信表情文字版举例：[呲牙][奸笑]
//v3
const {
  screen,
  imageResource,
  mouse,
  straightTo,
  centerOf,
  keyboard,
  Key,
  Button,
} = require("@nut-tree/nut-js");
require("@nut-tree/template-matcher");

const { exec } = require("child_process");
const iconv = require("iconv-lite");

//群发并@所有人（name=群名称或人名，jpg=搜索出来的图片，news=要发送的文字消息）
let qunfaAll = async function (name, jpg, news) {
  //图片路径
  screen.config.resourceDirectory = "./resouce/path";
  try {
    //找图片
    let region = await screen.waitFor(imageResource("sousuo.jpg"), 5000, 500);
    //鼠标速度
    mouse.config.mouseSpeed = 3000;
    //鼠标移动
    await mouse.move(straightTo(centerOf(region)));
    //鼠标左键单击
    await mouse.click(Button.LEFT);
    //复制中文到剪切板（win）
    exec("clip").stdin.end(iconv.encode(name, "gbk"));
    //键盘ctrl+v 复制
    await keyboard.pressKey(Key.LeftControl, Key.V);
    await keyboard.releaseKey(Key.LeftControl, Key.V);
    //找群图片
    let qun = await screen.waitFor(imageResource(jpg), 5000, 500);
    //鼠标移动
    await mouse.move(straightTo(centerOf(qun)));
    //鼠标左键单击
    await mouse.click(Button.LEFT);
    //键盘打@
    await keyboard.type("@");
    //找图片（所有人）
    let suoyou = await screen.waitFor(imageResource("suoyou.jpg"), 5000, 500);
    //移动鼠标到单击
    await mouse.move(straightTo(centerOf(suoyou)));
    await mouse.click(Button.LEFT);
    //复制中文到剪切板（win）
    exec("clip").stdin.end(iconv.encode(news, "gbk"));
    //键盘ctrl+v 复制，按下并放开
    await keyboard.pressKey(Key.LeftControl, Key.V);
    await keyboard.releaseKey(Key.LeftControl, Key.V);
    //回车
    await keyboard.type(Key.Enter);
  } catch (e) {
    console.error(e);
    //找微信聊天图片
    let wrong = await screen.waitFor(imageResource("wrong.png"), 3000, 500);
    //鼠标移动
    await mouse.move(straightTo(centerOf(wrong)));
    //鼠标左键单击
    await mouse.click(Button.LEFT);
    console.log("未成功：" + name);
  }
};

//普通发送消息（name=群名称或人名，jpg=搜索出来的图片，news=要发送的文字消息）
let qunfa = async function (name, jpg, news) {
  //图片路径
  screen.config.resourceDirectory = "./resouce/path";
  try {
    //找图片
    let region = await screen.waitFor(imageResource("sousuo.jpg"), 5000, 500);
    //鼠标速度
    mouse.config.mouseSpeed = 3000;
    //鼠标移动
    await mouse.move(straightTo(centerOf(region)));
    //鼠标左键单击
    await mouse.click(Button.LEFT);
    //复制中文到剪切板
    exec("clip").stdin.end(iconv.encode(name, "gbk"));
    //键盘ctrl+v 复制
    await keyboard.pressKey(Key.LeftControl, Key.V);
    await keyboard.releaseKey(Key.LeftControl, Key.V);
    //找群图片
    let qun = await screen.waitFor(imageResource(jpg), 5000, 500);
    //鼠标移动
    await mouse.move(straightTo(centerOf(qun)));
    //鼠标左键单击
    await mouse.click(Button.LEFT);
    //复制中文到剪切板
    exec("clip").stdin.end(iconv.encode(news, "gbk"));
    //键盘ctrl+v 复制，按下并放开
    await keyboard.pressKey(Key.LeftControl, Key.V);
    await keyboard.releaseKey(Key.LeftControl, Key.V);
    //回车
    await keyboard.type(Key.Enter);
  } catch (e) {
    console.error(e);
    //找微信聊天图片
    let wrong = await screen.waitFor(imageResource("wrong.png"), 3000, 500);
    //鼠标移动
    await mouse.move(straightTo(centerOf(wrong)));
    //鼠标左键单击
    await mouse.click(Button.LEFT);
    console.log("未成功：" + name);
  }
};

//群发的文字内容
let txt = "git和github的保姆级教程b站过审啦，大家快去练习，提交一次pr实践";
//主程序（name=群名称或人名，jpg=搜索出来的图片，news=要发送的文字消息）
(async () => {
  try {
    await qunfaAll("元岛2班", "1.jpg", txt);
    await qunfaAll("元岛4班", "2.jpg", txt);
    await qunfaAll("元岛5班", "3.jpg", txt);
    await qunfaAll("元岛的小伙伴们1", "4.jpg", txt);
    await qunfaAll("元岛的小伙伴们3", "5.jpg", txt);
    await qunfaAll("元岛的小伙伴们4", "6.jpg", txt);
    // await qunfa("元岛的学习委员", "8.png", txt);
  } catch (e) {
    console.error(e);
  }
})();
