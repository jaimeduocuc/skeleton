import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BBDDasistenciaService {
  private apiUrl = environment.backendUrl;

  constructor(private http: HttpClient) {}

  getProfesorData() {
    return this.http.get(`${this.apiUrl}/obtenerProfesor`);
  }

  getAlumnolData() {
    return this.http.get(`${this.apiUrl}/obtenerAlumnos`);
  }

  getSeccionData() {
    return this.http.get(`${this.apiUrl}/obtenerSecciones`);
  }

  getAlumnoSeccionData() {
    return this.http.get(`${this.apiUrl}/obtenerAlumnoSeccion`);
  }

  getListaData() {
    return this.http.get(`${this.apiUrl}/obtenerLista`);
  }

  getProfesor_SeccionData() {
    return this.http.get(`${this.apiUrl}/obtenerProfesor_Seccion`);
  }

  obtenerSeccionesPorProfesor(professorId: any) {
    return this.http.get(
      `${this.apiUrl}/obtenerSeccionesPorProfesor?idProfesor=${professorId}`
    );
  }

  obtenerSeccionesPorAlumno(alummnoId: any) {
    return this.http.get(
      `${this.apiUrl}/obtenerSeccionesPorAlumno?idAlumno=${alummnoId}`
    );
  }

  obtenerAlumnosAsistencia() {
    return this.http.get(`${this.apiUrl}/obtenerAlumnosAsistencia?`);
  }
}
