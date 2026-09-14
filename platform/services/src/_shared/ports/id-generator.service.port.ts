/**
 * IdGeneratorService Port — Vouchstone domain prefixes.
 */

import type { DomainCode } from '@vouchstone/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  astId(): string;
  evdId(): string;
  domId(): string;
  covId(): string;
  atrId(): string;
  exrId(): string;
  fndId(): string;
  alcId(): string;
  asrId(): string;
  govId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
