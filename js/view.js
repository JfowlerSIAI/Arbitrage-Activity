/* Economic concepts: David Friedman. Development: Eric McKee. */
(function () {
  'use strict';
  var M = window.ArbitrageModel, G = M.goods;
  function el(id) { return document.getElementById(id); }
  function node(tag, text, className) { var n = document.createElement(tag); if (text !== undefined) n.textContent = text; if (className) n.className = className; return n; }
  function number(n) {
    if (n !== 0 && Math.abs(n) < 0.000001) return n.toExponential(6);
    return n.toLocaleString('en-US', { maximumFractionDigits: 6 });
  }
  function routeText(route) { return [0].concat(route, [0]).map(function (g) { return G[g]; }).join(' → '); }
  function row(body, values) {
    var tr = node('tr');
    values.forEach(function (v, i) { var cell = node(i === 0 ? 'th' : 'td', v); if (i === 0) cell.scope = 'row'; tr.appendChild(cell); });
    body.appendChild(tr);
  }
  function quotes(s) {
    var q = M.quotes(s.scenario), body = el('quotes-table').tBodies[0]; body.replaceChildren();
    for (var i = 0; i < G.length; i++) for (var j = i + 1; j < G.length; j++) {
      row(body, [G[i] + ' / ' + G[j], number(q[i][j]) + ' ' + G[j].toLowerCase() + ' per ' + G[i].toLowerCase(), number(q[j][i]) + ' ' + G[i].toLowerCase() + ' per ' + G[j].toLowerCase()]);
    }
    el('scenario-explanation').textContent = M.scenario(s.scenario).explanation;
  }
  function diagram(route) {
    var list = el('route-path'); list.replaceChildren();
    [0].concat(route, [0]).forEach(function (g, i) {
      var item = node('li');
      if (i) { var arrow = node('span', '→', 'arrow'); arrow.setAttribute('aria-hidden', 'true'); item.appendChild(arrow); }
      item.appendChild(node('span', G[g], 'good')); list.appendChild(item);
    });
  }
  function summary(s) {
    el('balance').textContent = number(s.balance) + ' grain';
    el('profit').textContent = number(s.balance - 100) + ' grain';
    el('ratio').textContent = number(s.balance / 100) + '×';
  }
  function preview(p) {
    el('preview-scroll').hidden = !p; el('precision-note').hidden = !p;
    var body = el('preview-table').tBodies[0]; body.replaceChildren();
    if (!p) { el('preview-summary').textContent = 'Preview your route to see each conversion. Nothing further has been exchanged.'; return; }
    el('preview-summary').textContent = p.classification + ' loop · multiplier ' + number(p.multiplier) + '×. Exchange ' + number(p.amount) + ' grain; receive ' + number(p.returned) + ' grain. Profit / loss: ' + number(p.profit) + ' grain. Balance would be ' + number(p.after) + ' grain. Preview only; nothing exchanged.';
    p.legs.forEach(function (leg, i) { row(body, [String(i + 1) + '. ' + G[leg.from] + ' → ' + G[leg.to], number(leg.before) + ' ' + G[leg.from].toLowerCase(), number(leg.rate) + ' ' + G[leg.to].toLowerCase() + ' per ' + G[leg.from].toLowerCase(), number(leg.after) + ' ' + G[leg.to].toLowerCase()]); });
  }
  function history(s) {
    el('history-scroll').hidden = !s.history.length;
    el('history-summary').textContent = s.history.length ? s.history.length + ' loop' + (s.history.length === 1 ? '' : 's') + ' executed. Quotes are unchanged. Cumulative profit / loss: ' + number(s.balance - 100) + ' grain.' : 'No loops executed. Quotes stay fixed after every trade.';
    var body = el('history-table').tBodies[0]; body.replaceChildren();
    s.history.forEach(function (r) { row(body, [String(r.number), routeText(r.route), number(r.amount), number(r.multiplier) + '×', number(r.returned), number(r.profit), number(r.after)]); });
  }
  function reveal(best, p) {
    el('reveal-panel').hidden = false;
    el('reveal-summary').textContent = (best.profitable ? 'Best profitable loop: ' : 'No profitable loop exists. A best neutral loop is: ') + routeText(best.route) + '. Multiplier ' + number(best.multiplier) + '×; ' + number(p.amount) + ' grain returns ' + number(p.returned) + ' grain. Searched all ' + best.count + ' routes; ties prefer fewer legs, then grain, cloth, copper, tea, salt order. Your selected route and holdings are unchanged.';
    var list = el('reveal-legs'); list.replaceChildren();
    p.legs.forEach(function (leg) { list.appendChild(node('li', number(leg.before) + ' ' + G[leg.from].toLowerCase() + ' × ' + number(leg.rate) + ' ' + G[leg.to].toLowerCase() + ' per ' + G[leg.from].toLowerCase() + ' = ' + number(leg.after) + ' ' + G[leg.to].toLowerCase())); });
  }
  window.ArbitrageView = { el: el, node: node, number: number, routeText: routeText, quotes: quotes,
    diagram: diagram, summary: summary, preview: preview, history: history, reveal: reveal };
})();
