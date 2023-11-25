import axios from 'axios';

// 取 DON
const form = document.querySelector('form');
const submitBtn = document.querySelector('#submit');
const areaFilter = document.querySelector('#areaFilter');

const viewData = [];
const newPackage = {
  id: null,
  name: '',
  imgUrl: '',
  area: '',
  description: '',
  group: null,
  price: null,
  rate: null,
};

// 渲染方法
function render(nowArea = '全部地區') {
  let cardsHtml = '';
  let renderData = [];
  // 新增地區判斷
  if (nowArea !== '全部地區') {
    renderData = viewData.filter((e) => e.area === nowArea);
  } else {
    renderData = viewData;
  }
  renderData.forEach((e) => {
    const template = `
        <div class="col-md-6 col-xl-4">
          <div class="card shadow border-gray-300 h-100"">
            <div class="position-relative">
              <img
                src="${e.imgUrl}"
                class="card-img-top img-fluid"
                alt="套票預覽${e.id}"
                style="height: 180px"
              />
              <span
                class="badge position-absolute translate-middle-y start-0 bg-info fs-5 py-2"
                style="top: 5%"
              >
                ${e.area}
              </span>
              <span
                class="badge position-absolute translate-middle-y start-0 top-100 bg-primary lh-base px-2"
                style="width: 40px"
              >
                ${e.rate}
              </span>
            </div>
            <div class="card-body pb-2">
              <h3 class="card-title fs-4 border-bottom border-2 pb-1">
                ${e.name}
              </h3>
              <p class="card-text lh-lg">
                ${e.description}
              </p>
            </div>
            <div
              class="card-footer border-0 text-primary d-flex justify-content-between align-items-center"
            >
              <small class="d-flex align-items-center fs-6 fw-medium"
                ><span
                  class="material-symbols-outlined fs-5 me-1"
                  style="font-variation-settings: 'FILL' 1"
                >
                  error </span
                >剩下最後 ${e.group} 組</small
              >
              <p class="mb-0 fw-medium d-flex align-items-center">
                TWD<span class="fs-2 ms-1">$${e.price}</span>
              </p>
            </div>
          </div>
        </div>`;
    cardsHtml += template;
  });
  document.querySelector('.card-list').innerHTML = cardsHtml;
  // 渲染篩選筆數
  const filterNum = document.querySelector('#filterNum');
  filterNum.textContent = `本次搜尋共 ${renderData.length} 筆資料`;
}
// 取得 API 資料
function getData() {
  axios
    .get(
      'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json'
    )
    .then((res) => {
      viewData.push(...res.data.data);
      // 渲染畫面
      render();
    })
    .catch((err) => {
      console.log(err.response);
    });
}
// 監聽按鈕
submitBtn.addEventListener('click', () => {
  window.event.preventDefault();
  form.querySelectorAll('input, select, textarea').forEach((e) => {
    newPackage[e.name] = e.value;
  });
  newPackage.id = viewData.length;
  viewData.push({ ...newPackage });
  render(areaFilter.value); // 新增後保留下拉選單篩選
  form.reset(); // 清空表單
});
// 監聽下拉選單
areaFilter.addEventListener('change', (e) => {
  render(e.target.value);
});
getData();
