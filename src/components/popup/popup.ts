// import './popup.css' //全局CSS操作
// let styles = require('./popup.css');
import styles from './popup.css';
interface Ipopup {
  width?: string;
  height?: string;
  title?: string;
  pos?: string;
  mask?: boolean;
  content?: (content: HTMLElement) => void;
}
interface Icomponent {
  tempContainer: HTMLElement;
  init: () => void;
  template: () => void;
  handle: () => void;
}
function popup(options: Ipopup) {
  return new Popup(options);
}
class Popup implements Icomponent {
  tempContainer;
  mask;
  constructor(private options: Ipopup) {
    this.options = Object.assign({
      width: '100%',
      height: '100%',
      title: '',
      pos: 'center',
      mask: true,
      content: function () { }
    }, this.options);
    this.init();
  }
  init() {
    this.options.mask && this.createMask();
    this.template();
    this.handle();
    this.contentCallback();
  }
  template() {
    this.tempContainer = document.createElement('div');
    this.tempContainer.style.width = this.options.width;
    this.tempContainer.style.height = this.options.height;
    this.tempContainer.className = styles.popup;
    this.tempContainer.innerHTML = `
      <div class="${styles['popup-title']}">
        <h3>${this.options.title}</h3>
        <i class="iconfont icon-guanbi"></i>
      </div>
      <div class="${styles['popup-content']}"></div>
    `;
    document.body.appendChild(this.tempContainer);
    if (this.options.pos === 'left') {
      this.tempContainer.style.left = 0;
      this.tempContainer.style.top = (window.innerHeight - this.tempContainer.offsetHeight) + 'px';
    } else if (this.options.pos === 'right') {
      this.tempContainer.style.right = 0;
      this.tempContainer.style.top = (window.innerHeight - this.tempContainer.offsetHeight) + 'px';
    } else {
      this.tempContainer.style.left = (window.innerWidth - this.tempContainer.offsetWidth) / 2 + 'px';
      this.tempContainer.style.top = (window.innerHeight - this.tempContainer.offsetHeight) / 2 + 'px';
    }
  }
  createMask() {
    this.mask = document.createElement('div');
    this.mask.className = styles.mask;
    this.mask.style.width = '100%';
    this.mask.style.height = document.body.offsetHeight + 'px';
    document.body.appendChild(this.mask);
  }
  handle() {
    let popupClose = this.tempContainer.querySelector(`.${styles['popup-title']} i`);
    popupClose.addEventListener('click', () => {
      document.body.removeChild(this.tempContainer);
      this.options.mask && document.body.removeChild(this.mask);
    })
  }
  contentCallback() {
    let popupContent = this.tempContainer.querySelector(`.${styles['popup-content']}`);
    this.options.content(popupContent);
  }
}
export default popup;