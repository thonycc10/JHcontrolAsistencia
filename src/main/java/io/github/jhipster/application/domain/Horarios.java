package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Horarios.
 */
@Entity
@Table(name = "horarios")
public class Horarios implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "idhorarios")
    private Long idhorarios;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "fechainicio")
    private String fechainicio;

    @Column(name = "fechafinal")
    private String fechafinal;

    @Column(name = "horarioinicial")
    private String horarioinicial;

    @Column(name = "horariofinal")
    private String horariofinal;

    @OneToMany(mappedBy = "horarios")
    @JsonIgnore
    private Set<Area> areas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdhorarios() {
        return idhorarios;
    }

    public Horarios idhorarios(Long idhorarios) {
        this.idhorarios = idhorarios;
        return this;
    }

    public void setIdhorarios(Long idhorarios) {
        this.idhorarios = idhorarios;
    }

    public String getNombre() {
        return nombre;
    }

    public Horarios nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Horarios descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getFechainicio() {
        return fechainicio;
    }

    public Horarios fechainicio(String fechainicio) {
        this.fechainicio = fechainicio;
        return this;
    }

    public void setFechainicio(String fechainicio) {
        this.fechainicio = fechainicio;
    }

    public String getFechafinal() {
        return fechafinal;
    }

    public Horarios fechafinal(String fechafinal) {
        this.fechafinal = fechafinal;
        return this;
    }

    public void setFechafinal(String fechafinal) {
        this.fechafinal = fechafinal;
    }

    public String getHorarioinicial() {
        return horarioinicial;
    }

    public Horarios horarioinicial(String horarioinicial) {
        this.horarioinicial = horarioinicial;
        return this;
    }

    public void setHorarioinicial(String horarioinicial) {
        this.horarioinicial = horarioinicial;
    }

    public String getHorariofinal() {
        return horariofinal;
    }

    public Horarios horariofinal(String horariofinal) {
        this.horariofinal = horariofinal;
        return this;
    }

    public void setHorariofinal(String horariofinal) {
        this.horariofinal = horariofinal;
    }

    public Set<Area> getAreas() {
        return areas;
    }

    public Horarios areas(Set<Area> areas) {
        this.areas = areas;
        return this;
    }

    public Horarios addArea(Area area) {
        this.areas.add(area);
        area.setHorarios(this);
        return this;
    }

    public Horarios removeArea(Area area) {
        this.areas.remove(area);
        area.setHorarios(null);
        return this;
    }

    public void setAreas(Set<Area> areas) {
        this.areas = areas;
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
        Horarios horarios = (Horarios) o;
        if (horarios.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), horarios.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Horarios{" +
            "id=" + getId() +
            ", idhorarios=" + getIdhorarios() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", fechainicio='" + getFechainicio() + "'" +
            ", fechafinal='" + getFechafinal() + "'" +
            ", horarioinicial='" + getHorarioinicial() + "'" +
            ", horariofinal='" + getHorariofinal() + "'" +
            "}";
    }
}
