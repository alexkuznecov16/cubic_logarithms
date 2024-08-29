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
	} else if (b === 0 && c <= 0) {
		result = [`Invalid input: if b = 0, then c must be positive.`, false];
	} else if (inequalityIndex) {
		const solving = solve(inequalityIndex, a, b, c, d);

		result = [solving[0], solving[1]];
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

	ctx.strokeStyle = 'black';
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

	if (inequalityIndex == 1) {
		[resultText, isTrue] = cubicSolve(a, b, c, d);
	} else if (inequalityIndex == 2) {
		[resultText, isTrue] = logarithmicSolve(a, b, c, d);
	}

	result(resultText, isTrue);
};

function cubicSolve(a, b, c, d) {
	if (Math.abs(a) === 0) {
		a = b;
		b = c;
		c = d;
		if (Math.abs(a) === 0) {
			a = b;
			b = c;
			if (Math.abs(a) === 0) return ['', false];
			return [[-b / a].join('\n'), true];
		}

		var D = b * b - 4 * a * c;
		if (Math.abs(D) === 0) return [[-b / (2 * a)].join('\n'), true];
		else if (D > 0) return [[(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)].join('\n'), true];
		return ['', false];
	}

	var p = (3 * a * c - b * b) / (3 * a * a);
	var q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
	var x1, x2, x3;

	if (Math.abs(p) === 0) {
		x1 = [Math.cbrt(-q)];
		ctx.moveTo(0, 300);
		ctx.bezierCurveTo(100, -310, 120, 722, 280, 0);
		ctx.lineTo(330, 0);
		ctx.lineTo(300, 13);
		ctx.stroke();
		return [`x1: ${x1.join('\n')}\nMultiple Roots`, true];
	} else if (Math.abs(q) === 0) {
		x1 = 1;
		x2 = Math.sqrt(-p);
		x3 = -Math.sqrt(-p);
		ctx.moveTo(0, 300);
		ctx.bezierCurveTo(100, -310, 222, 434, 280, 0);
		ctx.lineTo(330, 0);
		ctx.lineTo(300, 13);
		ctx.stroke();
		return [`x1: ${x1}\nx2: ${x2}\nx3: ${x3}\n1 Root`, true];
	} else {
		var D = (q * q) / 4 + (p * p * p) / 27;
		if (Math.abs(D) === 0) {
			x1 = (-1.5 * q) / p;
			x2 = (3 * q) / p;
			x3 = 0;
			ctx.moveTo(0, 300);
			ctx.bezierCurveTo(100, -310, 111, 545, 280, 0);
			ctx.lineTo(330, 0);
			ctx.lineTo(300, 13);
			ctx.stroke();
			return [`x1: ${x1}\nx2: ${x2}\nx3: ${x3}\n2 Roots`, true];
		} else if (D > 0) {
			var u = Math.cbrt(-q / 2 - Math.sqrt(D));
			x1 = u - p / (3 * u);
			x2 = (-b + Math.sqrt(D)) / (2 * a);
			x3 = (-b - Math.sqrt(D)) / (2 * a);
			ctx.moveTo(0, 300);
			ctx.bezierCurveTo(120, -310, 121, 434, 250, 0);
			ctx.lineTo(330, 0);
			ctx.lineTo(300, 13);
			ctx.stroke();
			return [`x1: ${x1}\nx2: ${x2}\nx3: ${x3}\n1 Valid Root`, true];
		} else {
			var u = 2 * Math.sqrt(-p / 3);
			var t = Math.acos((3 * q) / p / u) / 3;
			var k = (2 * Math.PI) / 3;
			x1 = u * Math.cos(t);
			x2 = u * Math.cos(t - k);
			x3 = u * Math.cos(t - 2 * k);
			ctx.moveTo(0, 300);
			ctx.bezierCurveTo(100, -310, 100, 600, 280, 0);
			ctx.lineTo(330, 0);
			ctx.lineTo(300, 13);
			ctx.stroke();
			return [`${x1}\n${x2}\n${x3}\nAll 3 Roots`, true];
		}
	}
}

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

	return [`Root: ${interval}`, true];
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
