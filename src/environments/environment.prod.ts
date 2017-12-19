export const environment = {
  production: true,
  api: {
    baseUrl: `${location.protocol}//api.${location.hostname === 'localhost' ? 'stage.betterleasing.com' : location.host}/leasenet`
  }
};
