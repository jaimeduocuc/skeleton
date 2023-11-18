import { TestBed } from '@angular/core/testing';

import { BBDDasistenciaService } from './bbddasistencia.service';

describe('BBDDasistenciaService', () => {
  let service: BBDDasistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BBDDasistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
