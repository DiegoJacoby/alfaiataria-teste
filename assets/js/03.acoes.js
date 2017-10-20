jQuery(document).ready(function($) {

	//Slider
	function slider() {
		var sliderEl = $('section#slider');

		function montaBanner(el){
			var qtdItens = el.find('.item').length;
			for (var i = 0; i < qtdItens; i++) {
				el.find('.bullets ul').append('<li><a href="#">'+i+'</a></li>');
			};
			el.find('.bullets ul li').first().addClass('ativo');
		}
		function animaSlider(el){
			var limite = el.find('.item').length - 1;
			var animacao = setInterval(function(){
				var ativo = el.find('.item.ativo').index();
				var proximo;

				if ( ativo == limite){
					proximo = 0;
				} else {
					proximo = ativo + 1;
				}
				 
				movimento(el, proximo);

				el.find('.bullets li').removeClass('ativo');
				el.find('.bullets li:eq('+proximo+')').addClass('ativo');

			}, 4000);

			$(document).on('click', '.bullets li', function(event) {
				event.preventDefault();

				clearInterval(animacao);

				var proximo = $(this).index();

				el.find('.bullets li').removeClass('ativo');
				$(this).addClass('ativo');

				movimento(el, proximo);
			});		

			$(document).on('click', '.bullets a.seta', function(event) {
				event.preventDefault();

				clearInterval(animacao);

				var ativo = el.find('.item.ativo').index();
				var proximo;

				
				if ($(this).hasClass('mais')){
					if ( ativo == limite){
						proximo = 0;
					} else {
						proximo = ativo + 1;
					}
				} else {
					if ( ativo == 0){
						proximo = limite;
					} else {
						proximo = ativo - 1;
					}
				}
				 
				movimento(el, proximo);

				el.find('.bullets li').removeClass('ativo');
				el.find('.bullets li:eq('+proximo+')').addClass('ativo');
			});		
		}
		function movimento(el, proximo) {
			el.find('.item:eq('+proximo+')').css('opacity','1');
			el.find('.item.ativo').animate({opacity: 0}, 300, function(){
				$(this).removeClass('ativo');			
				el.find('.item:eq('+proximo+')').addClass('ativo');
			});		
		}

		montaBanner(sliderEl);
		animaSlider(sliderEl);
	}
	slider();

	//Validação do formulário utilizando JQuery
	$('#form-contato').validate({
		rules: {
			nome: 'required',
			email: {
				required: true,
				email: true
			},
			tel: 'required',
			assunto: 'required',
			mensagem: 'required'
		},
		messages: {
			nome: 'Por favor, insira seu nome',
			email: {
				required: 'Digite seu e-mail',
				email: 'Seu e-mail deve ter o formato nome@dominio.com'
			},
			tel: 'Por favor, insira seu telefone',
			assunto: 'Por favor, insira o assunto',
			mensagem: 'Por favor, insira sua mensagem'
		}
	});

	// Efeito clique ancora
	$('section#slider a.ancora, header .menu-principal a, footer nav a').click(function(event) {
		event.preventDefault();

		var scrollar = $($(this).attr('href')).offset().top;
		$('html, body').animate({scrollTop: scrollar}, 700);
	});

	//Menu Mobile
	$('.menu-mobile').click(function(event) {
		event.preventDefault();
		
		$('header nav.menu-principal').slideToggle();
	});
});
