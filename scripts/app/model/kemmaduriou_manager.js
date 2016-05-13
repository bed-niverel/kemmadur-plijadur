
define(function (require) {
  var Word = require('./word');
  var otherSide = {'right': 'left', 'left': 'right'};

/**
 * KemmaduriouManager
 * Manage mutation file and turns it into usable data
 * @author Gwenn Meynier <tornoz@laposte.net>
 */
  var KemmaduriouManager = function KemmaduriouManagerConstructor(kemmaduriouData, wordsData) {

      this.kemmaduriouData = kemmaduriouData;
      this.wordsData = wordsData;
      // Creates the roots (Ur c'hemmadur)
      this.leftRoot = new Word('leftRoot', 'Ur', '');
      this.rightRoot = new Word('rightRoot', 'C\'hemmadur', '');
      this.leftRoot.isRoot = true;
      this.rightRoot.isRoot = true;
  };

/**
 * Take a raw mutation dictionnary and turns it into a tree
 */
  KemmaduriouManager.prototype.constructBlocksFromKemmaduriou = function() {
     for(kemmadurId in this.kemmaduriouData) {
       var kemmadur = this.kemmaduriouData[kemmadurId];
       //Splits each side
       var leftWordIds = kemmadur.left.split('-');
       var rightWordIds = kemmadur.right.split('-');
       this.addWord(this.leftRoot, leftWordIds);
       this.addWord(this.rightRoot, rightWordIds);
     }
  };

/**
 * Returns the word if it is contained among the direct chilfren of parent
 * Else, create the word and attach it to parent
 */
  KemmaduriouManager.prototype.getWord = function(parent, id) {
     if(parent.hasChild(id)) {
         return parent.getChild(id);
     } else {
       for(wordIndex in this.wordsData) {
         var word = this.wordsData[wordIndex];
         if(word.id == id) {
           var newWord = new Word(word.id, word.title, word.desc)
           parent.addChild(newWord);
           return newWord;
         }
       }
       var newWord = new Word(id, 'unknown', 'unkwown');
       parent.addChild(newWord);
       return newWord;
     }
  };

/**
 * Recursive function that adds a word in the mutation tree and then pass to the next word
 */
  KemmaduriouManager.prototype.addWord = function(word,stack) {
      if(stack.length > 0) {
        var childWord = this.getWord(word,stack[0]);
        this.addWord(childWord, stack.slice(1));
      } else {
        return;
      }

  };

  return KemmaduriouManager;
});
