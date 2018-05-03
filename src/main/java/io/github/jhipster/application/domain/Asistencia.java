package io.github.jhipster.application.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Asistencia.
 */
@Entity
@Table(name = "asistencia")
public class Asistencia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "idasistencia")
    private Long idasistencia;

    @Column(name = "fecharegistroinicial")
    private String fecharegistroinicial;

    @Column(name = "fecharegistrofinal")
    private String fecharegistrofinal;

    @Column(name = "enumtipo_asistencia")
    private String enumtipoAsistencia;

    @ManyToOne
    private Empleado empleado;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdasistencia() {
        return idasistencia;
    }

    public Asistencia idasistencia(Long idasistencia) {
        this.idasistencia = idasistencia;
        return this;
    }

    public void setIdasistencia(Long idasistencia) {
        this.idasistencia = idasistencia;
    }

    public String getFecharegistroinicial() {
        return fecharegistroinicial;
    }

    public Asistencia fecharegistroinicial(String fecharegistroinicial) {
        this.fecharegistroinicial = fecharegistroinicial;
        return this;
    }

    public void setFecharegistroinicial(String fecharegistroinicial) {
        this.fecharegistroinicial = fecharegistroinicial;
    }

    public String getFecharegistrofinal() {
        return fecharegistrofinal;
    }

    public Asistencia fecharegistrofinal(String fecharegistrofinal) {
        this.fecharegistrofinal = fecharegistrofinal;
        return this;
    }

    public void setFecharegistrofinal(String fecharegistrofinal) {
        this.fecharegistrofinal = fecharegistrofinal;
    }

    public String getEnumtipoAsistencia() {
        return enumtipoAsistencia;
    }

    public Asistencia enumtipoAsistencia(String enumtipoAsistencia) {
        this.enumtipoAsistencia = enumtipoAsistencia;
        return this;
    }

    public void setEnumtipoAsistencia(String enumtipoAsistencia) {
        this.enumtipoAsistencia = enumtipoAsistencia;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public Asistencia empleado(Empleado empleado) {
        this.empleado = empleado;
        return this;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
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
        Asistencia asistencia = (Asistencia) o;
        if (asistencia.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), asistencia.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Asistencia{" +
            "id=" + getId() +
            ", idasistencia=" + getIdasistencia() +
            ", fecharegistroinicial='" + getFecharegistroinicial() + "'" +
            ", fecharegistrofinal='" + getFecharegistrofinal() + "'" +
            ", enumtipoAsistencia='" + getEnumtipoAsistencia() + "'" +
            "}";
    }
}
