//分数
import {
  DataBus
} from './databus.js';
let databus = new DataBus();

export class Score{
  constructor(){
     this.text = "COUNT:0";
  }
  render(){
    //drawImage()方法在画不上绘制图像，画布或视频
    databus.ctx.font="30px 华文彩云"
    databus.ctx.strokeStyle ="#fff"
    databus.ctx.strokeText(this.text,10,100)
  }
}