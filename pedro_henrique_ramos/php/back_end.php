<?php
	if(isset($_POST)){
		//Tratamentos realizados com post
		//O retornado entra no objeto, na posicao marcada igual embaixo
		//Quando voltar pra outra pagina, usar atraves do data
		$objeto["nome"] = $_POST['nome'];
		$objeto["cep"] = $_POST['cep'];
		$objeto["renda"] = $_POST['renda'];
		$objeto["dependentes"] = $_POST['dependentes'];

		$renda = formata($_POST['renda']);
		$resultado = floatval($renda) / (intval($_POST['dependentes'])+1);

		$objeto["renda_capita"] = $resultado;

		echo json_encode($objeto);
	}

	function formata($valor){
		$pontos = '.';
		$virgula = ',';
		$result = str_replace($pontos, "", $valor);
		$result2 = str_replace($virgula, ".", $result);
		return $result2;
	}

?>