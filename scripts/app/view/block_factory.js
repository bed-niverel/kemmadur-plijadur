define(function (require) {
  var Block = require('./block');
  var otherSide = {'right': 'left', 'left': 'right'};

  /**
   * BlockFactory
   * Take an array of words and creates blocks
   * @author Gwenn Meynier <tornoz@laposte.net>
   */
  var BlockFactory = function BlockFactoryConstructor(side, blockManager) {
      this.side = side;
      this.blockManager = blockManager;
  }

  BlockFactory.prototype.manageArray = function(blockArray) {
    var blocks = [];
    var heightPerBlock = 100/blockArray.length;
    for(var i = 0; i < blockArray.length; i++) {
        blocks.push(this.manageDict(blockArray[i], heightPerBlock));
    }
    return blocks;
  }

  BlockFactory.prototype.manageDict = function(blockDict, height) {
    //Create new block
    var block = new Block();
    var dom = this.blockManager.createBlockDOM(blockDict);

    if(blockDict.title) {
      var blockText = dom.getElementsByClassName('block-text')[0];
      var blockTitle = document.createElement('h1');
      blockTitle.appendChild(document.createTextNode(blockDict.title));

      blockText.appendChild(blockTitle);
      if(blockDict.desc) {
        var blockDesc = document.createElement('p');
        blockDesc.appendChild(document.createTextNode(blockDict.desc));
        blockText.appendChild(blockDesc);
      }
      blockText.className = blockText.className + ' ' + otherSide[this.side];
    }
    if(blockDict.color) {
      console.log(blockDict.type);
      dom.className = dom.className + ' ' + 'red';
    }
    if(blockDict.isRoot) {
      block.isRoot = true;
    }
    if(blockDict.pattern) {
      block.pattern = true;
    }
    if(dom) {
      dom.style.height = height + 'vh';
    }
    block.setHtml(dom);
    block.setType(blockDict.id);
    if(blockDict.children) {
        block.setChildren(this.manageArray(blockDict.children));
    }
    return block;
  }


  return BlockFactory;
});
