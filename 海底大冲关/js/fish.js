//鱼
import {
  DataBus
} from './databus.js';
let databus = new DataBus();

export class  Fish{
  constructor() {
    console.log(databus.canvas.height)
    this.img = wx.createImage();
    this.img.src = 'images/fish1.png';
    this.x=0;
    this.y=databus.canvas.height/2;
    this.w = 40;
    this.h = 30;
    this.time = 0;//下落时间
    this.newy = databus.canvas.height/2
  }
  render() {
    //drawImage(要绘制) 
    //画片寸宽度，图片尺寸高度
    // databus.ctx.drawImage(this.img,200,(databus.canvas.height-this.h-27),this.w,this.h,) //下面的鱼
    let g = 0.98/2.9 //重力加速度
    let offsetUp = 30
    let offsetY = (g*this.time*(this.time-offsetUp))/2
    this.newy = this.y+offsetY
    this.time++
    databus.ctx.drawImage(this.img,0,0,this.w,this.h,this.x,this.newy,this.w,this.h)  //上面的鱼
  }
}