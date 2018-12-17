<?php
	include "dades.php";
	$_SESSION['pag'] = $pag;

	function connectaBD() {
		global $serverBD;
		global $usuBD;
		global $pwBD;
		global $nomBD;
		
		$conexio = new mysqli($serverBD, $usuBD, $pwBD, $nomBD);
		if ($conexio->connect_errno)
			return false;
		else {
			$conexio->query("SET NAMES 'utf8'");
			return $conexio;
		}
	}
	function llistaEmpleats() {
		$conexio = connectaBD();

		$pag = $_SESSION['pag'];
		
		$lasql = "select e.codi, e.nom, e.funcio, d.nom as departament, e.sou, if(e.comisio is null, 0, e.comisio) as comisio from empleats e inner join departaments d on e.ndepartament=d.codi limit ".(($pag-1)*10).", 10";
		//return $lasql;
		$elJSON = array();
		$index = 0;
		$consulta = $conexio->query($lasql);
		while ($reg = $consulta->fetch_array()) {
			$elJSON[$index]['codi'] = $reg['codi'];
			$elJSON[$index]['nom'] = $reg['nom'];
			$elJSON[$index]['funcio'] = $reg['funcio'];
			$elJSON[$index]['departament'] = $reg['departament'];
			$elJSON[$index]['sou'] = $reg['sou'];
			$elJSON[$index]['comisio'] = $reg['comisio'];
			$index++;
		}
		return json_encode($elJSON);

	}
	function generaPaginacio() {
		$conexio = connectaBD();
		$lasql = "select count(*) as Numemp from empleats";
		global $pag;
		
		$consulta = $conexio->query($lasql);
		$reg = $consulta->fetch_array();
		return ceil($reg['Numemp'] / 10);
	}
	function llistaDepartaments() {
		$conexio = connectaBD();
		$consulta = $conexio->query("select codi, nom from departaments");
		$elJSON = array();
		$index = 0;

		while ($reg = $consulta->fetch_array()) {
			$elJSON[$index]['codi'] = $reg['codi'];
			$elJSON[$index]['nom'] = $reg['nom'];
			$index++;
		}
		return json_encode($elJSON);
	}
	function afegirempleat($elJSON){
		
		$jsonArray = json_decode($elJSON, true);
		extract($jsonArray);
		$lasql = "insert into empleats(codi, nom, funcio, datacontracte, sou, ndepartament) values (?, ?, ?, ?, ?, ?)";
		
		$conexio=connectaBD();
		$consulta = $conexio->prepare($lasql);
		$consulta->bind_param("issdii", $codi, $nom, $funcio, $datac, $sou, $depart);
		if ($consulta->execute())
			return "1";
		else 
			return "0";
	}	
?>