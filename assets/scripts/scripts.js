// fixed header
window.addEventListener('scroll', () => {
	const header = document.querySelector('.header');
	if (window.scrollY >= 50) {
		header.classList.add('sticky');
	} else {
		header.classList.remove('sticky');
	}
});

// mobile
const mobile = document.querySelector('.mobile');

const mobileOpen = () => {
	mobile.classList.add('open');
	mobile.style.display = 'block';
	mobile.classList.remove('close');
	document.body.style.overflow = 'hidden';
};

const mobileClose = () => {
	mobile.classList.add('remove');
	mobile.style.display = 'none';
	mobile.classList.remove('open');
	document.body.style.overflow = '';
};

// google translate position change
function updateTranslatePosition() {
	// variables
	const googleTranslate = document.querySelector('#google_translate'); // google translate element
	const mobileInner = document.querySelector('.mobile__inner'); // mobile container
	const main = document.querySelector('main'); // main container

	if (window.innerWidth <= 660) {
		if (googleTranslate.parentElement !== mobileInner) {
			mobileInner.appendChild(googleTranslate); // return to mobileInner container
		}
	} else {
		if (googleTranslate.parentElement !== main) {
			main.appendChild(googleTranslate); // return to main container
		}
	}
}

// event listeners
window.addEventListener('DOMContentLoaded', updateTranslatePosition); // on refresh
window.addEventListener('resize', updateTranslatePosition); // on resize (width change)

// Main javascript code
const errorText = document.querySelector('.error'); // error text

// Select inequality by <select> in html
const selectInequality = inequalityIndex => {
	const btn = document.getElementById('solveBtn');

	if (inequalityIndex > 0) {
		btn.disabled = false;
		btn.classList.remove('disabled');
		errorText.style.color = 'green'; // not error color
		errorText.innerHTML = 'Valid inequality'; // not error text

		const formulaArea = document.querySelector('.formula');
		if (inequalityIndex == 2) {
			formulaArea.innerHTML = `a ln(bx + c) + d &lt; 0`;
		}
	} else {
		btn.disabled = true;
		btn.classList.add('disabled');
		errorText.style.color = 'red'; // error color
		errorText.innerHTML = 'Error: invalid inequality'; // error text
	}
};

// main function
const main = () => {
	const selectedInequality = parseInt(document.getElementById('test').value, 10); // get selected inequality index
	const input1 = parseInt(document.getElementById('input1').value, 10); // a value
	const input2 = parseInt(document.getElementById('input2').value, 10); // b value
	const input3 = parseInt(document.getElementById('input3').value, 10); // c value
	const input4 = parseInt(document.getElementById('input4').value, 10); // d value

	const checking = check(selectedInequality, input1, input2, input3, input4); // returns array of result

	result(checking[0], checking[1]); // send result
};

const check = (inequalityIndex, a, b, c, d) => {
	let result = ''; // initial result

	if (a < -100 || a > 100 || b < -100 || b > 100 || c < -100 || c > 100 || d < -100 || d > 100) {
		result = ['Please enter numbers less than 100 and bigger than -100.', false];
	} else if (inequalityIndex) {
		const solving = solve(inequalityIndex, a, b, c, d);

		result = [solving[0], solving[1]];
	}

	return result;
};

const solve = (inequalityIndex, a, b, c, d) => {
	// Logarithmic
	if (inequalityIndex == 2) {
		const exponent = -d / a; // Exponent (negative value for correct endline)
		const exponentValue = Math.exp(exponent); // Exponent value
		const root = (exponentValue - c) / b; // Root

		// Inequality sign symbol check
		const inequalitySign = a < 0 || b < 0 ? '>' : '<';

		// Get interval by inequality sign
		let interval;
		if (inequalitySign === '>') {
			interval = `(${root.toFixed(2)}, +∞)`;
		} else {
			interval = `(-∞, ${root.toFixed(2)})`;
		}

		// Console log (correct solution) - удалить потом эти логи!!!
		console.log(`1) ${a} ln(${b}x ${c < 0 ? c : '+ ' + c}) ${d < 0 ? '- ' + Math.abs(d) : '+ ' + d} < 0`);
		console.log(`2) ${a} ln(${b}x ${c < 0 ? c : '+ ' + c}) < ${-d} | /${a}`);
		console.log(`3) ln(${b}x ${c < 0 ? c : '+ ' + c}) ${a < 0 ? '>' : '<'} ${-d / a}`);
		console.log(`4) ${b}x ${c < 0 ? c : '+ ' + c} ${a < 0 ? '>' : '<'} e^${exponent}`);
		console.log(`5) ${b}x ${inequalitySign} e^${exponent} ${c < 0 ? '+ ' + c : '- ' + c}`); /*

	Как -d/a превратилось в степень экспонента?

	Я использовал свойство натурального логарифма: если ln(a) = b, значит a = e^b
	Пример: ln(7x + 3) < -2.5

	Шаги:
	1) используем: ln(a) = b, значит a = e^b
	2) получаем: 7x + 3 < e^(-2.5)
	3) Продолжаем решать неравенство.

	Оно помогает нам устранить логарифм для решения неравенства.

	Поэтому получилось => bx + c (< или >) e^(-d / a)

	*/
		console.log(`6) x ${inequalitySign} (e^${exponent} ${c < 0 ? '+ ' + c : '- ' + c}) / ${b}`);
		console.log(`Root: ${interval}`);

		return [`Root: ${interval}`, true]; // print result
	}
};

const result = (text, isTrue) => {
	const textarea = document.getElementById('result-area');
	textarea.value = text;

	if (isTrue) {
		textarea.style.color = 'green';
	} else {
		textarea.style.color = 'red';
	}
};
