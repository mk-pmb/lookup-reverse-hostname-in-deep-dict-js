// -*- coding: utf-8, tab-width: 2 -*-
/* eslint-disable object-property-newline */

import assert from 'assert';

import lookupRevHostInDeepDict from '../index.js';

const same = assert.deepStrictEqual;


const hostAliases = {
  net: {
    example: {
      hosting: {
        gold: 'premium',
        '…*': {
          free: {
            '.': { '*': 'freehost.example.org.' },
            // :TODO: ^-- Explain `.` and `*`
          },
        },
      },
    },
  },
};

function findAlias(hnp) { return lookupRevHostInDeepDict(hostAliases, hnp); }

same(findAlias(['net', 'example']), false);
same(findAlias(['net', 'example', 'hosting', 'premium']), false);
same(findAlias(['net', 'example', 'hosting', 'gold']), {
  hostPart: 'gold',
  parent: '.hosting.example.net',
  partsUsed: ['net', 'example', 'hosting', 'gold'],
  val: 'premium',
});
same(findAlias(['net', 'example', 'hosting', 'free23']), {
  hostPart: 'free23',
  parent: '.hosting.example.net',
  partsUsed: ['net', 'example', 'hosting', 'free23'],
  val: { '*': 'freehost.example.org.' },
});


(function newsPage4() {
  const urlStr = 'https://gold.hosting.example.net/news.php?page=4';
  let alias = lookupRevHostInDeepDict.fromUrl(hostAliases, urlStr);
  same(alias.val, 'premium');
  same(alias.urlParsed.href, urlStr);

  const urlObj = new URL(urlStr);
  alias = lookupRevHostInDeepDict.fromUrl(hostAliases, urlObj);
  same(alias.val, 'premium');
  assert.strictEqual(alias.urlParsed, urlObj);
  // ^-- i.e. no temporary URL object created
}());











console.info('+OK usage test passed.');
