# web-test-lms-automation project structure 

## pageModels

`src\pageModels`

Defines collections of css selectors accessing parts of the webpage.

* CSS selectors are put into files like `buttonsPageModel.js`. The automation tests do not care which file a selector is placed in - the file choices are just to help keep things organised for RCF team members working on automation tests. 

* CSS selectors for the player and RCF framework  __should only go into the pageModels folder__. 

* A few tests refer to CSS page elements for just one specific activity. CSS selectors for these have been placed in `lib/data/exampleActivitySet.js` 

* Each css selector is a self-contained function, so no need to create a class instance first. Just import the function in a feature file then call it.

### Explanation: Why all the pageModel selectors are __functions__

Each pageModel selector is a function that needs to be called.

For example `submitButton` could have been implemented not as a function, but just returning the fixed value `Selector('button')`. Therefore:
```
const selector1 = submitButton;
const selector2 = submitButton;
console.log(selector1 === selector2); // true 
```

But actually `submitButton` has been implemented as a function which returns a new selector on every call. Therefore: 

```
const selector3 = submitButton();
const selector4 = submitButton();
console.log(selector1 === selector2); // false 
```

There is a reason for this. 

Each selector is a _promise_ to access an on-screen webpage element. A promise is resolved by `await`ing it. Resolving the promise actually runs the code. This can happen just the once for one promise. 

Looking at the examples above, `await selector1.exists` would check for one specific moment in time if the submit button exists. That promise has now resolved. Let's say the result is `false`.

Now let's say 3 seconds later the submit button appears. A call to `await selector1.exists` will still return false - that resolved promise is now fixed at a historical moment in time. If you want a fresh check on the webpage, you need a fresh, unresolved promise. That is what `submitButton()` gets you - every function call returns a fresh, unresolved Promise. 

## features

`src/features` 

* Organised into folders with relevance to how automation tests have been split up 
* Avoid too many sub-folders, so fairly easy to see what test are available

### feature file organisation 

```
fixture(...).beforeEach(...) - open a specific activtiy for a particular user, role, link origin 

test(...)
test(...)
test(...)
```

### feature file organisation, same tests run for multiple fixtures 

```
fixture(...).beforeEach(...) - open activity 

tests();

fixture(...).beforeEach(...) - open same activity for different user/role/link origin 

tests();


// wrap test code in outer function called 'tests'
function tests() {
	test(...)
	test(...)
	test(...)
}
```

### feature file writing best practices 

* After some brief setup code logic (in fixtures at the top of the test file), each line of automation test should be just one thing the 'robot' automation test script does.

* It should be fairly simple for an RCF team member to view a feature file and manually carry out the test steps that the automation test is performing (without having to reverse-engineer or follow helper files other than the TestCafe API documentation)

* For readability, leave a blank link between the UI event in a test (like a click event) and then all the `t.expect(...)` lines that follow it, so UI actions and tests on the page are visible in blocks 

* Where possible, the automation test should call the testcafe API directly without abstracting calls to testcafe away into helper functions. 

* If checking for element existing and then another property of the same element, simplify the test by just checking for the property. E.g. instead of 

```
await t.expect(tryAgain().exists).ok();
await t.expect(tryAgain().hasAttribute('disabled')).notOk();
```

just do 

```
await t.expect(tryAgain().hasAttribute('disabled')).notOk();
```

If the element does not exist, the property check is going to fail anyway. 

## lib folder 

In general, javascript in `lib/` should be more complex sequences of test steps that could have be written inline within a feature file. However because the same sequences can be reused across tests, the sequences have been placed in helper functions within `lib` . 

`lib` functions should not just wrap a single function call to a testcafe API or should not be a simple sequence of steps. For readability and ease-of-understanding calls to the testcafe API should be left inline where possible and simple sequences of test steps should be left inline where possible. 
