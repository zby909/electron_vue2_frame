import Vue from 'vue';

const loadingDom = `<div id="loader-wrapper">
        <div id="loader"></div>
        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
        <div class="load_title">
          正在加载 , 请耐心等待
          <br />
          <span>xxxxxx系统</span>
        </div>
      </div>`;

Vue.directive('kkb_loading', {
  inserted(el, { value }) {
    if (value) {
      el.insertAdjacentHTML('beforeEnd', loadingDom);
    }
  },
  update(el, { value, oldValue }) {
    if (value === oldValue) return;
    if (value) {
      el.insertAdjacentHTML('beforeEnd', loadingDom);
    } else {
      document.getElementById('loader-wrapper').remove();
    }
  },
});
