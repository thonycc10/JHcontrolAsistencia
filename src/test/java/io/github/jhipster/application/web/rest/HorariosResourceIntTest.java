package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JHcontrolAsistenciaApp;

import io.github.jhipster.application.domain.Horarios;
import io.github.jhipster.application.repository.HorariosRepository;
import io.github.jhipster.application.service.HorariosService;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HorariosResource REST controller.
 *
 * @see HorariosResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JHcontrolAsistenciaApp.class)
public class HorariosResourceIntTest {

    private static final Long DEFAULT_IDHORARIOS = 1L;
    private static final Long UPDATED_IDHORARIOS = 2L;

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_FECHAINICIO = "AAAAAAAAAA";
    private static final String UPDATED_FECHAINICIO = "BBBBBBBBBB";

    private static final String DEFAULT_FECHAFINAL = "AAAAAAAAAA";
    private static final String UPDATED_FECHAFINAL = "BBBBBBBBBB";

    private static final String DEFAULT_HORARIOINICIAL = "AAAAAAAAAA";
    private static final String UPDATED_HORARIOINICIAL = "BBBBBBBBBB";

    private static final String DEFAULT_HORARIOFINAL = "AAAAAAAAAA";
    private static final String UPDATED_HORARIOFINAL = "BBBBBBBBBB";

    @Autowired
    private HorariosRepository horariosRepository;

    @Autowired
    private HorariosService horariosService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHorariosMockMvc;

    private Horarios horarios;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HorariosResource horariosResource = new HorariosResource(horariosService);
        this.restHorariosMockMvc = MockMvcBuilders.standaloneSetup(horariosResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Horarios createEntity(EntityManager em) {
        Horarios horarios = new Horarios()
            .idhorarios(DEFAULT_IDHORARIOS)
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION)
            .fechainicio(DEFAULT_FECHAINICIO)
            .fechafinal(DEFAULT_FECHAFINAL)
            .horarioinicial(DEFAULT_HORARIOINICIAL)
            .horariofinal(DEFAULT_HORARIOFINAL);
        return horarios;
    }

    @Before
    public void initTest() {
        horarios = createEntity(em);
    }

