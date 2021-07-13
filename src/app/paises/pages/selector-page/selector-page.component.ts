import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesServiceService } from '../../services/paises-service.service';
import { Pais, PaisSmall } from '../../interfaces/pais.interface';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styleUrls: ['./selector-page.component.css']
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region    : ['', Validators.required],
    pais      : ['', Validators.required],
    frontera  : ['', Validators.required],
  });

  //Selectores
  regiones    : string[] = [];
  paises      : Pais[] = [];
  fronteras   : PaisSmall[] = [];

  //UI 
  cargando    : boolean = false;

  constructor(private fb: FormBuilder,
              private paisesService:PaisesServiceService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;
    this.miFormulario.get('frontera')?.disable();

    // this.miFormulario.get('region')?.valueChanges
    //   .subscribe( region => {
    //     console.log(region);

    //     this.paisesService.getPaisesPorRegion(region).subscribe( paises => {
    //       this.paises = paises;
    //       console.log(paises);
    //     });
    //   });

    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( () => {
          this.miFormulario.get('pais')?.reset('');
          this.miFormulario.get('frontera')?.disable();
          this.cargando = true;
        }),
        switchMap( region => this.paisesService.getPaisesPorRegion(region) )
      )
      .subscribe( paises => {
        this.paises = paises;
        this.cargando = false;
      });
      
      
      
      this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap( () => {
          this.fronteras = [];
          this.miFormulario.get('frontera')?.reset('');
          this.miFormulario.get('frontera')?.enable();
          this.cargando = false;
        }),
        switchMap( codigo => this.paisesService.getPaisPorCodigo( codigo ) ),
        switchMap( pais => this.paisesService.getPaisesPorCodigos( pais?.borders! ) )
        )  
        .subscribe( paises => {
          // this.fronteras = pais?.borders || [];
          this.fronteras = paises;
          this.cargando = false;
      });
  
  }

  guardar(): void {

  }
}
