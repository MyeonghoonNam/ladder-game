const { merge } = require('webpack-merge');
const common = require('./webpack.common.cjs');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  performance: {
    hints: false, // 성능 경고 비활성화
  },
});
