function clear() {
	$('#input').val('');
}

function getCurrentExpr() {
	return $('#input').val();
}

function update(sym) {
	let $current = getCurrentExpr();
	let $next = $current + sym;
	$('#input').val($next);
}

function evaluate() {
	const $expr = $('form').serialize();
	jQuery('<pre />', {
		id: 'expr',
		text: $('#input').val(),
	}).appendTo('code');

	$('code').text($('input').val());
	$.get(`https://api.mathjs.org/v4/?${$expr}`, (data, status) => {
		jQuery('<pre />', {
			id: 'res',
			text: data,
		}).appendTo('code');
	});
	clear();
}

function mapClickHandlers() {
	$('button').each(function () {
		$(this).click((e) => {
			e.preventDefault();
			const $val = $(this).val();
			if ($val === '=') {
				console.log('hello');
				return evaluate();
			}
			if ($val === 'C') {
				return clear();
			}
			return update($val);
		});
	});
}

mapClickHandlers();
