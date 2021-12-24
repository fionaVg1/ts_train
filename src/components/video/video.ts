import styles from './video.css';

interface IVideo {
  url: string;
  elem: string | HTMLElement;
  width?: string;
  height?: string;
  autoplay?: boolean;
}
interface Icomponent {
  tempContainer: HTMLElement;
  init: () => void;
  template: () => void;
  handle: () => void;
}
function video(options: IVideo) {
  return new Video(options);
}
class Video implements Icomponent {
  tempContainer;
  constructor(private options: IVideo) {
    this.options = Object.assign({
      width: '100%',
      height: '100%',
      autoplay: true,
    }, options);
    this.init();

  }
  init() {
    this.template();
    this.handle();
  }
  template() {
    this.tempContainer = document.createElement('div');
    this.tempContainer.className = styles.video;
    this.tempContainer.style.width = this.options.width;
    this.tempContainer.style.height = this.options.height;
    this.tempContainer.innerHTML = `
    <video class="${styles['video-content']}" src = "${this.options.url}"></video>
    <div class="${styles['video-controls']}">
      <div class="${styles['video-progress']}">
        <div class="${styles['video-progress-suc']}"></div>
        <div class="${styles['video-progress-now']}"></div>
        <div class="${styles['video-progress-ball']}"></div>
      </div>
      <div class="${styles['video-play']}">
        <i class="iconfont icon-bofang"></i>
      </div>
      <div class="${styles['video-time']}">
        <span>00:00</span>/<span>00:00</span>
      </div>
      <div class="${styles['video-full']}">
        <i class="iconfont icon-quanping_o"></i>
      </div>
       <div class="${styles['video-volume']}">
        <i class="iconfont icon-24gl-volumeHigh"></i>
        <div class="${styles['video-volprogress']}">
          <div class="${styles['video-volprogress-now']}"></div>
          <div class="${styles['video-volprogress-ball']}"></div>
        </div>
      </div>
    </div>
    `;
    if (typeof this.options.elem === 'object') {
      this.options.elem.appendChild(this.tempContainer);
    } else {
      document.querySelector(`${this.options.elem}`).appendChild(this.tempContainer);
    }
  }
  handle() {
    let _self = this;
    let videoContent: HTMLVideoElement = this.tempContainer.querySelector(`.${styles['video-content']}`);
    let videoControls = this.tempContainer.querySelector(`.${styles['video-controls']}`);
    let videoPlay = this.tempContainer.querySelector(`.${styles['video-controls']} i`);
    let videoTimes = this.tempContainer.querySelectorAll(`.${styles['video-time']} span`);
    let videoFull = this.tempContainer.querySelector(`.${styles['video-full']} i`);
    let videoProgress = this.tempContainer.querySelectorAll(`.${styles['video-progress']} div`);
    let videoVolProgress = this.tempContainer.querySelectorAll(`.${styles['video-volprogress']} div`);
    let timer;
    videoContent.volume = 0.5;
    if (this.options.autoplay) {
      videoContent.play();
    }

    //mouseenter和mouseover的区别，前者不会让子元素有冒泡的行为
    this.tempContainer.addEventListener('mouseenter', function () {
      videoControls.style.bottom = 0;
    });
    this.tempContainer.addEventListener('mouseleave', function () {
      videoControls.style.bottom = '-50px';
    });
    videoContent.addEventListener('canplay', () => {
      console.log('canplay')
      videoTimes[1].innerHTML = this.formateTime(videoContent.duration);
    });
    videoContent.addEventListener('play', () => {
      videoPlay.className = 'iconfont icon-zanting';
      timer = setInterval(playing, 1000);
    });
    videoContent.addEventListener('pause', () => {
      videoPlay.className = 'iconfont icon-bofang';
      clearInterval(timer);
    });
    videoPlay.addEventListener('click', () => {
      if (videoContent.paused) {
        videoContent.play();
      } else {
        videoContent.pause();
      }
    });
    videoFull.addEventListener('click', () => {
      videoContent.requestFullscreen();
    });
    videoProgress[2].addEventListener('mousedown', function (ev: MouseEvent) {
      let downX = ev.pageX;
      let downL = this.offsetLeft;
      document.onmousemove = (ev: MouseEvent) => {
        let scale = (ev.pageX - downX + downL + 8) / this.parentNode.offsetWidth;
        if (scale < 0) {
          scale = 0;
        } else if (scale > 1) {
          scale = 1;
        }
        videoProgress[0].style.width = scale * 100 + '%';
        videoProgress[1].style.width = scale * 100 + '%';
        this.style.left = scale * 100 + '%';
        videoContent.currentTime = scale * videoContent.duration;
      };
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      };
      ev.preventDefault();
    });
    videoVolProgress[1].addEventListener('mousedown', function (ev: MouseEvent) {
      let downX = ev.pageX;
      let downL = this.offsetLeft;
      document.onmousemove = (ev: MouseEvent) => {
        let scale = (ev.pageX - downX + downL + 8) / this.parentNode.offsetWidth;
        if (scale < 0) {
          scale = 0;
        } else if (scale > 1) {
          scale = 1;
        }
        videoVolProgress[0].style.width = scale * 100 + '%';
        this.style.left = scale * 100 + '%';
        videoContent.volume = scale;
      };
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null;
      };
      ev.preventDefault();
    });
    function playing() {
      let scale = videoContent.currentTime / videoContent.duration;
      let scaleSuc = videoContent.buffered.end(0) / videoContent.duration;
      videoTimes[0].innerHTML = _self.formateTime(videoContent.currentTime);
      videoProgress[0].style.width = scaleSuc * 100 + '%';
      videoProgress[1].style.width = scale * 100 + '%';
      videoProgress[2].style.left = scale * 100 + '%';
    }
  }
  formateTime(number: number): string {
    number = Math.round(number);
    let min = Math.floor(number / 60);
    let hour = Math.floor(min / 24);
    let _min = min % 24;
    let sec = number % 60;
    return this.setZero(hour) + ':' + this.setZero(_min) + ':' + this.setZero(sec);
  }
  setZero(number: number): string {
    if (number < 10) {
      return '0' + number;
    }
    return '' + number;
  }

}
export default video;