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

	if (window.innerWidth <= 900) {
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
		errorText.innerHTML = 'Derīga nevienādība'; // not error text

		const formulaArea = document.querySelector('.formula');
		if (inequalityIndex == 2) {
			formulaArea.innerHTML = `a ln(bx + c) + d &lt; 0`;
		} else if (inequalityIndex == 1) {
			formulaArea.innerHTML = `ax<sup>3</sup> + bx<sup>2</sup> + cx + d > 0`;
		}
	} else {
		btn.disabled = true;
		btn.classList.add('disabled');
		errorText.style.color = 'red'; // error color
		errorText.innerHTML = 'Kļūda: nederīga nevienādība'; // error text
	}
};

// main function
const main = () => {
	const selectedInequality = parseInt(document.getElementById('test').value); // get selected inequality index
	const input1 = parseInt(document.getElementById('input1').value); // a value
	const input2 = parseInt(document.getElementById('input2').value); // b value
	const input3 = parseInt(document.getElementById('input3').value); // c value
	const input4 = parseInt(document.getElementById('input4').value); // d value

	const checking = check(selectedInequality, input1, input2, input3, input4); // returns array of result

	if (checking[1]) {
		solve(selectedInequality, input1, input2, input3, input4); // send result
	} else {
		result(checking[0], checking[1]);
	}
};

const check = (inequalityIndex, a, b, c, d) => {
	let result = ['', true]; // initial result

	if (a < -100 || a > 100 || b < -100 || b > 100 || c < -100 || c > 100 || d < -100 || d > 100) {
		result = ['Lūdzu, ievadiet skaitļus, kas mazāks par 100 un lielāks par -100.', false];
	} else if (b === 0 && c <= 0 && inequalityIndex == 2) {
		result = [`Nederīgs ievads: ja b = 0, tad c jābūt pozitīvam.`, false];
	} else if (inequalityIndex <= 0 || inequalityIndex > 2) {
		result = ['Lūdzu, izvēlieties pareizo nevienādību.', false];
	}

	return result;
};

const myCanvas = document.getElementById('myCanvas');
const ctx = myCanvas.getContext('2d');

const cells = () => {
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

	for (let i = 0; i < myCanvas.width; i += 10) {
		ctx.moveTo(i, 0);
		ctx.lineTo(i, myCanvas.height);
	}

	for (let j = 0; j < myCanvas.height; j += 10) {
		ctx.moveTo(0, j);
		ctx.lineTo(myCanvas.width, j);
	}

	ctx.strokeStyle = 'rgba(0,0,0,.4)';
	ctx.lineWidth = 0.5;
	ctx.stroke();

	// x
	ctx.beginPath();
	ctx.moveTo(0, myCanvas.height / 2);
	ctx.lineTo(myCanvas.width, myCanvas.height / 2);
	ctx.lineWidth = 2;
	ctx.stroke();

	// y
	ctx.beginPath();
	ctx.moveTo(myCanvas.width / 2, 0);
	ctx.lineTo(myCanvas.width / 2, myCanvas.height);
	ctx.lineWidth = 2;
	ctx.stroke();
};

const solve = (inequalityIndex, a, b, c, d) => {
	cells();
	let resultText = '';
	let isTrue = false;

	// в зависимости какую пользователь выбрал функцию
	if (inequalityIndex == 1) {
		[resultText, isTrue] = cubicSolve(a, b, c, d, ctx);
	} else if (inequalityIndex == 2) {
		[resultText, isTrue] = logarithmicSolve(a, b, c, d);
	}

	result(resultText, isTrue);
};

