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

test('single-value headers', () => {
    const headers = new Headers();
    headers.append('Location', '/apple');
    headers.append('Content-Type', 'application/json');

    const result = split_headers(headers);

    assert.equal(result, {
        headers: {
            // Note: becomes lowercase even if specified as uppercase
            'location': '/apple',
            'content-type': 'application/json',
        },
        multiValueHeaders: {},
    });
})

test('multi-value headers', () => {
    const headers = new Headers();
    headers.append('Set-Cookie', 'flavor=sugar');
    headers.append('Set-Cookie', 'diameter=6cm');

    const result = split_headers(headers);

    assert.equal(result, {
        headers: {},
        multiValueHeaders: {
            'set-cookie': ['flavor=sugar', 'diameter=6cm'],
        },
    });
})

test.run()