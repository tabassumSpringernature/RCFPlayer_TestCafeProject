import { Selector } from 'testcafe';

export { outerHtml, innerHtml };
async function outerHtml(selector, check, t) {
	const lable = Selector(selector).addCustomDOMProperties({
		outerHTML: (el) => el.outerHTML
	});

	console.log('html: ', await lable.outerHTML);

	console.log('progress bar is active');
	await t.expect(lable.outerHTML).contains(check);
}

async function innerHtml(selector, check, t) {
	const lable = Selector(selector).addCustomDOMProperties({
		innerHTML: (el) => el.innerHTML
	});

	console.log('html: ', await lable.innerHTML);

	console.log('progress bar is active');
	await t.expect(lable.innerHTML).contains(check);
}
