const {registerRouter} = require('./BACK_END/router.js')
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和 mixin
        prependData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixins.scss";
        `,
      },
    },
  },
  devServer: {
    before(app) {
      registerRouter(app)
    }
  }
};
