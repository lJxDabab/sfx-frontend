import { defineConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    })
  ],
})
