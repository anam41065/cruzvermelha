// JavaScript Document

//Smooth scroll
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top-73
        }, 1000);
        return false;
      }
    }
  });
});

var cttform, msg;

var site = {
	init: function(){
		document.onreadystatechange = function(){
			if (this.readyState == 'complete'){ site.start();}
		}
	},
	start: function(){// referente ao footer e ao formulário
		cttform = (document.getElementsByTagName('footer')[0] != null)? document.getElementsByTagName('footer')[0].getElementsByTagName('form')[0] : null;
		msg = document.getElementById('msg');
			
		if (cttform != null){
			cttform.onsubmit = function(){ 
				site.ajaxsubmit();
				return false;
			}
		}
					
		//Hamburguer - referente ao menu com aplicação para telemóvel.
		if (document.getElementsByClassName('hamburger').length >= 1){
			document.getElementsByClassName('hamburger')[0].addEventListener("click", function(){
				this.classList.toggle("is-active");
				this.parentElement.parentElement.classList.toggle("is-active");	
			}, false);
		}
		
		var noticias = document.getElementById('noticias').getElementsByTagName('article'); // REFERERENTE A NOTICIAS
		for (i=0; i<noticias.length; i++){
			noticias[i].onclick = function(){
				var titulo = this.getElementsByTagName('p')[0].innerText;
				var imagem = this.getElementsByTagName('img')[0].src;
				var texto = this.getElementsByTagName('span')[0].innerHTML;
				
				var popup = document.getElementById('popup').getElementsByTagName('div')[0];
				var ptitulo = popup.getElementsByTagName('p')[0];
				var pimagem = popup.getElementsByTagName('img')[0];
				var ptexto = popup.getElementsByTagName('span')[0];
				
				ptitulo.innerHTML = titulo;
				pimagem.src = imagem;
				ptexto.innerHTML = texto;
				
				document.getElementById('popup').style.display = 'block';
				
				
				}
			}
		
			document.getElementById('popup').onclick = function(){ // referente ao popup de fechar.
				this.style.display = 'none';
			}
		
		
		
		//Paralax - referente às nav's e ao header
		if (document.getElementsByTagName('header').length >= 1){ 
			var scroll = $(window).scrollTop();
			
			if(scroll >= 10){
				$("nav").addClass("escuro");
			} else {
				$("nav").removeClass("escuro");
			}

			$(window).scroll(function(){
				var scroll = $(window).scrollTop();
				
				if(scroll >= 10){
					$("nav").addClass("escuro");
				} else {
					$("nav").removeClass("escuro");
				}
			});
		}	
	},
	pesquisa: function(){
		alert();
	},
	ajaxsubmit: function(){ // referente aos campos do formulário
		var campos = cttform.getElementsByTagName('input');
		var mensagem = cttform.getElementsByTagName('textarea')[0]; 
		
		var arrayvars = Array();
		for (i = 0; i < campos.length; i++){
			if (campos[i].type == 'submit' || campos[i].name == 'idade'){ continue;}
			arrayvars[arrayvars.length] = campos[i].name+'='+campos[i].value;
		}
		arrayvars[arrayvars.length] = mensagem.name+'='+mensagem.value; 
		
		var requestvars = arrayvars.join('&');
		
		var xmlHttp = (window.XMLHttpRequest)? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
		
		xmlHttp.onreadystatechange = function(){ 
  			if (xmlHttp.readyState == 4 && (xmlHttp.status == 200 || xmlHttp.status == 0)){ 
    			var resposta = xmlHttp.responseText;

				//if (resposta.indexOf('Erro') >= 0){ resposta = 'Obrigado pelo seu contacto!';}
				msg.innerHTML = resposta;
				
				if (resposta.indexOf('Erro') < 0){
					for (i = 0; i < campos.length; i++){
						if (campos[i].type == 'submit'){ continue;}
						campos[i].value = '';
					}
					mensagem.value = ''; 	
				}
    		}
  		}
		
		xmlHttp.open('POST', 'enviarmail.php', true); //Aqui tenho de implementar o caminhoEditor
		xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlHttp.send(requestvars);	
	}
}

site.init();
