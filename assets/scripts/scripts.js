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

const solve = () => {
	console.log('Solved!');
};
