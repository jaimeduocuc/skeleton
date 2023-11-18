import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { BBDDasistenciaService } from '../bbddasistencia.service';
import { keysToUpperCase } from '../utils/keysToUpperCase';

@Component({
  selector: 'app-recordarpass',
  templateUrl: './recordarpass.page.html',
  styleUrls: ['./recordarpass.page.scss'],
})
export class RecordarpassPage implements OnInit {
  profesores: any[] = []; // Almacena los datos de la tabla "PROFESOR"
  alumnos: any[] = []; // Almacena los datos de la tabla "ALUMNO"

  formularioRecuperacion: FormGroup;
  loading: HTMLIonLoadingElement | null = null;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtr: NavController,
    public router: Router,
    public loadingController: LoadingController,
    private apiService: BBDDasistenciaService
  ) {
    this.formularioRecuperacion = this.fb.group({
      correo: new FormControl('', [Validators.email, Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getProfesorData();
    this.getAlumnolData();
  }

  getProfesorData() {
    this.apiService.getProfesorData().subscribe((data: any) => {
      console.log(data);
      const items = data.map((el: any) => keysToUpperCase(el));
      this.profesores = items;
    });
  }

  getAlumnolData() {
    this.apiService.getAlumnolData().subscribe((data: any) => {
      console.log(data);
      const items = data.map((el: any) => keysToUpperCase(el));
      this.alumnos = items;
    });
  }

  async recordarEmail() {
    const correo = this.formularioRecuperacion?.get('correo')?.value;
    const nombre = this.formularioRecuperacion?.get('nombre')?.value;
    const apellido = this.formularioRecuperacion?.get('apellido')?.value;

    console.log('Correo ingresado:', correo);
    console.log('Nombre ingresado:', nombre);
    console.log('Apellido ingresado:', apellido);

    // Verifica si el correo y la contraseña coinciden en los arrays de profesores y alumnos
    const profesor = this.profesores.find(
      (p) =>
        p.CORREO === correo && p.NOMBRE === nombre && p.APELLIDO === apellido
    );
    const alumno = this.alumnos.find(
      (a) =>
        a.CORREO === correo && a.NOMBRE === nombre && a.APELLIDO === apellido
    );

    if (profesor) {
      console.log('Autenticación exitosa para profesor');
      // Muestra la contraseña del profesor o realiza la acción deseada
      const alert = await this.alertController.create({
        header: 'Datos de profesor validos',
        message: 'Su contraseña es ' + profesor.CONTRASENA,
        buttons: ['Aceptar'],
      });
      this.formularioRecuperacion.reset();
      await alert.present();
      return;
    } else if (alumno) {
      console.log('Autenticación exitosa para alumno');
      // Muestra la contraseña del alumno o realiza la acción deseada
      const alert = await this.alertController.create({
        header: 'Datos de alumno validos',
        message: 'Su contraseña es ' + alumno.CONTRASENA,
        buttons: ['Aceptar'],
      });
      this.formularioRecuperacion.reset();
      await alert.present();
      return;
    } else {
      console.log('Autenticación fallida');
      // Indica que la autenticación falló (puedes mostrar un mensaje de error aquí si lo deseas).
      const alert = await this.alertController.create({
        header: 'Autenticación fallida',
        message: 'Vuleva a intentarlo',
        buttons: ['Aceptar'],
      });
      this.formularioRecuperacion.reset();
      await alert.present();
      return;
    }
  }

  async presentLoading2() {
    this.loading = await this.loadingController.create({
      message: 'Limpiando',
      duration: 1000,
    });
    await this.loading.present();
    await this.loading.onDidDismiss();
  }

  async borrar() {
    await this.presentLoading2();
    this.formularioRecuperacion.reset();
  }

  async cancelarRedireccion() {
    const loading = await this.presentLoading();
    setTimeout(() => {
      loading.dismiss();
      this.router.navigate(['/login']);
    }, 1000);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Redireccionando al registro de usuarios',
      duration: 1500,
    });
    await loading.present();
    return loading;
  }
}
