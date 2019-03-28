import { TestBed } from '@angular/core/testing';

import { StocktradeService } from './stocktrade.service';

describe('StocktradeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StocktradeService = TestBed.get(StocktradeService);
    expect(service).toBeTruthy();
  });
});
