// -*- coding: utf-8, tab-width: 2 -*-
'use strict';

const getOwn = require('getown');
const isStr = require('is-string');
const loMapValues = require('lodash.mapvalues');


function finiteOrZero(x) { return (Number.isFinite(x) ? x : 0); }


const EX = function lookupReverseHostnameInDeepDict(dict, revHostNameParts) {
  if (!dict) { return; }
  const nHostParts = finiteOrZero((revHostNameParts || false).length);
  if (nHostParts < 1) { return false; }
  let nPartsUsed = 0;
  let curLevelDict = dict;
  let subDict;
  let hostPart;
  let found;
  const partsUsed = [];
  let parent = '';

  function checkSubPrefix(val, prefix) {
    if (subDict !== undefined) { return; }
    if (hostPart.startsWith(prefix)) { subDict = val; }
  }

  while (nPartsUsed < nHostParts) {
    hostPart = revHostNameParts[nPartsUsed];
    nPartsUsed += 1;
    partsUsed.push(hostPart);
    if (!curLevelDict) { break; }
    subDict = getOwn(curLevelDict, hostPart);
    if (subDict === undefined) {
      loMapValues(getOwn(curLevelDict, '…*'), checkSubPrefix);
    }
    if (subDict === undefined) { subDict = getOwn(curLevelDict, '*'); }
    if (!subDict) { break; }
    found = (isStr(subDict) ? subDict : getOwn(subDict, '.'));
    // console.debug(EX.name, { hostPart, parent, subDict, found });
    if (found !== undefined) { break; }
    parent = '.' + hostPart + parent;
    curLevelDict = subDict;
    subDict = null;
  }
  if (found === undefined) { return false; }
  const report = {
    val: found,
    hostPart,
    parent,
    partsUsed,
  };
  return report;
};


Object.assign(EX, {

  fromUrl(dict, origUrl) {
    if (!dict) { return false; }
    if (!origUrl) { return false; }
    let urlParsed = origUrl;
    if (!isStr(urlParsed.hostname)) { urlParsed = new URL(origUrl); }
    if (!urlParsed.hostname) { return false; }
    const revHostNameParts = urlParsed.hostname.split('.')
      .filter(Boolean).reverse();
    const found = EX(dict, revHostNameParts);
    if (!found) { return found; }
    found.urlParsed = urlParsed;
    return found;
  },

});



module.exports = EX;
