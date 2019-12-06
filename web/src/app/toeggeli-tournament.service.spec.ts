import { TestBed } from '@angular/core/testing';

import { ToeggeliTournamentService } from './toeggeli-tournament.service';

describe('ToeggeliTournamentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToeggeliTournamentService = TestBed.get(ToeggeliTournamentService);
    expect(service).toBeTruthy();
  });
});