const cubicSolve = (a, b, c, d) => {
	const centerX = myCanvas.width / 2; // x center
	const centerY = myCanvas.height / 2; // y center
	const scaleX = 10; // canvas step by x (10px = 1x)
	const scaleY = 10; // canvas step by y (10px = 1y)

	// draw graph start
	ctx.beginPath();
	ctx.strokeStyle = 'blue';
	ctx.lineWidth = 1.5;

	// border and graph steps
	const minX = -centerX / scaleX; // left graph border
	const maxX = centerX / scaleX; // right graph border
	const step = 0.01; // graph draw step

	// пока x не превысил максимум прибавляем x к step
	for (let x = minX; x <= maxX; x += step) {
		const y = a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;

		// да
		// coords convert to px
		const screenX = centerX + x * scaleX;
		const screenY = centerY - y * scaleY;
		// line draw
		if (x === minX) {
			ctx.moveTo(screenX, screenY);
		} else {
			ctx.lineTo(screenX, screenY);
		}
	}
	// это график сам

	ctx.stroke();

	b /= a;
	c /= a;
	d /= a;
	const p = c - (b * b) / 3;
	const q = (2 * Math.pow(b, 3)) / 27 - (b * c) / 3 + d;
	const discriminant = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);

	let roots = [];

	if (discriminant > 0) {
		const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
		const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
		const x1 = u + v - b / 3;
		roots.push(parseFloat(x1.toFixed(2)));
	} else if (discriminant === 0) {
		const u = Math.cbrt(-q / 2);
		const x1 = 2 * u - b / 3;
		const x2 = -u - b / 3;
		roots.push(parseFloat(x1.toFixed(2)), parseFloat(x2.toFixed(2)));
	} else {
		const r = Math.sqrt(-Math.pow(p / 3, 3));
		const phi = Math.acos(-q / (2 * r));
		const x1 = 2 * Math.cbrt(r) * Math.cos(phi / 3) - b / 3;
		const x2 = 2 * Math.cbrt(r) * Math.cos((phi + 2 * Math.PI) / 3) - b / 3;
		const x3 = 2 * Math.cbrt(r) * Math.cos((phi + 4 * Math.PI) / 3) - b / 3;
		roots.push(parseFloat(x1.toFixed(2)), parseFloat(x2.toFixed(2)), parseFloat(x3.toFixed(2)));
	}

	roots.sort((a, b) => a - b);
	const intervals = [];
	for (let i = 0; i <= roots.length; i++) {
		const left = i === 0 ? -Infinity : roots[i - 1];
		const right = i === roots.length ? Infinity : roots[i];
		const mid = (left + right) / 2;
		const y = a * Math.pow(mid, 3) + b * Math.pow(mid, 2) + c * mid + d;
		if (y > 0) {
			intervals.push(`(${left === -Infinity ? '-∞' : left.toFixed(2)}; ${right === Infinity ? '∞' : right.toFixed(2)})`);
		}
	}

	return [`x ∈ ${intervals.join(' ∪ ')}`, true];
};

const logarithmicSolve = (a, b, c, d) => {
	// Draw function graph
	ctx.beginPath();
	ctx.strokeStyle = 'green';
	ctx.lineWidth = 2;

	let xStart = -myCanvas.width / 2; // initial start x value
	let xEnd = myCanvas.width / 2; // initial end x value

	for (let x = xStart; x <= xEnd; x += 0.1) {
		// Calculate the argument of the log function
		let logArgument = (b * x) / 20 + c;
		if (logArgument > 0) {
			// Calculate the y value
			let y = a * Math.log(logArgument) + d;
			y = Math.min(Math.max(y, -myCanvas.height / 2), myCanvas.height / 2);
			ctx.lineTo(x + myCanvas.width / 2, myCanvas.height / 2 - y);
		} else {
			// Draw horizontal line if logArgument <= 0
			ctx.moveTo(x + myCanvas.width / 2, myCanvas.height);
		}
	}
	ctx.stroke();
	ctx.closePath();

	// Inequality roots
	const exponent = -d / a;
	const exponentValue = Math.exp(exponent);
	const root = (exponentValue - c) / b;
	const minX = -c / b;

	const inequalitySign = a < 0 || b < 0 ? '>' : '<';
	let interval;

	if (inequalitySign === '>') {
		interval = `(${root.toFixed(2)}, +∞)`;
	} else {
		interval = `(-∞, ${root.toFixed(2)})`;
	}

	if (inequalitySign === '>' && root < minX) {
		interval = `(${c} / ${b}, +∞)`;
	} else if (inequalitySign === '<' && root > minX) {
		interval = `(-${c} / ${b}, ${root.toFixed(2)})`;
	} else if (inequalitySign === '>' && root > minX) {
		interval = `(-∞, +∞)`;
	}

	console.log(`1) ${a} ln(${b}x ${c < 0 ? c : '+ ' + c}) ${d < 0 ? '- ' + Math.abs(d) : '+ ' + d} < 0`);
	console.log(`2) ${a} ln(${b}x ${c < 0 ? c : '+ ' + c}) < ${-d} | /${a}`);
	console.log(`3) ln(${b}x ${c < 0 ? c : '+ ' + c}) ${a < 0 ? '>' : '<'} ${-d / a}`);
	console.log(`4) ${b}x ${c < 0 ? c : '+ ' + c} ${a < 0 ? '>' : '<'} e^${exponent}`);
	console.log(`5) ${b}x ${inequalitySign} e^${exponent} ${c < 0 ? '+ ' + c : '- ' + c}`);

	/* Как -d/a превратилось в степень экспонента?

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

	return [`x ∈ ${interval}`, true];
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
