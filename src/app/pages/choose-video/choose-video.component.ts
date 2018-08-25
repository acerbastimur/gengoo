import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-choose-video',
  templateUrl: './choose-video.component.html',
  styleUrls: ['./choose-video.component.scss']
})
export class ChooseVideoComponent implements OnInit {
   video = {
    subtitlePath : '',
    videoPath: ''
  }

  constructor( private router: Router) {
    
   }

  ngOnInit() {

    /////////////////////// Prevent Default //////////////////// 
    document.addEventListener('dragover',function(event){
      event.preventDefault();
      return false;
    },false);
  
    document.addEventListener('drop',function(event){
      event.preventDefault();
      return false;
    },false);
    /////////////////////////////////////////////////////////////
    
  ////////////////////// Video Area//////////////////////////////
      var holder = document.getElementById('video-area');

      holder.ondragover = () => {
          return false;
      };

      holder.ondragleave = () => {
          return false;
      };

      holder.ondragend = () => {
          return false;
      };

      holder.ondrop = (e) => {
          e.preventDefault();

          let path = e.dataTransfer.files[0].path;
          this.video.videoPath = path;
          return false;
      };
  /////////////////////////////////////////////////////////
  ///////////////Subtitle Area ////////////////////////////
  var holder = document.getElementById('subtitle-area');

  holder.ondragover = () => {
      return false;
  };

  holder.ondragleave = () => {
      return false;
  };

  holder.ondragend = () => {
      return false;
  };

  holder.ondrop = (e) => {
      e.preventDefault();

      let path = e.dataTransfer.files[0].path;
      this.video.subtitlePath = path;
      return false;
  };
/////////////////////////////////////////////////////////
  }

  ///////////////////// Check Subtitle ////////////////////
  checkSubtitle(){
    try {
      this.video.subtitlePath = document.querySelectorAll('input')[1].files[0].path; // try get the path of video from input
    }
      catch(err) {        
        return 0
      }
  }
  //////////////////////////////////////////////////////

  ///////////////////// Check Video ////////////////////
  checkVideo(){
    try {
      this.video.videoPath = document.querySelectorAll('input')[0].files[0].path; // try get the path of video from input
    }
      catch(err) {        
        return 0
      }
  }
  //////////////////////////////////////////////////////
    
  //////////////////////////////// Send Path ///////////////////////////////// 
  sendPath(videoPath , subtitlePath){
    if(videoPath != '' && subtitlePath != ''){
      this.router.navigate(['/player', videoPath + "+" + subtitlePath])
    }
    else if(videoPath == ''){
      console.log('video path girilmedi')
    }
    else if(subtitlePath == ''){
      console.log('subtitle path girilmedi')
    }
  }
  ////////////////////////////////////////////////////////////////////////////


  //submit
  submit(){
     //////////////////////// Path settings ///////////////////////
     this.checkVideo();
     this.checkSubtitle();
     this.sendPath(this.video.videoPath,this.video.subtitlePath);
    //////////////////////////////////////////////////////////////
  }
}
