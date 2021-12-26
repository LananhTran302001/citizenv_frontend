# citizenv

## Project setup
install nodejs
```
npm install
npm install -g @vue/cli
npm install vue-router
npm install bootstrap-vue
npm install axios
npm install vuex --save
npm install vue-chartjs chart.js --save
npm i chart.js
npm i file-saver
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Cấu trúc 
```
src
 |
 |____ views: Những trang chính mà frontend có
 |____ components: Những thành phần sử dụng trong views (vd: 1 nút, 1 form) để tái sử dụng và thuận tiện trong việc sửa chữa
 |____ routes: (file index.js) các đường dẫn đến các trang trong views
 |____ store
         |_____ module: lưu global state, hàm thực hiện request đến server dùng axios, fetch
         |_____ statics: chứa các giá trị tĩnh như: api url, format json, những quay tắc validate
 ```
 
 ### Ưu điểm
 ```
+ Sử dụng vue-router: viết lại url, sử dụng router-view để routing giữa các trang mà không tải lại toàn bộ cây DOM , kiểm tra các điều kiện trước khi điều hướng
+ Sử dụng axios và fetch
+ các giá trị tĩnh được lưu trong src/store/statics, nếu có sự thay đổi từ BE thì có thể dễ dàng điều chỉnh
