import type { NextConfig } from "next";

/**
 * Wave 9: on-device Whisper.
 *
 * `@xenova/transformers` is pulled in dynamically by `src/lib/ai/local-whisper.ts`
 * from a client component only — the model weights are fetched at runtime from
 * the Hugging Face CDN (or `public/models/` if we ever self-host) and cached by
 * Transformers.js in IndexedDB. We only need webpack to:
 *   1. Keep the Node-only deps (`sharp`, `onnxruntime-node`) out of the server
 *      and client bundles (we use the WASM / WebGPU runtime in the browser only).
 *   2. Stub Node core modules on the client build so Transformers.js can be
 *      loaded without the bundler erroring on `fs` / `path` / `crypto`.
 * `serverExternalPackages` keeps the package out of the server-component bundle
 * so a stray server-side import (which we don't do today) doesn't drag ONNX in.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  serverExternalPackages: ["@xenova/transformers", "onnxruntime-node", "sharp"],
  webpack(config, { isServer }) {
    config.resolve ??= {};
    if (!isServer) {
      // Node core modules Transformers.js references but never actually calls
      // in a browser code-path. Marking them `false` emits an empty module.
      config.resolve.fallback = {
        ...(config.resolve.fallback as Record<string, unknown> | undefined),
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        url: false,
        http: false,
        https: false,
        zlib: false,
        os: false,
      };
    }
    // `sharp` and `onnxruntime-node` are Node-only — never bundle them for
    // either side. The in-browser `onnxruntime-web` runtime is what we actually
    // need; it loads WASM/WebGPU and ships with Transformers.js.
    const externals = Array.isArray(config.externals) ? config.externals : [];
    externals.push({ sharp: "commonjs sharp", "onnxruntime-node": "commonjs onnxruntime-node" });
    config.externals = externals;
    return config;
  },
};

export default nextConfig;
