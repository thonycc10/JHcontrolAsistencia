package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Usuario;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Usuario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    @Query("select distinct usuario from Usuario usuario left join fetch usuario.rols")
    List<Usuario> findAllWithEagerRelationships();

    @Query("select usuario from Usuario usuario left join fetch usuario.rols where usuario.id =:id")
    Usuario findOneWithEagerRelationships(@Param("id") Long id);

}
