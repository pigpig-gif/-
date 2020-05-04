//海平面
import {
  DataBus
} from './databus.js';
let databus = new DataBus();
export class Sealevel {
  constructor() {
    this.img = wx.createImage();
    this.img.src = "images/sealevel.png";
    this.w = 800;
    this.h = 27;

  }
  render() {
    //drawImage(要绘制)
    //画片寸宽度，图片尺寸高度
    databus.ctx.drawImage(this.img,0,databus.canvas.height-this.h,this.w,this.h)
  }
}