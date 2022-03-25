# Unit-test your Sass code

`#inpsyde` `#dev-friday`

---

## Sass

It's a preprocessor.

> Sass has features that don't exist in CSS yet like nesting, mixins, inheritance, and other nifty goodies that help you write robust, maintainable CSS.

https://sass-lang.com/guide

---

## Typical Sass code

```scss
@import 'component/hero-image';

.editor-styles-wrapper {
    @import 'block/core/button';

    & > #{$blockAttrSelector}[data-align='wide'] {
        @include block-vertical-spacing();
        max-width: $block-wide-width;
    }
}
```

---

## Sass Module System

End of 2019: The Module System is Launched

https://sass-lang.com/blog/the-module-system-is-launched

---

## Not radical on the surface, but ... spoiler!

```scss
@include describe('dummy test set') {
    @include it('works') {
        @include assert-equal('one', 'two');
    }
}
```

```css
/*  ✖ FAILED: [assert-equal] works */
/*      - Output: [string] "one"   */
/*      - Expected: [string] "two" */
/*      - Module: dummy test set   */
/*      - Test: works              */
```

---

## Why this talk?

A company-wide Sass library with mixins, functions, etc., must have tests.

---

## Sass Module System is about

-   namespacing
-   controlling visibility
-   built-in modules

---

## Sass Module System is also about

-   deprecation
-   keeping up with the evolving CSS specification
-   migrator tool

e.g.:

> The Sass team discourages the continued use of the @import rule. Sass will gradually phase it out over the next few years, and eventually remove it from the language entirely. Prefer the @use rule instead.

---

## Namespaces

```scss
@use 'src/corners';
@use 'src/corners' as c;
@use 'src/corners' as *;

@forward 'src/list' as list-*;
```

---

## Controlling visibility

```scss
$-radius: 3px;

@function _box-shadow() {
    @return $-box-shadow or (0 0.5rem 1rem rgba($-black, 0.15));
}

@forward 'src/list' hide list-reset, $horizontal-list-gap;
```

---

## Built-in modules

```scss
@use 'sass:selector';
@use 'sass:string';
@use 'sass:list';
@use 'sass:math';

@debug selector.extend('a.disabled', 'a', '.link'); // a.disabled, .link.disable
@debug selector.nest('.alert, .warning', 'p'); // .alert p, .warning p

@debug string.unique-id(); // uabtrnzug

@debug list.is-bracketed([1px, 2px, 3px]); // true

@debug math.ceil(4.2); // 5
@debug math.random(); // 0.2821251858
```

---

## True

> True is a unit-testing tool for Sass code. All of the tests are written in plain Sass, and can be compiled using Dart Sass – but we also provide integration with JavaScript test runners (e.g. Mocha or Jest), for extra features and improved reporting.

https://github.com/oddbird/true

---

## Getting started

```shell
npm install sass-true --save-dev
```

```scss
@use 'sass-true';

@include sass-true.describe() {
    @include sass-true.it() {
        // ...
    }
}
```

```shell
npx sass tests/sass.test.scss
```

---

## Testing return values

```scss
@include sass-true.assert-equal('one', 'two');

// sass-true.assert-true();
// sass-true.assert-false();
// sass-true.assert-unequal();
```

https://www.oddbird.net/true/docs/api-assert-values

---

## Testing CSS output

```scss
@include sass-true.output() {
    div {
        color: red;
    }
}

@include sass-true.expect() {
    div {
        color: blue;
    }
}
```

https://www.oddbird.net/true/docs/api-assert-output

---

## Inspiration for the code we are going to test

```json
{
    "settings": {
        "custom": {
            "table": {
                "thead": {
                    "typography": {
                        "fontWeight": "bold"
                    }
                }
            }
        }
    }
}
```

```css
body {
    --wp--custom--table--thead--typography--font-weight: bold;
}
```

https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/

---

## The code we are going to test

```scss
body {
    @include map-to-custom-properties(
        (
            table: (
                thead: (
                    typography: (
                        font-weight: bold,
                    ),
                ),
            ),
        ),
        'acme'
    );
}
```

```css
body {
    --acme--table--thead--typography--font-weight: bold;
}
```

---

## With Jest

```js
const sassTrue = require('sass-true');

sassTrue.runSass({ file }, { describe, it });
```

---

## More confidence in 3rd-party

Use libraries that have tests

https://cs.github.com/?q=sass-true+language%3AJSON

-   Sass Fairy https://github.com/roydukkey/sass-fairy
-   Sassdash https://github.com/davidkpiano/sassdash
-   Sass Accoutrement https://github.com/oddbird/accoutrement

---

```
 .--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--.
/ .. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \
\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/ /
 \/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /
 / /\/ /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /\/ /\
/ /\ \/`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'\ \/\ \
\ \/\ \                                                    /\ \/ /
 \/ /\ \                                                  / /\/ /
 / /\/ /                 That was it...                   \ \/ /\
/ /\ \/                                                    \ \/\ \
\ \/\ \                      ¬‿¬                           /\ \/ /
 \/ /\ \                                                  / /\/ /
 / /\/ /                  ¯\_(ツ)_/¯                      \ \/ /\
/ /\ \/                                                    \ \/\ \
\ \/\ \.--..--..--..--..--..--..--..--..--..--..--..--..--./\ \/ /
 \/ /\/ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ /\/ /
 / /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\
/ /\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \
\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `' /
 `--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'
```
