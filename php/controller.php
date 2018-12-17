<?php
	session_start();

	include "funcions.php";
	if (isset($_POST['accio'])) {
		$accio = $_POST['accio'];

		switch ($accio) {
			case "llista" : echo llistaEmpleats();
				            break;
			case "paginacio" : echo generaPaginacio();
							break;
			case "llistadep" : echo llistaDepartaments();
							break;
			case "afegir" : echo afegirEmpleat($_POST['dades']);
							break;
							
			
		}
	}
	
?>