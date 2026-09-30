#!/usr/bin/env bun
/**
 * write-report-log.ts: regenerates `.agents/data/ubersuggest.json` from the committed batches
 * (`just keywords-report-log [--stdout]`). Idempotent: same batches, same bytes.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { DATA_DIR } from '../paths';
import { readBatches } from './batches';
import { buildReportLog, renderReportLog } from './report-log';

const out = renderReportLog(buildReportLog(readBatches('strict').batches));
if (process.argv.includes('--stdout')) process.stdout.write(out);
else {
	writeFileSync(join(process.cwd(), DATA_DIR, 'ubersuggest.json'), out);
	console.log('[report-log] .agents/data/ubersuggest.json regenerado');
}
