/**
 * ID Generator Service Implementation — Vouchstone prefixes.
 */

import type { DomainCode } from '@vouchstone/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@vouchstone/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@vouchstone/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  astId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.assets);
  }
  evdId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.evidence);
  }
  domId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.domains);
  }
  covId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.coverage);
  }
  atrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.attribution);
  }
  exrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.exercises);
  }
  fndId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.findings);
  }
  alcId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.allocation);
  }
  asrId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.assurance);
  }
  govId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.governance);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
