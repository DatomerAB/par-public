import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validDownloadCatalog } from '../assets/landing/app.js';

const entry = (name) => ({
  tag: 'v1.0.0-beta.9', name,
  url: `https://github.com/DatomerAB/par-releases/releases/download/v1.0.0-beta.9/${name}`,
});

test('accepts Mac-only and Windows-only catalogs', () => {
  assert.equal(validDownloadCatalog({ schema_version: 1, platforms: { 'macos-arm64': [entry('Par_aarch64.dmg')] } }), true);
  assert.equal(validDownloadCatalog({ schema_version: 1, platforms: { 'windows-x64-cpu': [entry('Par-cpu.exe')] } }), true);
});

test('rejects empty, malformed and cross-platform catalog entries', () => {
  assert.equal(validDownloadCatalog({ schema_version: 1, platforms: {} }), false);
  assert.equal(validDownloadCatalog({ schema_version: 1, platforms: { 'macos-arm64': [entry('Par-cpu.exe')] } }), false);
  assert.equal(validDownloadCatalog({ schema_version: 1, platforms: { 'windows-x64-cpu': [{ ...entry('Par-cpu.exe'), url: 'https://example.com/setup.exe' }] } }), false);
});