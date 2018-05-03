package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Rol;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Rol entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {

}
