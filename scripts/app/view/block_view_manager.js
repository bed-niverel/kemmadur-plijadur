
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
      if(rummad.mutations) {
        this.createRummadArray(
          rummad.mutations,
          document.getElementById('rummad-first-row'),
          document.getElementById('rummad-second-row'));
      }
      if(rummad.mutations_voiced) {
        this.createRummadArray(
          rummad.mutations_voiced,
          document.getElementById('rummad-voiced-first-row'),
          document.getElementById('rummad-voiced-second-row'));
      } else {
        document.getElementById('rummad-voiced-table').className = 'invisible';
      }


      rummadDiv.className = 'visible';
  }

  BlockViewManager.prototype.createRummadArray = function(mutations, firstRow, secondRow) {
    for(var i in mutations) {
      var a = i;
      var b = mutations[i];
      var itemFirst = document.createElement('div');
      var itemSecond = document.createElement('div');
      itemFirst.appendChild(document.createTextNode(a));
      itemSecond.appendChild(document.createTextNode(b));
      firstRow.appendChild(itemFirst);
      secondRow.appendChild(itemSecond);
    }
  }

  return BlockViewManager;
});
