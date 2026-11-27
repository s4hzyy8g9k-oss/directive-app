/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // iPhone Universal Links for /r/<CODE>. No extension, so the type has to be set here.
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
      {
        // Android App Links. sha256_cert_fingerprints stays empty until Ray copies them from Play Console > App signing.
        source: "/.well-known/assetlinks.json",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
      {
        // Status file the app reads when it opens (format: project-docs/launch/APP_STATUS_FILE.md in the app repo).
        source: "/app-status.json",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Cache-Control", value: "public, max-age=300" },
        ],
      },
    ];
  },
};

export default nextConfig;
