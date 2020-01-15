# Writing a new integration test:

## Steps:

-   start website 'yarn lms'
    starts website running on localhost:3000

-   new features file
    packages\web-test-lms-automation\src\features\<file>.js

-   for any data you need, add to files under `lib/data`

-   parameter 't' provides all testcafe methods,
    documentation available here: https://devexpress.github.io/testcafe/documentation/test-api

## Write the fixture - the setup code

e.g. 'navigate to the web-test-lms homepage' 

* Copy/paste from existing calls to `fixture(...)` found in web-test-lms-automation  
* Okay to have multiple `fixture(...)` in one test file. See [README-automation-project-structure.md](./README-automation-project-structure.md) for more information 


## Write a blank test
The template for any test is 
```
test('name', async (t) => {

});
```

## Testing css selectors in real-time:

-   Open rcf player in chrome developer tools
-   In the console, type `document.querySelectorAll('<css selector here>')` to find an element or elements on the page

(https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

## Running automation test scripts:

* Can modify the package.json-> "scripts" property,
* copy/paste from existing scripts
* custom scripts can be written to:
    * run run one test or a few tests
    * run in headless mode
    * run with different browsers etc.
