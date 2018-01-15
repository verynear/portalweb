// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  api: {
    baseUrl: `${location.protocol}//api.${location.hostname === 'localhost' ? 'devdemo.betterleasing.com' : location.host}/leasenet`
  },
  version: '18.1.12'  // Version number of app. Format: (Year.Month.Day)
};
