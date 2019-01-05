-- MySQL Workbench Forward Engineering 
/*  TONI TORRES & ALDO MENENDEZ */

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema dbHotel
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `dbHotel` ;

-- -----------------------------------------------------
-- Schema dbHotel
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbHotel` DEFAULT CHARACTER SET utf8 ;
USE `dbHotel` ;

-- -----------------------------------------------------
-- Table `dbHotel`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbHotel`.`user` ;

CREATE TABLE IF NOT EXISTS `dbHotel`.`user` (
  `id_user` INT(11) NOT NULL AUTO_INCREMENT,
  `name` TEXT NULL DEFAULT NULL,
  `email` TEXT NULL DEFAULT NULL,
  `password` VARCHAR(25) NULL DEFAULT NULL,
  `role` ENUM('user', 'admin') NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `dbHotel`.`customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbHotel`.`customer` ;

CREATE TABLE IF NOT EXISTS `dbHotel`.`customer` (
  `id_customer` INT(11) NOT NULL AUTO_INCREMENT,
  `name_customer` TEXT NULL DEFAULT NULL,
  `surname_customer` TEXT NULL DEFAULT NULL,
  `dni` VARCHAR(9) NULL DEFAULT NULL,
  `nationality` VARCHAR(25) NULL DEFAULT NULL,
  PRIMARY KEY (`id_customer`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dbHotel`.`room`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbHotel`.`room` ;

CREATE TABLE IF NOT EXISTS `dbHotel`.`room` (
  `id_room` INT(11) NOT NULL AUTO_INCREMENT,
  `type_room` ENUM('individual', 'doble', 'triple') NULL DEFAULT NULL,
  PRIMARY KEY (`id_room`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `dbHotel`.`booking`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbHotel`.`booking` ;

CREATE TABLE IF NOT EXISTS `dbHotel`.`booking` (
  `id_booking` INT(11) NOT NULL AUTO_INCREMENT,
  `nameof` TEXT NULL DEFAULT NULL,
  `type_booking` ENUM('dormir','semi', 'completa') NULL DEFAULT NULL,
  `estat` ENUM('reservat', 'ocupat','lliure') NULL DEFAULT NULL,
  `fecha_ini` DATE NULL DEFAULT NULL,
  `fecha_final` DATE NULL DEFAULT NULL,
  `num_people` INT(11) NULL DEFAULT NULL,
  `id_user` INT(11) NULL DEFAULT NULL,
  `id_room` INT(11) NULL DEFAULT NULL,
  `id_customer` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id_booking`),
  INDEX `id_user` (`id_user` ASC),
  INDEX `id_room` (`id_room` ASC),
  INDEX `id_customer` (`id_customer` ASC),
  CONSTRAINT `booking_ibfk_1`
    FOREIGN KEY (`id_user`)
    REFERENCES `dbHotel`.`user` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `booking_ibfk_2`
    FOREIGN KEY (`id_room`)
    REFERENCES `dbHotel`.`room` (`id_room`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `booking_ibfk_3`
    FOREIGN KEY (`id_customer`)
    REFERENCES `dbHotel`.`customer` (`id_customer`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
