# ccc-group

Team 67

Team Member:

Tianqi Lan		(1164121)

Yahui Wen		  (1044061)

Hantong Xing	(1164099)

Yujing Yang		(979613)

Zhiyi Qiao		(1156080)

# Frontend Setup
Vue.js is an open source JavaScript framework, which can be used in building user interfaces or single-page applications. We used Vue.js framework to implement a front end website. We adopt the famous vue template — vue-admin-template to construct the basis layout. Also we found that Apache ECharts is a powerful and free visualization library which allows users to create interactive and customizable charts. We can easily install the echarts library with the node package manager (NPM). Then, echarts could render different types of diagrams including bar, pie, map, radar and even word cloud charts. 

vue, element-ui, echarts

Frontend (http://http://172.26.131.13:8080/)
## enter the project directory
cd frontend
## install dependency
npm install

## run
npm run serve
This will automatically open http://localhost:8080

# Backend 

Koa2 and web socket

## Backend Setup
### clone the project
git clone https://github.com/YahuiWen/ccc-group

### enter the project directory
cd backend
### install dependency
npm install

### run
node app.js


# Build
## run build to genertate frontend dist file for docker
npm run build

