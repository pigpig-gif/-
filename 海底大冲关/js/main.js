import {DataBus} from './databus.js';
import {Seabed} from './seabed.js';
import {Sealevel} from './sealevel.js';
import {Button} from './button.js';
import { Fish} from './fish.js';
import {Score} from './Score.js';
import { Music} from './music.js';
import {Obstacle} from './obstacle.js';
let databus = new DataBus();
export class Main {
  constructor() {
    this.canvas = wx.createCanvas();
    this.ctx = this.canvas.getContext('2d');
    databus.canvas = this.canvas;
    databus.ctx = this.ctx;
    //页面初始化init
    this.init()
    //注册事件
    this.registerEvent();
  }
  init() {
    this.bg = new Seabed();
    this.level = new Sealevel();
    this.btn = new Button();
    this.fish = new Fish();
    this.Score = new Score();
    this.Music = new Music();
    //创建障碍物
    this.createObstacle();
    this.startGame();
  }
  //检查是否碰撞。。。(碰到渔网，碰到四周)
  check() {
    //鱼的边框模型，模拟鱼的时时位置
    const fishBorder = {
      top: this.fish.y,
      bootom: this.fish.y + this.fish.h,
      left: this.fish.x,
      right: this.fish.x + this.fish.w
    };
    //循环遍历所有的障碍物
    for (let i = 0; i < databus.obstaclelist.length; i++) {
      //创建障碍物边框模型
      const obstacle = databus.obstaclelist[i];
      const obstacleBorder = {
        top: obstacle.y,
        bootom: obstacle.y + obstacle.h,
        left: obstacle.x,
        right: obstacle.x + obstacle.w
      };
      if (this.isCheck(fishBorder, obstacleBorder)) {
        console.log('抓到鱼');
        databus.gameove = true;
        return;
      }
    }
    //海平面抨击判断
    if (this.fish.newy + this.fish.h > databus.canvas.height - this.level.h) {
      console.log('碰击地板啦');
      databus.gameove = true; //设置游戏状态，停止游戏
      return;
    }
    //加分逻辑
    if (this.fish.x > databus.obstaclelist[0].x + databus.obstaclelist[0].img.width && this.Score.isScore) {
      wx.vibrateShort({
        success: function () {
          console.log('振动成功');
        }
      });
      this.Score.isScore = false;
      this.Score.scoreNumber++;
    }
  }
  //检验是否有碰撞
  isCheck(fish, obstacle) {
    let s = false; //未碰撞状态
    console.log(fish)
    if (fish.top > obstacle.bottom ||
      fish.bootom < obstacle.top ||
      fish.right > obstacle.left ||
      fish.left > obstacle.right
    ) {
      s = true;
    }
    return !s;

  }
  startGame() {
    this.check()
    if (!databus.gameover) {
      this.bg.render(); //渲染
      this.level.render();
      this.btn.render();
      this.fish.render();
      this.Score.render();
      this.Music.playBgm()

      //清除障碍物  当第一组障碍物消失屏幕时，清除第一组。
      if (databus.obstaclelist[0].x + databus.obstaclelist[0].img.width <= 0 && databus.obstaclelist.length == 4) {
        databus.obstaclelist.shift();
        databus.obstaclelist.shift();
        this.score.isScore=true
      }
      //当障碍物已经到了屏中间左侧，并且当前页面只有两个障碍物时，额外再增加两个
      if (databus.obstaclelist[0].x <= (databus.canvas.width - databus.obstaclelist[0].img.width) / 2 && databus.obstaclelist.length == 2) {
        this.createObstacle();
      }
      //渲染障碍物
      databus.obstaclelist.forEach(value => {
        value.render();
      })
      let timer = requestAnimationFrame(() => {
        this.startGame();
      });
      databus.timer = timer;
    } else {
      //游戏结束
      databus.reset();
      this.btn.render();
      cancelAnimationFrame(databus.timer);
      wx.triggerGC();
    }
    
  }
  //创建障碍物
  createObstacle() {
    let minTop = databus.canvas.height / 8; //最高屏幕
    let maxTop = databus.canvas.height / 2; //最低高度
    //计算随机数
    let top = minTop + Math.random() * (maxTop - minTop);
    databus.obstaclelist.push(new Obstacle(top, 'images/pi_up.png', "up"))
    databus.obstaclelist.push(new Obstacle(top, 'images/pi_down.png', "down"))
  }
  //触碰方法
  registerEvent() {
    wx.onTouchStart(() => {
      console.log(this)
      if (databus.gameove) {
        console.log('游戏开始');
        databus.gameove = false;
        this.init();
      } else {
        //让鱼跳
        console.log(this.fish.y)
        console.log(this.fish.newy)
        this.fish.y = this.fish.newy;
        //时间清零
        this.fish.time = 0;
      }
    })
  }
}