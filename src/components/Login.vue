<template>
  <div class="login_container">
  <div class="login_box">
    <div class="avatar_box">
      <img src="../assets/logo.jpg" alt="">
    </div>
    <Form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" inline class="login_form">
        <FormItem prop="username">
            <Input type="text" v-model="loginForm.username" placeholder="用户名" style="width:280px">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="loginForm.password" placeholder="密码" style="width:280px">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem class="btns">
            <Button type="primary" @click="login">登录</Button>
            <Button @click="ResetLoginForm" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入您的用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码不得少于6个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if(!valid) {
          return
        }
        const { data: res } = await this.$http.post('login', this.loginForm)
        if(res.meta.status !== 200) {
          // return console.log('登陆失败')
          return this.$Message.error('登陆失败')
        }
        // console.log('登录成功')
        this.$Message.success('登录成功')
        // 1.将登录成功之后的token，保存到客户端的sessionStorage中
        //  1.1 项目除了登录之外的其他API接口，必须在登录之后才能访问
        //  1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        // 2.通过编程式导航跳转到后台主页，路由地址为 /home
        // console.log(res)
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
    // 点击重置 重置表单数据
    ResetLoginForm() {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    }
  }
}

</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ddd;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
      position: absolute;
      height: 90px;
      width: 90px;
      background-color: #eee;
      left: 20px;
      top: 20px;
    }
  }
  .login_form{
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%);
  }
  .btns{
    display: flex;
    justify-content: center;
  }
}

</style>
