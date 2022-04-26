import { defineConfig } from 'umi';
import routes from './src/routes/index'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
});
