import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
/* const srt2vtt = require('srt-to-vtt')
const fs = require('fs') */


@Component({
  selector: 'app-choose-video',
  templateUrl: './choose-video.component.html',
  styleUrls: ['./choose-video.component.scss']
})
export class ChooseVideoComponent implements OnInit {
  video = {
    subtitlePath: '',
    videoPath: ''
  }

  constructor(private router: Router) {

  }

  ngOnInit() {

    /////////////////////// Prevent Default //////////////////// 
    document.addEventListener('dragover', function (event) {
      event.preventDefault();
      return false;
    }, false);

    document.addEventListener('drop', function (event) {
      event.preventDefault();
      return false;
    }, false);
    /////////////////////////////////////////////////////////////

  }


  submit() {
    //////////////////////// Path settings ///////////////////////
    try {
      this.video.videoPath = document.querySelectorAll('input')[0].files[0].path; // Set subtitle path
      this.video.subtitlePath = document.querySelectorAll('input')[1].files[0].path; // Set video path


   /*    fs.createReadStream(this.video.subtitlePath) // Convert chosen srt to vtt
        .pipe(srt2vtt())
        .pipe(fs.createWriteStream(this.video.subtitlePath.replace('srt', 'vtt')));
 */
        setTimeout(() => {
                this.router.navigate(['/player', this.video.videoPath + '+' + this.video.subtitlePath.replace('srt', 'vtt')]);

        }, 1500);

    } catch (err) {
      console.log('video veya altyazı secilmedi');

    }
    //////////////////////////////////////////////////////////////
  }





}
