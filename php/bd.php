<?php
class bd {
	protected $conexio;
	public function __construct($server, $usu, $pw, $bd) {
		$this->conexio = new mysqli($server, $usu, $pw, $bd);
		$this->conexio->query("SET NAMES 'utf8'");	
	}
	public function __destruct() {
		$this->conexio->close();
	}
}
?>