import { defineConfig } from 'wxt';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/unplugin-vue-i18n/vite';
import topLevelAwait from 'vite-plugin-top-level-await';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  vite: () => ({
    build: {
      // 或者指定更现代的浏览器版本, 解决以确保支持顶层 await。
      target: 'esnext',
    },
    // 如果开发阶段也报错，可以配置 esbuild
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext'
      }
    },
    plugins: [
      topLevelAwait({
        promiseExportName: '__tla',
        promiseImportName: (i) => `__tla_${i}`,
      }),
      // See https://vue-i18n.intlify.dev/guide/advanced/optimization.html
      vueI18n({
        include: 'assets/locales/*.json',
      }),
    ],
  }),
  imports: {
    addons: {
      // 自动载入
      vueTemplate: true,
    },
  },
  manifest: {
    name: '__MSG_appName__',
    description: '__MSG_appDescription__',
    default_locale: 'zh',
    permissions: ['storage', 'tabs', "alarms", "notifications", "action"],
  },
});
