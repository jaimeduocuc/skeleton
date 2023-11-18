import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { BBDDasistenciaService } from '../bbddasistencia.service';
import { FormBuilder } from '@angular/forms';
import * as qrcode from 'qrcode';
import { keysToUpperCase } from '../utils/keysToUpperCase';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {
  qrCodeData: string = 'Datos del código QR dinámico';
  qrCodeImageUrl: string = '';

  fechaActual: string = '';
  horaActual: string = '';

  user:
    | {
        idProfesor: number;
        nombre: string;
        apellido: string;
        nombreseccion: string;
        seccion: string;
        codseccion: string;
      }
    | undefined;
  selectedSeccion: string = '';
  secciones: any[] = [];
  profesores: any[] = [];

  // logica
  professorSectionsDB: any[] = [];
  professorSections: any[] = [];

  expandedSections: Set<number> = new Set();

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private apiService: BBDDasistenciaService,
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtr: NavController
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.user = navigation.extras.state?.['user'];
      console.log('Recibido del page seccion:', this.user);
    }
  }

  ngOnInit() {
    this.generateDynamicQRCode();

    this.generateDynamicQRCode();
    this.fechaActual = this.obtenerFechaActual();
    this.horaActual = this.obtenerHoraActual();

    console.log('this.user');
    console.log(this.user);

    this.getSeccionData();
    this.getProfesorData();
    this.obtenerSeccionesPorProfesor(this.user?.idProfesor);
  }
  getProfesorData() {
    this.apiService.getProfesorData().subscribe((data: any) => {
      const items = data.map((el: any) => keysToUpperCase(el));
      this.profesores = items;
    });
  }

  getSeccionData() {
    this.apiService.getSeccionData().subscribe((data: any) => {
      const items = data.map((el: any) => keysToUpperCase(el));
      this.secciones = items;
    });
  }

  obtenerSeccionesPorProfesor(professorId: any) {
    this.apiService
      .obtenerSeccionesPorProfesor(professorId)
      .subscribe((data: any) => {
        console.log('data ');
        console.log(data);
        const items = data.map((el: any) => keysToUpperCase(el));
        this.professorSectionsDB = items;
      });
  }

  getSeccionesByProfesorId() {
    console.log('this.professorSectionsDB');
    console.log(this.professorSectionsDB);
    console.log('this.user?.idprof');
    console.log(this.user?.idProfesor);
    console.log('secciones L');
    console.log(this.secciones);

    const filtered = this.secciones.filter((s) => {
      const f = this.professorSectionsDB.find(
        (psDB) => s.IDSECCION === psDB.IDSECCION
      );
      console.log('f');
      console.log(f); // contiene las secciones del profesor

      if (!f) {
        return false;
      }

      return f;
    });
    console.log('filtered');
    console.log(filtered);

    this.professorSections = filtered;
    console.log('professorSections');
    console.log(this.professorSections);
  }

  async guardarAsistencia() {
    // aca la logica para guardar la asistencia despues de ser scaneada
    let userData = {
      idProfesor: this.user?.idProfesor,
      nombre: this.user?.nombre,
      apellido: this.user?.apellido,
      nombreseccion: this.user?.nombreseccion,
      seccion: this.user?.seccion,
      codseccion: this.user?.codseccion,
    };
    console.log('este es el user que se le pasa al userData', this.user);

    console.log('Datos a pasar desde profesor a "asistencia":', userData);

    let navigationExtras: NavigationExtras = {
      state: { user: userData },
    };
    this.router.navigate(['/asistencia'], navigationExtras);
  }

  generateQRCode() {
    qrcode.toDataURL(this.qrCodeData, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }
      this.qrCodeImageUrl = url;
      console.log('QR Code Data:', this.qrCodeData); // Agregar el console.log
    });
  }

  generateDynamicQRCode() {
    const nuevosDatosQR =
      'Nuevos datos del código QR dinámico: ' + Math.random();
    this.qrCodeData = nuevosDatosQR;
    this.generateQRCode();
  }

  obtenerFechaActual(): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const fecha = new Date().toLocaleDateString(undefined, options);
    return fecha;
  }

  obtenerHoraActual(): string {
    const opcionesHora: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
    };
    const hora = new Date().toLocaleTimeString(undefined, opcionesHora);
    return hora;
  }
}
