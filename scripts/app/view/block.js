define(function (require) {

  var otherSide = {'right': 'left', 'left': 'right'};

  /**
   * Block
   * Contains data for the displayed block
   * Most of it isn't probably useful
   * @author Gwenn Meynier <tornoz@laposte.net>
   */

  var Block = function BlockConstructor() {

      this.content = '';
      this.children = [];
      this.type = 'block';
      this.html = '';
  }

  Block.prototype.setHtml = function(html) {
     this.html = html;
  }

  Block.prototype.setType = function(type) {
     this.type = type;
  }


  Block.prototype.setChildren = function(children) {
     this.children = children;
  }

  Block.prototype.addListener = function (event, callback) {
      this.html.addEventListener(event, callback);
  }


  return Block;
});
