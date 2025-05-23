var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import vue from '@vitejs/plugin-vue';
import path from 'path';
import UnoCSS from 'unocss/vite';
import { defineConfig, loadEnv } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';
// import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig(function (_a) {
    var _b, _c;
    var mode = _a.mode;
    process.env = __assign(__assign({}, process.env), loadEnv(mode, process.cwd()));
    // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
    return {
        plugins: [
            vue({
                script: {
                    defineModel: true,
                },
            }),
            vueDevTools(),
            UnoCSS(),
        ],
        define: {
            'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
        },
        server: {
            host: (_b = process.env.VITE_SERVER_HOST) !== null && _b !== void 0 ? _b : 'talksiekopedia.test',
            port: Number((_c = process.env.VITE_SERVER_PORT) !== null && _c !== void 0 ? _c : 8443),
            https: process.env.VITE_SERVER_HTTPS_CERT
                ? {
                    cert: process.env.VITE_SERVER_HTTPS_CERT,
                    key: process.env.VITE_SERVER_HTTPS_KEY,
                    ciphers: process.env.VITE_SERVER_HTTPS_CIPHERS,
                }
                : undefined,
        },
        build: {
            sourcemap: true,
            outDir: 'dist/' + process.env.npm_package_version,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                'vue-easy-lightbox$': 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js',
            },
        },
    };
});
