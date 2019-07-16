import { TestBed } from '@angular/core/testing';

import { TeamsService } from './teams.service';

describe('TeamsService', () => {
  let service: TeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(TeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve teams', () => {
    const teams = service.getTeams();
    expect(teams).toBeDefined();
    expect(teams.length).toBeGreaterThanOrEqual(2);
  });

  it('should retrieve single team', () => {
    const team = service.getTeam(1);
    expect(team).toBeDefined();
    expect(team.id === 1).toBeTruthy();
  });

  it('should not crash when retrieving non existent team', () => {
    const nonexistentTeam = service.getTeam(-56);
    expect(nonexistentTeam).toBeUndefined();
  });
});
