import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { BBDDasistenciaService } from '../bbddasistencia.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  fechaActual: string = '';
  horaActual: string = '';
  usuario:
    | {
        idProfesor: number;
        nombre: string;
        apellido: string;
        nombreseccion: string;
        seccion: string;
        codseccion: string;
      }
    | undefined;

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
      this.usuario = navigation.extras.state?.['user'];
      console.log(`navigation.extras.state? ${this.usuario}`);

      console.log('Recibido del page profesor "user":', this.usuario);
    }
  }

  ngOnInit() {
    console.log('usuario id del ngoninit', this.usuario?.idProfesor);
    console.log('usuario nombre del ngoninit', this.usuario?.nombre);
    console.log('usuario nombre del ngoninit', this.usuario?.apellido);
    console.log('usuario nombre del ngoninit', this.usuario?.nombreseccion);
    console.log('usuario nombre del ngoninit', this.usuario?.seccion);
    console.log('usuario nombre del ngoninit', this.usuario?.codseccion);

    this.fechaActual = this.obtenerFechaActual();
    this.horaActual = this.obtenerHoraActual();
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

  async cerrarSesion() {
    const loading = await this.loadingController.create({
      message: 'Cerrando su sesión',
    });

    await loading.present();

    setTimeout(() => {
      loading.dismiss().then(() => {
        this.router.navigate(['/login']);
      });
    }, 1500);
  }
}
