package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Empleado;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Empleado entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

}
