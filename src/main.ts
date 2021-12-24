import './iconfont/iconfont.css';
import './main.css'
import popup from './components/popup/popup';
import video from './components/video/video';
let str: string = 'test';
console.log(str)
let listItem = document.querySelectorAll('#list li');
for (let i = 0; i < listItem.length; i++) {
  listItem[i].addEventListener('click', function () {
    let url = this.dataset.url;
    let title = this.dataset.title;
    console.log(url);
    console.log(title)
    popup({
      width: '880px',
      height: '556px',
      title: title,
      content: (content: HTMLElement) => {
        video({
          url: url,
          elem: content
        });
      }
    });
  })
}