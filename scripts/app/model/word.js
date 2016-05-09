define(function (require) {

/**
 * Word
 * Represents a word, with children words
 * @author Gwenn Meynier
 */
  var otherSide = {'right': 'left', 'left': 'right'};

  var Word = function WordConstructor(id, name, desc) {

      this.id = id;
      this.name = name;
      this.desc = desc;
      this.children = [];
  }

  Word.prototype.setName = function(name) {
    this.name = name;
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
