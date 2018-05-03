package io.github.jhipster.application.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "idusuario")
    private Long idusuario;

    @Column(name = "username")
    private String username;

    @Column(name = "jhi_password")
    private String password;

    @ManyToMany
    @JoinTable(name = "usuario_rol",
               joinColumns = @JoinColumn(name="usuarios_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="rols_id", referencedColumnName="id"))
    private Set<Rol> rols = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdusuario() {
        return idusuario;
    }

    public Usuario idusuario(Long idusuario) {
        this.idusuario = idusuario;
        return this;
    }

    public void setIdusuario(Long idusuario) {
        this.idusuario = idusuario;
    }

    public String getUsername() {
        return username;
    }

    public Usuario username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public Usuario password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Rol> getRols() {
        return rols;
    }

    public Usuario rols(Set<Rol> rols) {
        this.rols = rols;
        return this;
    }

    public Usuario addRol(Rol rol) {
        this.rols.add(rol);
        return this;
    }

    public Usuario removeRol(Rol rol) {
        this.rols.remove(rol);
        return this;
    }

    public void setRols(Set<Rol> rols) {
        this.rols = rols;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Usuario usuario = (Usuario) o;
        if (usuario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usuario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            ", idusuario=" + getIdusuario() +
            ", username='" + getUsername() + "'" +
            ", password='" + getPassword() + "'" +
            "}";
    }
}
