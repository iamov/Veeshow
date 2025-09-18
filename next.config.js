const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable:false,
  workboxOptions:{
    disableDevlogs: true
  }
});

module.exports = withPWA({
  reactStrictMode: true,
});