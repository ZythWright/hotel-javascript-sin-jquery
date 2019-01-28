<?php
	/*	TONI TORRES & ALDO MENENDEZ	*/
	include "dades.php";
	include "bdPanelHotel.php";
    
    function llistaReserves($inputDate) {
		$bdPanel = new bdPanelHotel();
		$data = $bdPanel->llistaReservesBD($inputDate);
		return $data;
	}

	function llistaReservesInfo($id_booking_selected) {
		$bdPanel = new bdPanelHotel();
		$data = $bdPanel->llistarReservesInfoBD($id_booking_selected);
		return $data;
	}

	function eliminarBooking($id_booking_selected){
		$bdPanel = new bdPanelHotel();
		$data = $bdPanel->eliminarBookingBD($id_booking_selected);
		return $data;
	}

	function changeStateBooking($id_booking_selected){
		$bdPanel = new bdPanelHotel();
		$data = $bdPanel->changeStateBookingBD($id_booking_selected);
		return $data;
	}

	function addBooking($elJSON){
		$bdPanel = new bdPanelHotel();
		$data = $bdPanel->addBookingBD($elJSON);
		return $data;
	}

	function updateBooking($elJSON){
		$bdPanel = new bdPanelHotel();
		$data = $bdPanel->updateBookingBD($elJSON);
		return $data;
	}


?>