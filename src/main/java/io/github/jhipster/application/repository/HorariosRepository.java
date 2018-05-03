package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Horarios;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Horarios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HorariosRepository extends JpaRepository<Horarios, Long> {

}
