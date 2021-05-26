
<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">Yujing Yang</h3>
      <h3 class="title">Tianqi Lan</h3>
      <h3 class="title">Hantong Xing</h3>
      <h3 class="title">Yahui Wen</h3>
      <h3 class="title">Zhiyi Qiao</h3>
      <button @click="goToHome()"> back </button>
    </el-form>

  </div>
<!--  <div class="app-container">-->
<!--    <h3 class="title">Yujing Yang</h3>-->
<!--    <h3 class="title">Tianqi Lan</h3>-->
<!--    <h3 class="title">Hantong Xing</h3>-->
<!--    <h3 class="title">Yahui Wen</h3>-->
<!--    <h3 class="title">Zhiyi Qiao</h3>-->
<!--    <button @click="goToHome()">enter </button>-->
<!--  </div>-->
</template>


<script>

export default {
  name: 'Login',
  methods: {
    goToHome(){
      this.$router.push('/dashboard');
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
.login-title{
  text-align:center;
  margin:0 auto 40px auto;
  color:#303133;
}

/* reset element-ui css */
.login-container {
  .h3 {
    display: inline-block;
    height: 47px;
    width: 85%;

  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url("~@/assets/background2.jpg");
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    width: 1400px;
    height: 500px;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  @keyframes slideIn {
    from {
      transform: translate3d(-1400px,0,0);
    }
    to {
      transform: translate3d(0,0,0);
    }
  }
  .SLIDE-enter {
    opacity: 0;
  }
  .SLIDE-enter-to {
    opacity: 1;
  }
  .SLIDE-enter-active {
    animation: slideIn 1s ease;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>


