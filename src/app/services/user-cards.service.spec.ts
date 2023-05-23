import { TestBed } from '@angular/core/testing';

import { UserCardsService } from './user-cards.service';

describe('UserCardsService', () => {
  let service: UserCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
