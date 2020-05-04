//音乐
export class Music{
  constructor(){

    this.bgmAudio = wx.createInnerAudioContext();
    this.bgmAudio.loop =true; //循环播放
    // this.bgmAudio.src = "audios/bgm.mp3";
  }
  //调用方法playBgm
  playBgm(){
    this.bgmAudio.play();
  }
}