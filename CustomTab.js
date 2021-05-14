(function(global) {
	const $link = document.querySelector("link[rel='shortcut icon']");
	const $input = document.getElementsByTagName('input')[0];
	const $body = document.body;
	let timeoutId = null;

	function pad2(x) {
		x += '';

		while (x.length < 2) {
			x = '0' + x;
		}

		return (x);
	}

	function updateFavicon(value) {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(function() {
			timeoutId = null;

			const titleEnc = encodeURIComponent(value);
			const hash = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
			for (let i = 0 ; i < titleEnc.length ; i++) {
				const k = i % hash.length;
				hash[k] = (hash[k] + titleEnc.charCodeAt(i)) % 256;
			}
			const hashStr = hash.map((x) => pad2(x.toString(16))).join('');
			const gravatarUrl = `https://www.gravatar.com/avatar/${hashStr}?d=identicon&f=y`;

			// Tried to avoid the double image download here, but nothing works... PR welcome!
			$link.href = gravatarUrl;
			$body.style.backgroundImage = `url(${gravatarUrl})`;
		}, 1000);
	}

	function inputChange(value) {
		document.title = value || '---';
		
		location.hash = value ? '#' + encodeURIComponent(value) : '';
		updateFavicon(value || '');
	}

	function focusInput() {
		$input.focus();
	}

	global.inputChange = inputChange;
	global.focusInput = focusInput;

	const loadTimeInputValue = decodeURIComponent(location.hash.substr(1));

	inputChange(loadTimeInputValue);
	$input.value = loadTimeInputValue;
})(window);
