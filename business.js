/*
  Wealthy business details.
  Edit these once. The app's About screen and every policy page read them from here.
  Replace each [BRACKETED] value with the real detail.
*/
window.WEALTHY_BUSINESS = {
  legalName: '[COMPANY LEGAL NAME]',
  appName: 'Wealthy',
  stateOfFormation: '[STATE OF FORMATION]',
  address: '[MAILING ADDRESS]',
  supportEmail: '[SUPPORT EMAIL]',
  privacyEmail: '[PRIVACY EMAIL]',
  governingLaw: '[GOVERNING STATE]',
  courtVenue: '[COUNTY AND STATE FOR COURT CASES]',
  effectiveDate: '[EFFECTIVE DATE]'
};

/* Fills every element marked data-biz="fieldName" on the policy pages. */
(function () {
  function fill() {
    var b = window.WEALTHY_BUSINESS;
    var els = document.querySelectorAll('[data-biz]');
    Array.prototype.forEach.call(els, function (el) {
      var v = b[el.getAttribute('data-biz')];
      if (!v) return;
      el.textContent = v;
      if (el.tagName === 'A' && v.charAt(0) !== '[') el.setAttribute('href', 'mailto:' + v);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill);
  else fill();
})();
