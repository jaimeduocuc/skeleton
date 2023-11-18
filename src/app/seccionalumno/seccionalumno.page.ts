import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { BBDDasistenciaService } from '../bbddasistencia.service';
import { keysToUpperCase } from '../utils/keysToUpperCase';

@Component({
  selector: 'app-seccionalumno',
  templateUrl: './seccionalumno.page.html',
  styleUrls: ['./seccionalumno.page.scss'],
})
export class SeccionalumnoPage implements OnInit {
  secciones: any[] = [];
  //alumnos: any[] = [];

  alumnoSectionsDB: any[] = [];
  alummnoSections: any[] = [];

  expandedSections: Set<number> = new Set();

  loading: HTMLIonLoadingElement | null = null;
  user: { idAlumno: number; nombre: string; apellido: string } | undefined;
  selectedSeccion: string = '';
  fechaActual: string = '';
  horaActual: string = '';

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtr: NavController,
    private router: Router,
    public loadingController: LoadingController,
    private apiService: BBDDasistenciaService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.user = navigation.extras.state?.['user'];
      console.log('Recibido del Login al page seccionalumno:', this.user);
    }
  }

  ngOnInit() {
    console.log('this.user');
    console.log(this.user);

    this.getSeccionData();
    //this.getProfesorData();
    this.obtenerSeccionesPorAlumno(this.user?.idAlumno); // muestra las secciones del idAlumno

    this.fechaActual = this.obtenerFechaActual();
    this.horaActual = this.obtenerHoraActual();
  }

  errorMessages = {
    tipoDocumento: '',
    numeroDocumento: '',
  };

  customAlertOptions = {
    header: 'Secciones',
    message: 'Seleccione solo una',
    translucent: true,
  };

  // getProfesorData() {
  //   this.apiService.getProfesorData().subscribe((data: any) => {
  //     this.alumnos = data;
  //   });
  // }

  getSeccionData() {
    this.apiService.getSeccionData().subscribe((data: any) => {
      const items = data.map((el: any) => keysToUpperCase(el));
      this.secciones = items;
      console.log(this.secciones);
    });
  }

  obtenerSeccionesPorAlumno(alummnoId: any) {
    this.apiService
      .obtenerSeccionesPorAlumno(alummnoId)
      .subscribe((data: any) => {
        console.log('data ');
        console.log(data);
        const items = data.map((el: any) => keysToUpperCase(el));
        console.log('items');
        console.log(items);
        this.alumnoSectionsDB = items;
      });
  }

  getSeccionesByAlumnoId() {
    console.log('this.alumnoSectionsDB');
    console.log(this.alumnoSectionsDB);
    console.log('this.user?.idAlumno');
    console.log(this.user?.idAlumno);
    console.log('secciones L');
    console.log(this.secciones);

    const filtered = this.secciones.filter((s) => {
      const f = this.alumnoSectionsDB.find(
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

    this.alummnoSections = filtered;
    console.log('alummnoSections');
    console.log(this.alummnoSections);
  }

  async continuar() {
    console.log('dasoks');
    if (this.user && this.selectedSeccion) {
      // Inicializa las propiedades
      let seccion = '';
      let codseccion = '';

      // Encuentra la sección seleccionada en los datos de la sección
      const selectedSectionData = this.alummnoSections.find(
        (seccion) => seccion.NOMBRE_SECCION === this.selectedSeccion
      );

      if (selectedSectionData) {
        seccion = selectedSectionData.SECCION;
        codseccion = selectedSectionData.CODSECCION;
      }

      let userData = {
        idAlumno: this.user.idAlumno,
        nombre: this.user.nombre,
        apellido: this.user.apellido,
        nombreseccion: this.selectedSeccion, // Establece la sección seleccionada
        seccion, // Agrega la propiedad "seccion"
        codseccion, // Agrega la propiedad "codseccion"
      };

      console.log('Datos a pasar a la página "alumnos":', userData);

      let navigationExtras: NavigationExtras = {
        state: { user: userData },
      };

      this.router.navigate(['/alumnos'], navigationExtras);
    }
  }

  seccionSeleccionada(event: any) {
    this.selectedSeccion = event.detail.value;
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
