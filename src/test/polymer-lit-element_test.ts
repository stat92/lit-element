/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import { PolymerLitElement } from '../polymer-lit-element.js';

/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/chai/index.d.ts" />

const assert = chai.assert;

suite('PolymerLitElement', () => {

  test('renders initial content', () => {
    const rendered = `hello world`;
    customElements.define('x-1', class extends PolymerLitElement {
      render(_props: any, html: Function) {
        return html`${rendered}`
      }
    });
    const el = document.createElement('x-1');
    document.body.appendChild(el);
    assert.ok(el.shadowRoot);
    assert.equal((el.shadowRoot as ShadowRoot).innerHTML, rendered);
    document.body.removeChild(el);
  });

  test('renders when created via constructor', () => {
    const rendered = `hello world`;
    const C = class extends PolymerLitElement {
      render(_props: any, html: Function) {
        return html`${rendered}`
      }
    };
    customElements.define('x-2', C);
    const el = new C();
    document.body.appendChild(el);
    assert.ok(el.shadowRoot);
    assert.equal((el.shadowRoot as ShadowRoot).innerHTML, rendered);
    document.body.removeChild(el);
  });

  test('renders changes when properties change', (done) => {
    customElements.define('x-3', class extends PolymerLitElement {
      static get properties() {
        return {
          foo: String
        }
      }

      foo = 'one';

      render(props: any, html: Function) {
        return html`${props.foo}`
      }
    });
    const el = document.createElement('x-3');
    document.body.appendChild(el);
    assert.ok(el.shadowRoot);
    assert.equal((el.shadowRoot as ShadowRoot).innerHTML, 'one');
    el.foo = 'changed';
    requestAnimationFrame(() => {
      assert.equal((el.shadowRoot as ShadowRoot).innerHTML, 'changed');
      document.body.removeChild(el);
      done();
    });
  });

  test('renders changes when attributes change', (done) => {
    customElements.define('x-4', class extends PolymerLitElement {
      static get properties() {
        return {
          foo: String
        }
      }

      foo = 'one';

      render(props: any, html: Function) {
        return html`${props.foo}`
      }
    });
    const el = document.createElement('x-4');
    document.body.appendChild(el);
    assert.ok(el.shadowRoot);
    assert.equal((el.shadowRoot as ShadowRoot).innerHTML, 'one');
    el.setAttribute('foo', 'changed');
    requestAnimationFrame(() => {
      assert.equal((el.shadowRoot as ShadowRoot).innerHTML, 'changed');
      document.body.removeChild(el);
      done();
    });
  });

  test('renders changes made at `ready` time', () => {
    customElements.define('x-5', class extends PolymerLitElement {
      static get properties() {
        return {
          foo: String
        }
      }

      foo = 'one';

      ready() {
        this.foo = 'changed';
        super.ready();
      }

      render(props: any, html: Function) {
        return html`${props.foo}`
      }
    });
    const el = document.createElement('x-5');
    document.body.appendChild(el);
    assert.ok(el.shadowRoot);
    assert.equal((el.shadowRoot as ShadowRoot).innerHTML, 'changed');
    document.body.removeChild(el);
    });
  });



});
