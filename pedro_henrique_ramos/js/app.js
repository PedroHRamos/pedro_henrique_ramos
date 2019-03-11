$(document).ready(function(){
	$("#cep").mask("00000-000")
	$("#renda").mask("999.999.990,00", {reverse:true})

	$("#div_info").hide();

	$("#formulario").submit(function (e){
		e.preventDefault();	//impede a pagina de recarregar
		if(validaFormulario()){
			processaDados();
		}
	});

	$("#nova_pesquisa").on("click", function(){
		$("#div_formulario").show();
		$("#nome").val(""),
		$("#cep").val(""),
		$("#renda").val(""),
		$("#dependentes").val("")
		$("#div_info").hide();

	});

});

function validaFormulario(){
	if($("#cep").val() == ""){
		alert("Por favor, preencha o CEP.");
		$("#cep").focus();
		return false;

	}
	
	if($("#renda").val() == ""){
		alert("Por favor, preencha sua renda.");
		$("#renda").focus();
		return false;

	}
	
	if($("#dependentes").val() == ""){
		alert("Por favor, preencha a quantidade de dependentes.");
		$("#dependentes").focus();
		return false;

	}

	return true;
}

function processaDados(){
	$.ajax({
		type:"GET",
		url:"http://viacep.com.br/ws/" + $("#cep").val() + "/json/",
		async: false
		
	}).then(sucesso, falha);

	function sucesso(data){
		$("#logradouro").val(data["logradouro"]);
		$("#bairro").val(data["bairro"]);
		$("#cidade").val(data["localidade"]);
		$("#estado").val(data["uf"]);

		$.ajax({
			type: "post",
			url: "php/back_end.php",
			async: false,
			data: {
				nome: $("#nome").val(),
				cep: $("#cep").val(),
				renda: $("#renda").val(),
				dependentes: $("#dependentes").val(),
			}
		}).then(sucesso, falha);

		function sucesso(data){
			$("#div_formulario").hide();
			$("#div_info").show();

			var retorno =  $.parseJSON(data);
			if(retorno.nome == "")
				retorno.nome = "Usuário";

			$("#resposta_nome").html(retorno.nome + $("#resposta_nome").text());
			$("#renda_per_capita").val(retorno.renda_capita);
			
		}

		function falha(){
			alert("Erro na requisição. Tente novamente mais tarde.");
		}
		
	}		
		
	function falha(){
		alert("Erro na requisição. Preencha seu CEP corretamente");
	}

}