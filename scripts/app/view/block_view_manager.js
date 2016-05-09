
define([],function (blocks,require) {

  /**
  * BlockViewManager
  * Manages the DOM for a block and other stuff
  * @author Gwenn Meynier <tornoz@laposte.net>
  */
  var BlockViewManager = function BlockViewManagerConstructor() {
  }

  BlockViewManager.prototype.createBlockDOM = function(block) {
      var div = document.createElement('div');
      var innerDiv = document.createElement('div');

      innerDiv.className = 'block-text medium'
      div.className = 'block ' + block.id;
      div.appendChild(innerDiv);
      return div;
  }

  BlockViewManager.prototype.displayRummadDOM = function(rummad) {
      var rummadDiv = document.getElementById('rummad');
      var rummadTitle = document.getElementById('rummad-title');
      rummadTitle.appendChild(document.createTextNode(rummad.name));
      var firstRow = document.getElementById('rummad-first-row');
      var secondRow = document.getElementById('rummad-second-row');
      for(var i in rummad.mutations) {
        var a = i;
        var b = rummad.mutations[i];
        var itemFirst = document.createElement('div');
        var itemSecond = document.createElement('div');
        itemFirst.appendChild(document.createTextNode(a));
        itemSecond.appendChild(document.createTextNode(b));
        firstRow.appendChild(itemFirst);
        secondRow.appendChild(itemSecond);
      }

      rummadDiv.className = 'visible';
  }

  return BlockViewManager;
});
