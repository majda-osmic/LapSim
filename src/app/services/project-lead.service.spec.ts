import { TestBed } from '@angular/core/testing';

import { ProjectLeadService } from './project-lead.service';

describe('ProjectLeadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectLeadService = TestBed.get(ProjectLeadService);
    expect(service).toBeTruthy();
  });
});
