//障碍物
import {DataBus} from './databus.js';
let databus =new DataBus();
export class Obstacle{
  //top src:图片地址 type：up |down
  constructor(top,src,imgtype){
    this.x =databus.canvas.width;
    this.y=0;
    this.w=86;
    this.h=406;
    this.img=wx.createImage();
    this.img.src=src;
    this.top=top;
    this.imgtype = imgtype;
    this.spped =2;
  }
  render() {
   if(this.imgtype=="up"){
     this.y=this.top -this.h; //随机距离减去自身高度
   }
   else{
     let height =databus.canvas.height/5;
     this.y=this.top+height;
   }
   this.x=this.x-this.spped;
   databus.ctx.drawImage(this.img,0,0,this.w,this.h,this.x,this.y,this.w,this.h);
  }
}