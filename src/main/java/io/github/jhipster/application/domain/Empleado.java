package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * not an ignored comment
 */
@ApiModel(description = "not an ignored comment")
@Entity
@Table(name = "empleado")
public class Empleado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "idempleado")
    private Long idempleado;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "nacimiento")
    private String nacimiento;

    @Column(name = "documento")
    private String documento;

    @Column(name = "foto")
    private String foto;

    @Column(name = "direccion")
    private String direccion;

    @Column(name = "telefono")
    private String telefono;

    @OneToOne
    @JoinColumn(unique = true)
    private Usuario usuario;

    @OneToMany(mappedBy = "empleado")
    @JsonIgnore
    private Set<Asistencia> asistencias = new HashSet<>();

    @ManyToOne
    private Area area;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getIdempleado() {
        return idempleado;
    }

    public Empleado idempleado(Long idempleado) {
        this.idempleado = idempleado;
        return this;
    }

    public void setIdempleado(Long idempleado) {
        this.idempleado = idempleado;
    }

    public String getNombre() {
        return nombre;
    }

    public Empleado nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public Empleado apellido(String apellido) {
        this.apellido = apellido;
        return this;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getNacimiento() {
        return nacimiento;
    }

    public Empleado nacimiento(String nacimiento) {
        this.nacimiento = nacimiento;
        return this;
    }

    public void setNacimiento(String nacimiento) {
        this.nacimiento = nacimiento;
    }

    public String getDocumento() {
        return documento;
    }

    public Empleado documento(String documento) {
        this.documento = documento;
        return this;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getFoto() {
        return foto;
    }

    public Empleado foto(String foto) {
        this.foto = foto;
        return this;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getDireccion() {
        return direccion;
    }

    public Empleado direccion(String direccion) {
        this.direccion = direccion;
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public Empleado telefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Empleado usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Set<Asistencia> getAsistencias() {
        return asistencias;
    }

    public Empleado asistencias(Set<Asistencia> asistencias) {
        this.asistencias = asistencias;
        return this;
    }

    public Empleado addAsistencias(Asistencia asistencia) {
        this.asistencias.add(asistencia);
        asistencia.setEmpleado(this);
        return this;
    }

    public Empleado removeAsistencias(Asistencia asistencia) {
        this.asistencias.remove(asistencia);
        asistencia.setEmpleado(null);
        return this;
    }

    public void setAsistencias(Set<Asistencia> asistencias) {
        this.asistencias = asistencias;
    }

    public Area getArea() {
        return area;
    }

    public Empleado area(Area area) {
        this.area = area;
        return this;
    }

    public void setArea(Area area) {
        this.area = area;
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
        Empleado empleado = (Empleado) o;
        if (empleado.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), empleado.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Empleado{" +
            "id=" + getId() +
            ", idempleado=" + getIdempleado() +
            ", nombre='" + getNombre() + "'" +
            ", apellido='" + getApellido() + "'" +
            ", nacimiento='" + getNacimiento() + "'" +
            ", documento='" + getDocumento() + "'" +
            ", foto='" + getFoto() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", telefono='" + getTelefono() + "'" +
            "}";
    }
}
