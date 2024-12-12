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

// // google translate position change
// function updateTranslatePosition() {
// 	// variables
// 	const googleTranslate = document.querySelector('#google_translate'); // google translate element
// 	const mobileInner = document.querySelector('.mobile__inner'); // mobile container
// 	const main = document.querySelector('main'); // main container

// 	if (window.innerWidth <= 900) {
// 		if (googleTranslate.parentElement !== mobileInner) {
// 			mobileInner.appendChild(googleTranslate); // return to mobileInner container
// 		}
// 	} else {
// 		if (googleTranslate.parentElement !== main) {
// 			main.appendChild(googleTranslate); // return to main container
// 		}
// 	}
// }

// // event listeners
// window.addEventListener('DOMContentLoaded', updateTranslatePosition); // on refresh
// window.addEventListener('resize', updateTranslatePosition); // on resize (width change)

// Main javascript code
const errorText = document.querySelector('.error'); // error text

// Select inequality by <select> in html
const selectInequality = inequalityIndex => {
	const btn = document.getElementById('solveBtn');
	const koeficienti = document.querySelector('.coefficients-info');

	if (inequalityIndex > 0) {
		btn.disabled = false;
		btn.classList.remove('disabled');
		errorText.style.color = 'green'; // not error color
		errorText.innerHTML = 'Derīga nevienādība'; // not error text

		const formulaArea = document.querySelector('.formula');
		if (inequalityIndex == 2) {
			formulaArea.innerHTML = `a ln(bx + c) + d &lt; 0`;
			koeficienti.innerHTML = `            <details>
              <summary>
                Koeficientu ietekme
              </summary>
              <ul>
                <li><b>a:</b> Mērogo grafiku pa Y asi. Ja <b>a > 0</b>, grafiks ir augošs; ja <b>a < 0</b>, grafiks ir dilstošs.</li>
                <li><b>b:</b> Izstiepšana/saspiešana pa X asi. Ja <b>b > 0</b>, grafiks būs šaurāks; ja <b>b < 0</b>, grafiks būs platāks.</li>
                <li><b>c:</b> Grafika nobīde pa X asi. Ja <b>c > 0</b>, grafiks pārvietojas pa labi; ja <b>c < 0</b>, pa kreisi.</li>
                <li><b>d:</b> Grafika nobīde uz augšu (<b>d > 0</b>) vai uz leju (<b>d < 0</b>).</li>
              </ul>
            </details>`;
		} else if (inequalityIndex == 1) {
			formulaArea.innerHTML = `ax<sup>3</sup> + bx<sup>2</sup> + cx + d > 0`;
			koeficienti.innerHTML = `            <details>
              <summary>
                Koeficientu ietekme
              </summary>
              <ul>
                <li><b>a:</b> Mērogo grafiku pa Y asi. Ja <b>a > 0</b>, grafiks ir vērsts uz augšu; ja <b>a < 0</b>, uz leju. Tas arī nosaka, vai grafiks ir ar diviem ekstremiem (augšup un lejup) vai tikai vienu.</li>
                <li><b>b:</b> Izstiepšana/saspiešana pa X asi. Ja <b>b > 0</b>, grafiks būs šaurāks; ja <b>b < 0</b>, grafiks būs platāks.</li>
                <li><b>c:</b> Grafika nobīde pa X asi. Ja <b>c > 0</b>, grafiks pārvietojas pa labi; ja <b>c < 0</b>, pa kreisi.</li>
                <li><b>d:</b> Grafika nobīde uz augšu (<b>d > 0</b>) vai uz leju (<b>d < 0</b>).</li>
              </ul>
            </details>`;
		}
	} else {
		btn.disabled = true;
		btn.classList.add('disabled');
		errorText.style.color = 'red'; // error color
		errorText.innerHTML = 'Kļūda: nederīga nevienādība'; // error text
		koeficienti.innerHTML = 'Lūdzu, izvēlieties nevienādību';
	}
};

// main function
const main = () => {
	const selectedInequality = parseInt(document.getElementById('test').value); // get selected inequality index
	const input1 = parseFloat(document.getElementById('input1').value, 10); // a value
	const input2 = parseFloat(document.getElementById('input2').value, 10); // b value
	const input3 = parseFloat(document.getElementById('input3').value, 10); // c value
	const input4 = parseFloat(document.getElementById('input4').value, 10); // d value

	const checking = check(selectedInequality, input1, input2, input3, input4); // returns array of result

	if (checking[1]) {
		solve(selectedInequality, input1, input2, input3, input4); // send result
	} else {
		result(checking[0], checking[1]);
	}
};

