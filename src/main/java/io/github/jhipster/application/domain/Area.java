package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * Task entity.
 * @author The JHipster team.
 */
@ApiModel(description = "Task entity. @author The JHipster team.")
@Entity
@Table(name = "area")
public class Area implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "idarea")
    private Long idarea;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @OneToMany(mappedBy = "area")
    @JsonIgnore
    private Set<Empleado> empleados = new HashSet<>();

    @ManyToOne
    private Horarios horarios;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdarea() {
        return idarea;
    }

    public Area idarea(Long idarea) {
        this.idarea = idarea;
        return this;
    }

    public void setIdarea(Long idarea) {
        this.idarea = idarea;
    }

    public String getNombre() {
        return nombre;
    }

    public Area nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Area descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Set<Empleado> getEmpleados() {
        return empleados;
    }

    public Area empleados(Set<Empleado> empleados) {
        this.empleados = empleados;
        return this;
    }

    public Area addEmpleado(Empleado empleado) {
        this.empleados.add(empleado);
        empleado.setArea(this);
        return this;
    }

    public Area removeEmpleado(Empleado empleado) {
        this.empleados.remove(empleado);
        empleado.setArea(null);
        return this;
    }

    public void setEmpleados(Set<Empleado> empleados) {
        this.empleados = empleados;
    }

    public Horarios getHorarios() {
        return horarios;
    }

    public Area horarios(Horarios horarios) {
        this.horarios = horarios;
        return this;
    }

    public void setHorarios(Horarios horarios) {
        this.horarios = horarios;
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
        Area area = (Area) o;
        if (area.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), area.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Area{" +
            "id=" + getId() +
            ", idarea=" + getIdarea() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
