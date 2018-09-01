import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
const srt2vtt = require('srt-to-vtt');
const fs = require('fs');

import * as $ from 'jquery';


@Component({
  selector: 'app-choose-video',
  templateUrl: './choose-video.component.html',
  styleUrls: ['./choose-video.component.scss']
})
export class ChooseVideoComponent implements OnInit {
  video = {
    videoName: '',
    subtitlePath: '',
    subtitleName: '',
    videoPath: ''
  };

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

    document.addEventListener('ondragleave', function (event) {
      event.preventDefault();
      return false;
    }, false);
    /////////////////////////////////////////////////////////////

    ////////////////////// Video Area//////////////////////////////
    const videoArea = document.getElementById('video-area');
    videoArea.ondragover = () => {
      return false;
    };

    videoArea.ondragleave = () => {
      return false;
    };

    videoArea.ondragend = () => {
      return false;
    };

    videoArea.ondrop = (e) => {
      e.preventDefault();
      const path = e.dataTransfer.files[0].path;
      this.video.videoPath = path;
      this.video.videoName = e.dataTransfer.files[0].name;
      document.getElementById('video-area').innerHTML = this.video.videoName;
      this.popup(); // if got video succesfully, continue with subtitle part
      return false;
    };
    /////////////// Subtitle Area ////////////////////////////
    const subtitleArea = document.getElementById('subtitle-area');

    subtitleArea.ondragover = () => {
      return false;
    };

    subtitleArea.ondragleave = () => {
      return false;
    };

    subtitleArea.ondragend = () => {
      return false;
    };

    subtitleArea.ondrop = (e) => {
      e.preventDefault();
      const path = e.dataTransfer.files[0].path;
      this.video.subtitlePath = path;
      this.video.subtitleName = e.dataTransfer.files[0].name;
      document.getElementById('subtitle-area').innerHTML = this.video.subtitleName;
      this.submit();
      return false;
    };
    /////////////////////////////////////////////////////////
  }

  popup() {

    if ($('.popText').css('display') === 'none') {
      $('.popText').css({ 'display': 'block' }); console.log($('.popText').css('display'));
      $('.body').css({ '-webkit-filter': 'grayscale(100%)', 'filter': 'grayscale(100%)' });
    }
    $('html').click(function (e) {
      if (e.target.id !== 'popup') {
        console.log('OUT OF DIV');
        $('.popText').css({ 'display': 'none' }); console.log($('.popText').css('display'));
        $('.body').css({ '-webkit-filter': 'grayscale(100%)', 'filter': 'grayscale(100%)' });
        $('.body').css({ '-webkit-filter': 'grayscale(0%)', 'filter': 'grayscale(0%)' });
      }
    });
  }
  ///////////////////// Check Subtitle ////////////////////
  checkSubtitle() {
    try {
      this.video.subtitlePath = document.querySelectorAll('input')[1].files[0].path; // try get the path of subtitle from input
      this.video.subtitleName = document.querySelectorAll('input')[1].files[0].name;
    } catch (err) {
      return 0;
    }
  }
  //////////////////////////////////////////////////////

  ///////////////////// Check Video ////////////////////
  checkVideo() {
    try {
      this.video.videoPath = document.querySelectorAll('input')[0].files[0].path; // try get the path of video from input
      this.video.subtitleName = document.querySelectorAll('input')[0].files[0].name;
    } catch (err) {
      return err;
    }
  }
  //////////////////////////////////////////////////////

  //////////////////////////////// Send Path /////////////////////////////////
  sendPath(videoPath, subtitlePath) {
    if (videoPath !== '' && subtitlePath !== '') {
      this.router.navigate(['/player', videoPath + '+' + subtitlePath]);
    } else if (videoPath === '') {
      console.log('video path girilmedi');
    } else if (subtitlePath === '') {
      console.log('subtitle path girilmedi');
    }
  }
  ////////////////////////////////////////////////////////////////////////////


  // submit
  submit() {
    //////////////////////// Path settings ///////////////////////
    const subtitlePath = this.video.subtitlePath;

    this.checkVideo();
    this.checkSubtitle();
    const newSubtitlePath = subtitlePath.split('.srt')[0] + '.vtt';
    this.convertSubtitle(subtitlePath, newSubtitlePath);
    //////////////////////////////////////////////////////////////
  }

  convertSubtitle(srtPath, vttPath) {
    fs.createReadStream(srtPath)
      .pipe(srt2vtt())
      .pipe(fs.createWriteStream(vttPath));
    setTimeout(() => {
      this.convertSubtitle(srtPath, vttPath);
      this.sendPath(this.video.videoPath, vttPath);
    }, 3500);
  }

}
