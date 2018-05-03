package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JHcontrolAsistenciaApp;

import io.github.jhipster.application.domain.Asistencia;
import io.github.jhipster.application.repository.AsistenciaRepository;
import io.github.jhipster.application.service.AsistenciaService;
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
 * Test class for the AsistenciaResource REST controller.
 *
 * @see AsistenciaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JHcontrolAsistenciaApp.class)
public class AsistenciaResourceIntTest {

    private static final Long DEFAULT_IDASISTENCIA = 1L;
    private static final Long UPDATED_IDASISTENCIA = 2L;

    private static final String DEFAULT_FECHAREGISTROINICIAL = "AAAAAAAAAA";
    private static final String UPDATED_FECHAREGISTROINICIAL = "BBBBBBBBBB";

    private static final String DEFAULT_FECHAREGISTROFINAL = "AAAAAAAAAA";
    private static final String UPDATED_FECHAREGISTROFINAL = "BBBBBBBBBB";

    private static final String DEFAULT_ENUMTIPO_ASISTENCIA = "AAAAAAAAAA";
    private static final String UPDATED_ENUMTIPO_ASISTENCIA = "BBBBBBBBBB";

    @Autowired
    private AsistenciaRepository asistenciaRepository;

    @Autowired
    private AsistenciaService asistenciaService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAsistenciaMockMvc;

    private Asistencia asistencia;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AsistenciaResource asistenciaResource = new AsistenciaResource(asistenciaService);
        this.restAsistenciaMockMvc = MockMvcBuilders.standaloneSetup(asistenciaResource)
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
    public static Asistencia createEntity(EntityManager em) {
        Asistencia asistencia = new Asistencia()
            .idasistencia(DEFAULT_IDASISTENCIA)
            .fecharegistroinicial(DEFAULT_FECHAREGISTROINICIAL)
            .fecharegistrofinal(DEFAULT_FECHAREGISTROFINAL)
            .enumtipoAsistencia(DEFAULT_ENUMTIPO_ASISTENCIA);
        return asistencia;
    }

    @Before
    public void initTest() {
        asistencia = createEntity(em);
    }

