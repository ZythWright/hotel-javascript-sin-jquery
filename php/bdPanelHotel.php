<?php
include "bd.php";

class bdPanelHotel extends bd {
    public function __construct($server="localhost", $usu="root", $pw="root", $nombd="dbHotel") {
		parent::__construct($server, $usu, $pw, $nombd);
	}
	public function __destruct() {
		parent::__destruct();
    }
    public function llistaReservesBD($inputDate) {
		$inputDate = date('Y-m-d', strtotime($inputDate));
		$elJSON = array();
		$final = array();
		$index = 0;

		$lasql = "SELECT * FROM booking INNER JOIN room ON room.id_room = booking.id_room";
		
		if($consulta = $conexio->query($lasql)){
			while ($reg = $consulta->fetch_array()) {
				$ini = date('Y-m-d', strtotime($reg['fecha_ini']));
				$end = date('Y-m-d', strtotime($reg['fecha_final']));
				if($inputDate >= $ini && $inputDate <= $end){
					$elJSON[$index]['id_booking'] = $reg['id_booking'];
					$elJSON[$index]['nameof'] = $reg['nameof'];
					$elJSON[$index]['type_booking'] = $reg['type_booking'];
					$elJSON[$index]['estat'] = $reg['estat'];
					$elJSON[$index]['fecha_ini'] = $reg['fecha_ini'];
					$elJSON[$index]['fecha_final'] = $reg['fecha_final'];
					$elJSON[$index]['type_room'] = $reg['type_room'];
					$elJSON[$index]['id_user'] = $reg['id_user'];
					$elJSON[$index]['id_room'] = $reg['id_room'];
					$index++;
				}
			}
			$status = true;
		} else 
			$status = false;
		
		$final['booking'] = $elJSON;
		$final['status'] = $status;
		return json_encode($final);
		// return false;
	}

	public function llistarReservesInfoBD($id_booking_selected){
		$elJSON = array();
		$final = array();
		$index = 0;
		//$conexio = connectaBD();

		$lasql = "SELECT * FROM booking 
		INNER JOIN room ON room.id_room = booking.id_room 
		INNER JOIN customer ON customer.id_customer = booking.id_customer 
		WHERE id_booking = ".$id_booking_selected;
		
		if($consulta = $this->conexio->query($lasql)){
			while ($reg = $consulta->fetch_array()) {
				$elJSON[$index]['id_booking'] = $reg['id_booking'];
				$elJSON[$index]['nameof'] = $reg['nameof'];
				$elJSON[$index]['num_people'] = $reg['num_people'];
				$elJSON[$index]['type_booking'] = $reg['type_booking'];
				$elJSON[$index]['estat'] = $reg['estat'];
				$elJSON[$index]['fecha_ini'] = $reg['fecha_ini'];
				$elJSON[$index]['fecha_final'] = $reg['fecha_final'];
				$elJSON[$index]['type_room'] = $reg['type_room'];
				$elJSON[$index]['id_user'] = $reg['id_user'];
				$elJSON[$index]['id_room'] = $reg['id_room'];
				$elJSON[$index]['id_customer'] = $reg['id_customer'];
				$elJSON[$index]['name_customer'] = $reg['name_customer'];
				$elJSON[$index]['surname_customer'] = $reg['surname_customer'];
				$elJSON[$index]['dni'] = $reg['dni'];
				$elJSON[$index]['nationality'] = $reg['nationality'];
				$index++;
			}
			$status = true;
		} else 
			$status = false;
		
		$final['booking'] = $elJSON;
		$final['status'] = $status;
		return json_encode($final);
	}

	public function eliminarBookingBD($id_booking_selected){
		$final = array();

		$lasql = "DELETE FROM booking WHERE id_booking = ".$id_booking_selected;

		if($this->conexio->query($lasql))
			$status = "true";
		else
			$status = "false";

		$final['status'] = $status;
		return json_encode($final);
	}

	public function changeStateBookingBD($id_booking_selected){
		$final = array();
		//$conexio = connectaBD();

		$lasql = "UPDATE booking SET estat = 'ocupat' WHERE id_booking = ".$id_booking_selected;

		if($consulta = $this->conexio->query($lasql))
			$status = true;
		else
			$status = false;

		$final['status'] = $status;
		return json_encode($final);
	}
	
}
?>