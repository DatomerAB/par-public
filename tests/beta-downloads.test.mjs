import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { groupDownloadPlatforms, mergeCatalogMetadata, validDownloadCatalog } from '../assets/landing/app.js';

const fallback = JSON.parse(readFileSync(new URL('../assets/landing/config.json', import.meta.url), 'utf8')).downloadCatalog;

const entry = (name) => ({
  tag: 'v1.0.0-beta.9', name,
  url: `https://github.com/DatomerAB/par-releases/releases/download/v1.0.0-beta.9/${name}`,
});

test('accepts legacy Mac-only and Windows-only catalogs', () => {
  assert.equal(validDownloadCatalog({ schema_version: 1, platforms: { 'macos-arm64': [entry('Par_aarch64.dmg')] } }), true);
  assert.equal(validDownloadCatalog({ schema_version: 1, platforms: { 'windows-x64-cpu': [entry('Par-cpu.exe')] } }), true);
});

test('groups CPU and GPU variants under the JSON-provided OS and accepts future platforms', () => {
  const catalog = {
    schema_version: 1,
    platform_metadata: {
      'windows-x64-cpu': { os: { en: 'Windows' }, variant: { en: 'CPU' }, order: 2, variant_order: 1 },
      'windows-x64-gpu': { os: { en: 'Windows' }, variant: { en: 'GPU' }, order: 2, variant_order: 2 },
      'freebsd-riscv64-cpu': { os: { en: 'FreeBSD' }, variant: { en: 'CPU' }, order: 4, variant_order: 1 },
    },
    platforms: {
      'windows-x64-cpu': [entry('Par-cpu.exe')],
      'windows-x64-gpu': [entry('Par-gpu.exe')],
      'freebsd-riscv64-cpu': [entry('Par-freebsd.pkg')],
    },
  };

  assert.equal(validDownloadCatalog(catalog), true);
  assert.deepEqual(groupDownloadPlatforms(catalog).map(({ os, variants }) => [os, variants.map(({ label }) => label)]), [
    ['Windows', ['CPU', 'GPU']],
    ['FreeBSD', ['CPU']],
  ]);
});

test('merges deployed labels into an older live catalog without orphan metadata', () => {
  const fallback = {
    platform_metadata: {
      'windows-x64-cpu': { os: { en: 'Windows' }, variant: { en: 'CPU' } },
      'linux-x64-cpu': { os: { en: 'Linux' }, variant: { en: 'CPU' } },
    },
  };
  const live = { schema_version: 1, platforms: { 'windows-x64-cpu': [entry('Par-cpu.exe')] } };

  const merged = mergeCatalogMetadata(live, fallback);

  assert.deepEqual(Object.keys(merged.platform_metadata), ['windows-x64-cpu']);
  assert.equal(merged.platform_metadata['windows-x64-cpu'].os.en, 'Windows');
  assert.equal(validDownloadCatalog(merged), true);
});

test('checked-in fallback covers Mac, Windows, and Linux installers', () => {
  assert.equal(validDownloadCatalog(fallback), true);
  assert.deepEqual(Object.keys(fallback.platforms).sort(), ['linux-x64-cpu', 'macos-arm64', 'windows-x64-cpu']);
  assert.deepEqual(groupDownloadPlatforms(fallback).map(({ os }) => os), ['Mac', 'Windows', 'Linux']);
});

test('rejects empty catalogs, unsafe filenames, invalid metadata, and untrusted URLs', () => {
  assert.equal(validDownloadCatalog({ schema_version: 1, platforms: {} }), false);
  assert.equal(validDownloadCatalog({ schema_version: 1, platforms: { 'windows-x64-cpu': [entry('../setup.exe')] } }), false);
  assert.equal(validDownloadCatalog({ schema_version: 1, platforms: { 'windows-x64-cpu': [{ ...entry('Par-cpu.exe'), url: 'https://example.com/setup.exe' }] } }), false);
  assert.equal(validDownloadCatalog({
    schema_version: 1,
    platform_metadata: { 'windows-x64-cpu': { os: { en: '' }, variant: { en: 'CPU' } } },
    platforms: { 'windows-x64-cpu': [entry('Par-cpu.exe')] },
  }), false);
});