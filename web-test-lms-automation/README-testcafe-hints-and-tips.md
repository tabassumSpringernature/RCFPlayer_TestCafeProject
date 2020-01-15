## Hints and tips

### Asynchronous testcafe methods

All testcafe helper methods are asynchronous by default.

This means they represent a 'promise' to access a page element or elements in the near future.

```
Selector('.get-answers-for-activity-set').click();
```

is a promise to click the button

```
await Selector('.get-answers-for-activity-set').click();
```

actually clicks the button

```
const valuePromiseFunction = Selector('textarea').withAttribute('data-manifest-details').value;
```

is just a promise to retrieve the text within the textarea.

```
const value = return await Selector('textarea').withAttribute('data-manifest-details').value;
```

_actually_ retrieves the text within the textarea

### Waiting for the page

Because everything is async, testcafe automatically waits (until a timeout) for the requested elements to appear on the page.

### Accessing individual fields in a DOM element

Awaiting a single attribute value or text field is the most efficient and fastest way to access elements on a page.

```
const value = await Selector('.example').textContent;
```

Resolves the promise to get just the text content within the element with css class 'example' on the webpage

### Accessing a whole DOM element

You can await whole DOM element(s) to get the entire DOM state for the element(s) at once.

```
const value = await Selector('.example');
```

This returns a large number of fields for the DOM element, documented here: https://devexpress.github.io/testcafe/documentation/test-api/selecting-page-elements/dom-node-state.html

It is slower to retrieve a whole DOM snapshot in this way.

### Accessing an array of DOM elements

The testcafe `Selector(...)` helper returns the first matching element if several elements on the page match the requested pattern.

A .count method can be used to get the number of elements on the page, and the nth(i) helper can be used to retrieve each one individually.

See javascript file `src/lib/getAttributes.js` as an example of this technique.

### Further documentation

-   Testcafe API documentation: https://devexpress.github.io/testcafe/documentation/test-api/
-   Browserstack plugin: https://github.com/DevExpress/testcafe-browser-provider-browserstack
