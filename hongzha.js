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

//不停发消息
let hongzha = async function (txt) {
  try {
    //复制中文到剪切板（win）
    exec("clip").stdin.end(iconv.encode(txt, "gbk"));
    //键盘ctrl+v 复制
    await keyboard.pressKey(Key.LeftControl, Key.V);
    await keyboard.releaseKey(Key.LeftControl, Key.V);
    //回车
    await keyboard.type(Key.Enter);
  } catch (e) {
    console.error(e);
  }
};

//文字内容
let txt = "多喝热水";
//次数
let num = 15;
//主程序
(async () => {
  try {
    //通过按键切换至微信
    await keyboard.pressKey(Key.LeftControl, Key.LeftAlt, Key.W);
    await keyboard.releaseKey(Key.LeftControl, Key.LeftAlt, Key.W);
    for (let index = 0; index < num; index++) {
      await hongzha(txt);
    }
  } catch (e) {
    console.error(e);
  }
})();