const check = (inequalityIndex, a, b, c, d) => {
	let result = ['', true]; // initial result

	if (a < -20 || a > 20 || b < -20 || b > 20 || c < -20 || c > 20 || d < -20 || d > 20) {
		result = ['Lūdzu, ievadiet skaitļus, kas mazāks par 20 un lielāks par -20.', false];
	} else if (b === 0 && c <= 0 && inequalityIndex == 2) {
		result = [`Nederīgs ievads: ja b = 0, tad c jābūt pozitīvam.`, false];
	} else if (inequalityIndex <= 0 || inequalityIndex > 2) {
		result = ['Lūdzu, izvēlieties pareizo nevienādību.', false];
	} else if (!Number.isInteger(a) || !Number.isInteger(b) || !Number.isInteger(c) || !Number.isInteger(d)) {
		result = ['Lūdzu, ievadiet tikai veseļus skaitļus', false];
	} else if (a <= 0) {
		result = ['Nederīgs ievads: a jābūt pozitivām', false];
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
	const centerX = myCanvas.width / 2;
	const centerY = myCanvas.height / 2;
	const scaleX = 10;
	const scaleY = 10;

	ctx.beginPath();
	ctx.strokeStyle = 'blue';
	ctx.lineWidth = 2;

	const minX = -centerX / scaleX;
	const maxX = centerX / scaleX;
	const step = 0.01;

	for (let x = minX; x <= maxX; x += step) {
		const y = a * Math.pow(x, 3) + b * Math.pow(x, 2) + c * x + d;
		const screenX = centerX + x * scaleX;
		const screenY = centerY - y * scaleY;
		if (x === minX) {
			ctx.moveTo(screenX, screenY);
		} else {
			ctx.lineTo(screenX, screenY);
		}
	}
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

		const testPoint = left === -Infinity ? right - 1 : right === Infinity ? left + 1 : (left + right) / 2;

		const y = a * Math.pow(testPoint, 3) + b * Math.pow(testPoint, 2) + c * testPoint + d;

		if ((a > 0 && y > 0) || (a < 0 && y < 0)) {
			intervals.push(`(${left === -Infinity ? '-∞' : left.toFixed(2)}; ${right === Infinity ? '∞' : right.toFixed(2)})`);
		}
	}

	// ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'; // Полупрозрачный красный

	// for (const interval of intervals) {
	// 	const left = interval.includes('-∞') ? -Infinity : parseFloat(interval.split(';')[0].replace(/[^\d.-]/g, ''));
	// 	const right = interval.includes('∞') ? Infinity : parseFloat(interval.split(';')[1].replace(/[^\d.-]/g, ''));

	// 	// Преобразуем координаты в пиксели
	// 	const startX = left === -Infinity ? 0 : centerX + left * scaleX;
	// 	const endX = right === Infinity ? myCanvas.width : centerX + right * scaleX;

	// 	ctx.fillRect(Math.min(startX, endX), 0, Math.abs(endX - startX), myCanvas.height);
	// }
	console.log('Корни уравнения:', roots);
	console.log('Интервалы:', intervals);

	return [`x ∈ ${intervals.join(' ∪ ')}`, true];
};

const logarithmicSolve = (a, b, c, d) => {
	// Draw function graph
	ctx.beginPath();
	ctx.strokeStyle = 'green';
	ctx.lineWidth = 2;

	let xStart = -myCanvas.width / 2; // start x-coordinate in canvas
	let xEnd = myCanvas.width / 2; // end x-coordinate in canvas

	// Scale for real values
	const xScale = 10; // Adjust for scaling the x-axis
	const yScale = 10; // Adjust for scaling the y-axis

	for (let x = xStart / xScale; x <= xEnd / xScale; x += 0.005) {
		// smaller step for smoother graph
		let logArgument = b * x + c; // Argument of the logarithm
		if (logArgument > 0) {
			let y = a * Math.log(logArgument) + d; // Calculate y value
			let canvasX = x * xScale + myCanvas.width / 2; // Scale x for canvas
			let canvasY = myCanvas.height / 2 - y * yScale; // Scale y for canvas (invert y)

			if (x === xStart / xScale) {
				ctx.moveTo(canvasX, canvasY); // Move to first point
			} else {
				ctx.lineTo(canvasX, canvasY); // Draw line
			}
		} else {
			ctx.moveTo(x * xScale + myCanvas.width / 2, myCanvas.height); // Skip invalid points
		}
	}
	ctx.stroke();
	ctx.closePath();

	// Inequality roots calculation
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

const refresh = () => {
	const koeficienti = document.querySelector('.coefficients-info');
	const textarea = document.getElementById('result-area');
	errorText.innerHTML = '';
	koeficienti.innerHTML = 'Lūdzu, izvēlieties nevienādību';
	textarea.value = '';

	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
};
