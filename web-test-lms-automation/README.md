## web-test-lms-automation

### Commands from root rcf-monorepo folder:

To run using compiled production software (runs faster):

`yarn compile:player` to compile packages  
`yarn lms:production` to run the api and website

To run using development software:

`yarn lms` to run api and website

### Command from packages/web-test-lms-automation:

Make sure the `web-test-lms` website and `api-test-lms` back-end API are running in the background.  

See `web-test-lms-automation/package.json` -> scripts property for a full set of available automation scripts.

The main scripts you can run are:

`yarn test` to run in visible chrome window

`yarn test:headless` to run in headless chrome window

`yarn test:browserstack` to run test in browserstack chrome window 

(Set environment variables `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` first to configure browserstack for your laptop install)


