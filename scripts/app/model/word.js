define(function (require) {

/**
 * Word
 * Represents a word, with children words
 * @author Gwenn Meynier <tornoz@laposte.net>
 */
  var otherSide = {'right': 'left', 'left': 'right'};

  var Word = function WordConstructor(id, title, desc) {

      this.id = id;
      this.title = title;
      this.desc = desc;
      this.children = [];
  }

  Word.prototype.setTitle = function(title) {
    this.title = title;
  }

  Word.prototype.setDesc = function(desc) {
    this.desc = desc;
  }

  Word.prototype.addChild = function(child) {
    this.children.push(child);
  }

  Word.prototype.hasChild = function(id) {
    return this.getChild(id) !== null;
  }

  Word.prototype.getChild = function(id) {
    for(childId in this.children) {
        if(this.children[childId].id == id) {
            return this.children[childId];
        }
    }
    return null;
  }




  return Word;
});
