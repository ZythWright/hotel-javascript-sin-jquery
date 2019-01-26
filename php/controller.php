<?php
	session_start();

	include "funcions.php";
	if (isset($_POST['accio'])) {
		$accio = $_POST['accio'];

		switch ($accio) {
            case "llistaReserva" : print_r(llistaReserves($_POST['inputDate']));
				break;
			case "llistaReservaInfo" : echo llistaReservesInfo($_POST['id_booking_selected']);
				break;
			case "eliminarBooking" : echo eliminarBooking($_POST['id_booking_selected']);
				break;	
			case "changeStateBooking" : echo changeStateBooking($_POST['id_booking_selected']);
				break;
			case "addBooking" : echo addBooking($_POST['dades']);
				break;
			case "actualizarBooking" : echo updateBooking($_POST['dades']);
				break;
		}
	}
	
?>