    @Test
    @Transactional
    public void createAsistencia() throws Exception {
        int databaseSizeBeforeCreate = asistenciaRepository.findAll().size();

        // Create the Asistencia
        restAsistenciaMockMvc.perform(post("/api/asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asistencia)))
            .andExpect(status().isCreated());

        // Validate the Asistencia in the database
        List<Asistencia> asistenciaList = asistenciaRepository.findAll();
        assertThat(asistenciaList).hasSize(databaseSizeBeforeCreate + 1);
        Asistencia testAsistencia = asistenciaList.get(asistenciaList.size() - 1);
        assertThat(testAsistencia.getIdasistencia()).isEqualTo(DEFAULT_IDASISTENCIA);
        assertThat(testAsistencia.getFecharegistroinicial()).isEqualTo(DEFAULT_FECHAREGISTROINICIAL);
        assertThat(testAsistencia.getFecharegistrofinal()).isEqualTo(DEFAULT_FECHAREGISTROFINAL);
        assertThat(testAsistencia.getEnumtipoAsistencia()).isEqualTo(DEFAULT_ENUMTIPO_ASISTENCIA);
    }

    @Test
    @Transactional
    public void createAsistenciaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = asistenciaRepository.findAll().size();

        // Create the Asistencia with an existing ID
        asistencia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAsistenciaMockMvc.perform(post("/api/asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asistencia)))
            .andExpect(status().isBadRequest());

        // Validate the Asistencia in the database
        List<Asistencia> asistenciaList = asistenciaRepository.findAll();
        assertThat(asistenciaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAsistencias() throws Exception {
        // Initialize the database
        asistenciaRepository.saveAndFlush(asistencia);

        // Get all the asistenciaList
        restAsistenciaMockMvc.perform(get("/api/asistencias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(asistencia.getId().intValue())))
            .andExpect(jsonPath("$.[*].idasistencia").value(hasItem(DEFAULT_IDASISTENCIA.intValue())))
            .andExpect(jsonPath("$.[*].fecharegistroinicial").value(hasItem(DEFAULT_FECHAREGISTROINICIAL.toString())))
            .andExpect(jsonPath("$.[*].fecharegistrofinal").value(hasItem(DEFAULT_FECHAREGISTROFINAL.toString())))
            .andExpect(jsonPath("$.[*].enumtipoAsistencia").value(hasItem(DEFAULT_ENUMTIPO_ASISTENCIA.toString())));
    }

    @Test
    @Transactional
    public void getAsistencia() throws Exception {
        // Initialize the database
        asistenciaRepository.saveAndFlush(asistencia);

        // Get the asistencia
        restAsistenciaMockMvc.perform(get("/api/asistencias/{id}", asistencia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(asistencia.getId().intValue()))
            .andExpect(jsonPath("$.idasistencia").value(DEFAULT_IDASISTENCIA.intValue()))
            .andExpect(jsonPath("$.fecharegistroinicial").value(DEFAULT_FECHAREGISTROINICIAL.toString()))
            .andExpect(jsonPath("$.fecharegistrofinal").value(DEFAULT_FECHAREGISTROFINAL.toString()))
            .andExpect(jsonPath("$.enumtipoAsistencia").value(DEFAULT_ENUMTIPO_ASISTENCIA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAsistencia() throws Exception {
        // Get the asistencia
        restAsistenciaMockMvc.perform(get("/api/asistencias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAsistencia() throws Exception {
        // Initialize the database
        asistenciaService.save(asistencia);

        int databaseSizeBeforeUpdate = asistenciaRepository.findAll().size();

        // Update the asistencia
        Asistencia updatedAsistencia = asistenciaRepository.findOne(asistencia.getId());
        // Disconnect from session so that the updates on updatedAsistencia are not directly saved in db
        em.detach(updatedAsistencia);
        updatedAsistencia
            .idasistencia(UPDATED_IDASISTENCIA)
            .fecharegistroinicial(UPDATED_FECHAREGISTROINICIAL)
            .fecharegistrofinal(UPDATED_FECHAREGISTROFINAL)
            .enumtipoAsistencia(UPDATED_ENUMTIPO_ASISTENCIA);

        restAsistenciaMockMvc.perform(put("/api/asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAsistencia)))
            .andExpect(status().isOk());

        // Validate the Asistencia in the database
        List<Asistencia> asistenciaList = asistenciaRepository.findAll();
        assertThat(asistenciaList).hasSize(databaseSizeBeforeUpdate);
        Asistencia testAsistencia = asistenciaList.get(asistenciaList.size() - 1);
        assertThat(testAsistencia.getIdasistencia()).isEqualTo(UPDATED_IDASISTENCIA);
        assertThat(testAsistencia.getFecharegistroinicial()).isEqualTo(UPDATED_FECHAREGISTROINICIAL);
        assertThat(testAsistencia.getFecharegistrofinal()).isEqualTo(UPDATED_FECHAREGISTROFINAL);
        assertThat(testAsistencia.getEnumtipoAsistencia()).isEqualTo(UPDATED_ENUMTIPO_ASISTENCIA);
    }

    @Test
    @Transactional
    public void updateNonExistingAsistencia() throws Exception {
        int databaseSizeBeforeUpdate = asistenciaRepository.findAll().size();

        // Create the Asistencia

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAsistenciaMockMvc.perform(put("/api/asistencias")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(asistencia)))
            .andExpect(status().isCreated());

        // Validate the Asistencia in the database
        List<Asistencia> asistenciaList = asistenciaRepository.findAll();
        assertThat(asistenciaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAsistencia() throws Exception {
        // Initialize the database
        asistenciaService.save(asistencia);

        int databaseSizeBeforeDelete = asistenciaRepository.findAll().size();

        // Get the asistencia
        restAsistenciaMockMvc.perform(delete("/api/asistencias/{id}", asistencia.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Asistencia> asistenciaList = asistenciaRepository.findAll();
        assertThat(asistenciaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Asistencia.class);
        Asistencia asistencia1 = new Asistencia();
        asistencia1.setId(1L);
        Asistencia asistencia2 = new Asistencia();
        asistencia2.setId(asistencia1.getId());
        assertThat(asistencia1).isEqualTo(asistencia2);
        asistencia2.setId(2L);
        assertThat(asistencia1).isNotEqualTo(asistencia2);
        asistencia1.setId(null);
        assertThat(asistencia1).isNotEqualTo(asistencia2);
    }
}
