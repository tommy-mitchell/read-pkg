import {fileURLToPath, pathToFileURL} from 'url';
import path from 'path';
import test from 'ava';
import {readPackage, readPackageSync} from '../index.js';

const dirname = path.dirname(fileURLToPath(test.meta.file));
const rootCwd = path.join(dirname, '..');

test('async', async t => {
	const package_ = await readPackage();
	t.is(package_.name, 'unicorn');
	t.truthy(package_._id);
});

test('async - cwd option', async t => {
	const package_ = await readPackage({cwd: rootCwd});
	t.is(package_.name, 'read-pkg');
	t.deepEqual(
		await readPackage({cwd: pathToFileURL(rootCwd)}),
		package_,
	);
});

test('async - normalize option', async t => {
	const package_ = await readPackage({normalize: false});
	t.is(package_.name, 'unicorn ');
});

test('sync', t => {
	const package_ = readPackageSync();
	t.is(package_.name, 'unicorn');
	t.truthy(package_._id);
});

test('sync - cwd option', t => {
	const package_ = readPackageSync({cwd: rootCwd});
	t.is(package_.name, 'read-pkg');
	t.deepEqual(
		readPackageSync({cwd: pathToFileURL(rootCwd)}),
		package_,
	);
});

test('sync - normalize option', async t => {
	const package_ = readPackageSync({normalize: false});
	t.is(package_.name, 'unicorn ');
});
