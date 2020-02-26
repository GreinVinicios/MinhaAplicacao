vCadastroUsuarios.directive("uiAlert", function () {
	return {
		templateUrl: "view/alert.html", //especifica onde fica a url
		replace: true,					//retira a div da declaração da diretiva deixando só o do template
		restrict: "AE",					//Restringe o modo de utilização. A=Atributo E=Elemento
		scope: {						//Faz a mediação entre a passgem dos parâmetros de um scope para outro
			title: "@"					//@ diz ao scope da diretiva qual o nome do atributo do scope externo
		},
		transclude: true				//Encapsula elementos dentro da diretiva, criando scope não isolado
										//Pega o texto de dentro da div a qual acionou a diretiva e mostra nela
										//Faz com que o scope dele herde todas as propriedades do scope original
	};
});