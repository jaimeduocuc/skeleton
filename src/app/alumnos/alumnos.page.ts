import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { BBDDasistenciaService } from '../bbddasistencia.service';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {

  user: { idAlumno: number; nombre: string; apellido: string; nombreseccion: string, seccion: string, codseccion: string} | undefined;
  fechaActual: string = '';
  horaActual: string = '';

  selectedSeccion= "";

  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(
    private loadingController: LoadingController,
    public alertController: AlertController,
    public navCtr: NavController,
    private router: Router,
    private apiService: BBDDasistenciaService
    
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.user = navigation.extras.state?.['user'];
      console.log('Recibido del Login:', this.user);
    }
  }

  async ngOnInit() {
    this.fechaActual = this.obtenerFechaActual();
    this.horaActual = this.obtenerHoraActual();
    
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permisos denegados',
      message: 'Otorgue permiso a la cámara para usar el escáner de código de barras.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async cerrarSesion() {
    const loading = await this.loadingController.create({
      message: 'Cerrando su sesión',
    });

    await loading.present();

    setTimeout(() => {
      loading.dismiss().then(() => {
        // Redirige al usuario al login después de completar el loading
        this.router.navigate(['/login']);
      });
    }, 1500); // Tiempo de espera antes de redireccionar 
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
