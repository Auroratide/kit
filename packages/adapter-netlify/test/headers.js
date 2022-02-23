import '../src/shims.js';
import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { split_headers } from '../src/headers.js';

const test = suite('Netlify Adapter Header Utilities');

test('empty headers', () => {
    const headers = new Headers();

    const result = split_headers(headers);

    assert.equal(result, {
        headers: {},
        multiValueHeaders: {},
    });
})

test.run()