    @Test
    @Transactional
    public void createHorarios() throws Exception {
        int databaseSizeBeforeCreate = horariosRepository.findAll().size();

        // Create the Horarios
        restHorariosMockMvc.perform(post("/api/horarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horarios)))
            .andExpect(status().isCreated());

        // Validate the Horarios in the database
        List<Horarios> horariosList = horariosRepository.findAll();
        assertThat(horariosList).hasSize(databaseSizeBeforeCreate + 1);
        Horarios testHorarios = horariosList.get(horariosList.size() - 1);
        assertThat(testHorarios.getIdhorarios()).isEqualTo(DEFAULT_IDHORARIOS);
        assertThat(testHorarios.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testHorarios.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testHorarios.getFechainicio()).isEqualTo(DEFAULT_FECHAINICIO);
        assertThat(testHorarios.getFechafinal()).isEqualTo(DEFAULT_FECHAFINAL);
        assertThat(testHorarios.getHorarioinicial()).isEqualTo(DEFAULT_HORARIOINICIAL);
        assertThat(testHorarios.getHorariofinal()).isEqualTo(DEFAULT_HORARIOFINAL);
    }

    @Test
    @Transactional
    public void createHorariosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = horariosRepository.findAll().size();

        // Create the Horarios with an existing ID
        horarios.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHorariosMockMvc.perform(post("/api/horarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horarios)))
            .andExpect(status().isBadRequest());

        // Validate the Horarios in the database
        List<Horarios> horariosList = horariosRepository.findAll();
        assertThat(horariosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHorarios() throws Exception {
        // Initialize the database
        horariosRepository.saveAndFlush(horarios);

        // Get all the horariosList
        restHorariosMockMvc.perform(get("/api/horarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(horarios.getId().intValue())))
            .andExpect(jsonPath("$.[*].idhorarios").value(hasItem(DEFAULT_IDHORARIOS.intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())))
            .andExpect(jsonPath("$.[*].fechainicio").value(hasItem(DEFAULT_FECHAINICIO.toString())))
            .andExpect(jsonPath("$.[*].fechafinal").value(hasItem(DEFAULT_FECHAFINAL.toString())))
            .andExpect(jsonPath("$.[*].horarioinicial").value(hasItem(DEFAULT_HORARIOINICIAL.toString())))
            .andExpect(jsonPath("$.[*].horariofinal").value(hasItem(DEFAULT_HORARIOFINAL.toString())));
    }

    @Test
    @Transactional
    public void getHorarios() throws Exception {
        // Initialize the database
        horariosRepository.saveAndFlush(horarios);

        // Get the horarios
        restHorariosMockMvc.perform(get("/api/horarios/{id}", horarios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(horarios.getId().intValue()))
            .andExpect(jsonPath("$.idhorarios").value(DEFAULT_IDHORARIOS.intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()))
            .andExpect(jsonPath("$.fechainicio").value(DEFAULT_FECHAINICIO.toString()))
            .andExpect(jsonPath("$.fechafinal").value(DEFAULT_FECHAFINAL.toString()))
            .andExpect(jsonPath("$.horarioinicial").value(DEFAULT_HORARIOINICIAL.toString()))
            .andExpect(jsonPath("$.horariofinal").value(DEFAULT_HORARIOFINAL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHorarios() throws Exception {
        // Get the horarios
        restHorariosMockMvc.perform(get("/api/horarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHorarios() throws Exception {
        // Initialize the database
        horariosService.save(horarios);

        int databaseSizeBeforeUpdate = horariosRepository.findAll().size();

        // Update the horarios
        Horarios updatedHorarios = horariosRepository.findOne(horarios.getId());
        // Disconnect from session so that the updates on updatedHorarios are not directly saved in db
        em.detach(updatedHorarios);
        updatedHorarios
            .idhorarios(UPDATED_IDHORARIOS)
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .fechainicio(UPDATED_FECHAINICIO)
            .fechafinal(UPDATED_FECHAFINAL)
            .horarioinicial(UPDATED_HORARIOINICIAL)
            .horariofinal(UPDATED_HORARIOFINAL);

        restHorariosMockMvc.perform(put("/api/horarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHorarios)))
            .andExpect(status().isOk());

        // Validate the Horarios in the database
        List<Horarios> horariosList = horariosRepository.findAll();
        assertThat(horariosList).hasSize(databaseSizeBeforeUpdate);
        Horarios testHorarios = horariosList.get(horariosList.size() - 1);
        assertThat(testHorarios.getIdhorarios()).isEqualTo(UPDATED_IDHORARIOS);
        assertThat(testHorarios.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testHorarios.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testHorarios.getFechainicio()).isEqualTo(UPDATED_FECHAINICIO);
        assertThat(testHorarios.getFechafinal()).isEqualTo(UPDATED_FECHAFINAL);
        assertThat(testHorarios.getHorarioinicial()).isEqualTo(UPDATED_HORARIOINICIAL);
        assertThat(testHorarios.getHorariofinal()).isEqualTo(UPDATED_HORARIOFINAL);
    }

    @Test
    @Transactional
    public void updateNonExistingHorarios() throws Exception {
        int databaseSizeBeforeUpdate = horariosRepository.findAll().size();

        // Create the Horarios

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restHorariosMockMvc.perform(put("/api/horarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(horarios)))
            .andExpect(status().isCreated());

        // Validate the Horarios in the database
        List<Horarios> horariosList = horariosRepository.findAll();
        assertThat(horariosList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteHorarios() throws Exception {
        // Initialize the database
        horariosService.save(horarios);

        int databaseSizeBeforeDelete = horariosRepository.findAll().size();

        // Get the horarios
        restHorariosMockMvc.perform(delete("/api/horarios/{id}", horarios.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Horarios> horariosList = horariosRepository.findAll();
        assertThat(horariosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Horarios.class);
        Horarios horarios1 = new Horarios();
        horarios1.setId(1L);
        Horarios horarios2 = new Horarios();
        horarios2.setId(horarios1.getId());
        assertThat(horarios1).isEqualTo(horarios2);
        horarios2.setId(2L);
        assertThat(horarios1).isNotEqualTo(horarios2);
        horarios1.setId(null);
        assertThat(horarios1).isNotEqualTo(horarios2);
    }
}
