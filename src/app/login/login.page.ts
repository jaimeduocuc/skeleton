import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BBDDasistenciaService } from '../bbddasistencia.service';
import { AuthGuard } from '../auth.guard';
import { keysToUpperCase } from '../utils/keysToUpperCase';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formulariologin: FormGroup;
  loading: HTMLIonLoadingElement | null = null;

  profesores: any[] = []; // Almacena los datos de la tabla "PROFESOR"
  alumnos: any[] = []; // Almacena los datos de la tabla "ALUMNO"
  seccionprofe: any[] = []; // almacena los datos de la tabala "SECCION"

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtr: NavController,
    private router: Router,
    public loadingController: LoadingController,
    private apiService: BBDDasistenciaService, // Inyecta el servicio
    private auth: AuthGuard
  ) {
    this.formulariologin = this.fb.group({
      correo: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {
    this.getSeccionData();
    this.getProfesorData();
    this.getAlumnolData();
  }

  getSeccionData() {
    this.apiService.getSeccionData().subscribe((data: any) => {
      console.log('getSeccionData');
      console.log(data);
      const items = data.map((el: any) => keysToUpperCase(el));
      console.log('items');
      console.log(items);
      this.seccionprofe = items;
    });
  }

  getProfesorData() {
    this.apiService.getProfesorData().subscribe((data: any) => {
      const items = data.map((el: any) => keysToUpperCase(el));
      this.profesores = items;
      console.log(this.profesores);
    });
  }

  getAlumnolData() {
    this.apiService.getAlumnolData().subscribe((data: any) => {
      const items = data.map((el: any) => keysToUpperCase(el));
      this.alumnos = items;
      console.log(this.alumnos);
    });
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async ingresar() {
    if (this.formulariologin?.valid) {
      const correo = this.formulariologin?.get('correo')?.value;
      const password = this.formulariologin?.get('password')?.value;

      console.log('Correo ingresado:', correo);
      console.log('Contraseña ingresada:', password);

      // Verifica si el correo y la contraseña coinciden en los arrays de profesores y alumnos
      const profesor = this.profesores.find(
        (p) => p.CORREO === correo && p.CONTRASENA === password
      );
      const alumno = this.alumnos.find(
        (a) => a.CORREO === correo && a.CONTRASENA === password
      );

      console.log('Profesores:', this.profesores);
      console.log('Alumnos:', this.alumnos);
      console.log('Profesor encontrado:', profesor);
      console.log('Alumno encontrado:', alumno);

      if (profesor) {
        console.log('Autenticación exitosa para profesor');

        let userData = {
          idProfesor: profesor.IDPROFESOR,
          nombre: profesor.NOMBRE, // Asegúrate de que los nombres de las propiedades sean correctos
          apellido: profesor.APELLIDO,
        };

        let navigationExtras: NavigationExtras = {
          state: { user: userData },
        };
        console.log('verificando desde login a seccion el userdata', userData);
        this.auth.setAuthenticationStatus(true);
        this.router.navigate(['/seccion'], navigationExtras);
      } else if (alumno) {
        console.log('Autenticación exitosa para alumno');
        let userData = {
          idAlumno: alumno.IDALUMNO,
          nombre: alumno.NOMBRE, // Asegúrate de que los nombres de las propiedades sean correctos
          apellido: alumno.APELLIDO,
        };
        let navigationExtras: NavigationExtras = {
          state: { user: userData },
        };
        console.log(
          'verificando desde login al page alumno el userdata',
          userData
        );
        this.auth.setAuthenticationStatus(true);
        this.router.navigate(['/seccionalumno'], navigationExtras); // Reemplaza la ruta según tus necesidades
      } else {
        console.log('Autenticación fallida');
        this.mostrarAlerta('Error', 'Correo o contraseña incorrectos');
      }
    } else {
      console.log('Campos del formulario no válidos');
      this.mostrarAlerta(
        'Error',
        'Por favor, complete los campos correctamente.'
      );
    }
  }

  // Método para restablecer el formulario
  resetForm() {
    this.formulariologin.reset(); // Restablece el formulario a sus valores iniciales al salir de la paágina
  }

  ionViewWillEnter() {
    this.resetForm(); // Restablece el formulario al entrar en la página
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Accediendo...',
      duration: 1500, // Ajusta la duración según sea necesario
    });
    await this.loading.present(); // muestra el loading por pantalla
    await this.loading.onDidDismiss(); // Esperar a que el loading se cierre
  }

  async RecordarPass() {
    await this.presentLoading(); // Muestra el loading
    // Después de completar el loading, redirige al usuario a la página de restablecimiento de contraseña
    this.router.navigate(['/recordarpass']);

    if (this.loading) {
      await this.loading.dismiss(); // Asegura cerrar el Loading antes de redirigir
    }
  }

  print() {
  }
}
