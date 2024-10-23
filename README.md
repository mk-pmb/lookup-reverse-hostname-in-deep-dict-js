
<!--#echo json="package.json" key="name" underline="=" -->
lookup-reverse-hostname-in-deep-dict
====================================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Lookup a reverse hostname (net.example.domain.sub.dom.ains) in a dictionary
object where each level has one hostname part as the keys – or certain kinds
of wildcards.
<!--/#echo -->



API
---

This module exports one function:

### lookupReverseHostnameInDeepDict(dict, revHostNameParts) {

Looks up `revHostNameParts`, which should be an array of host name parts,
from most significant (top-level domain) to most specific, in `dict`.

Returns a report object if the hostname is found, or `false` otherwise.

:TODO: Document the report format.




Usage
-----

see [test/usage.mjs](test/usage.mjs).



Dictionary format
-----------------

:TODO:



<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
