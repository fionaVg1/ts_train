// import './popup.css' //全局CSS操作
// let styles = require('./popup.css');
import styles from './popup.css';
interface Ipopup {
  width?: string;
  height?: string;
  title?: string;
  pos?: string;
  mask?: boolean;
  content?: () => void;
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
    this.template();
  }
  template() {
    this.tempContainer = document.createElement('div');
    this.tempContainer.innerHTML = `
      <div class="">
        <h3>${this.options.title}</h3>
        <i class="iconfont icon-guanbi"></i>
      </div>
    `;
    document.body.appendChild(this.tempContainer);
  }
  handle() {

  }
}
export default popup;