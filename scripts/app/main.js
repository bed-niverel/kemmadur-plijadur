// Main script
var otherSide = {'right': 'left', 'left': 'right'};
define(function (require) {
  // Class looading
  var Block = require('./view/block');
  var BlockFactory = require('./view/block_factory');
  var BlockViewManager = require('./view/block_view_manager');
  var KemmaduriouManager = require('./model/kemmaduriou_manager');

  //Data loading
  var kemmaduriou = require('json!../../data/kemmaduriou.json');
  var words = require('json!../../data/words.json');
  var rummadou = require('json!../../data/rummad.json');

  var container = document.getElementsByTagName('body')[0];
  var left = document.getElementById('left');
  var right = document.getElementById('right');

  var manager = new BlockViewManager();
  var factoryLeft = new BlockFactory('left', manager);
  var factoryRight = new BlockFactory('right', manager);
  var kemmaduriouManager = new KemmaduriouManager(kemmaduriou, words);
  //Construct the data from json
  kemmaduriouManager.constructBlocksFromKemmaduriou();

  var statement = {'left' :'', 'right':''};
  var endSide = {'left' :false, 'right':false};

  //Construct the DOM
  var mainBlocksLeft = factoryLeft.manageArray([kemmaduriouManager.leftRoot]);
  var mainBlocksRight = factoryRight.manageArray([kemmaduriouManager.rightRoot]);

  displayBlockArray(mainBlocksLeft, left, 'left');
  displayBlockArray(mainBlocksRight, right, 'right');
  // Displays the blocks
  function displayBlockArray(blockArray, container, side) {
      for(var i = 0; i < blockArray.length; i++) {
          var block = blockArray[i];
          //display block
          block.html.className += ' pre-show-' + side;
          container.appendChild(block.html);
          //animation stuff
          window.setTimeout(function(thisBlock) {
            thisBlock.html.className = thisBlock.html.className + ' show-' + side;
          }, 200*i, block);

          var animationEnd = function(evt) {
           this.html.style.display = 'none';
           while(container.firstChild) {
             container.removeChild(container.firstChild);
           }
           if(this.children.length > 0) {
              displayBlockArray(this.children, container, side);
           } else {
             var blockDom = manager.createBlockDOM(this);
             var leafBlock = new Block();
             leafBlock.isLeaf = true;
             var blockText = blockDom.getElementsByClassName('block-text')[0];
             blockText.innerHTML = '<h1>' + getWord(this.type).name + '</h1>';
             blockText.className = blockText.className + ' ' + otherSide[side];
             leafBlock.setHtml(blockDom);
             displayBlockArray([leafBlock], container, side);
             endSide[side] = true;
             if(endSide['left'] && endSide['right']) {
                displayEnd();
             }
           }
         };
         var clickListener = function (evt, children) {
           if(statement[side] != '') {
             statement[side] += '-';
           }
           if(!this.isRoot) {
             if(this.pattern) {
                statement[side] += this.pattern;
             } else {
               statement[side] += this.type;
             }
           }
           this.html.className = this.html.className.replace(' show-' + side, '');
           this.html.className = this.html.className + ' hide-' + side;
           this.addListener('animationend', animationEnd.bind(this));
         };
         if(!block.isLeaf) {
           block.addListener('click', clickListener.bind(block));
         }
      }
  }

  function displayEnd() {
      left.className = left.className + ' end';
      right.className = right.className + ' end';
      updateKemmaduriou();
      for(var i = 0; i<kemmaduriou.length; i++) {
        var kemmadur = kemmaduriou[i];
        console.log(statement['left'] + ' > ' + kemmadur.left);
        console.log(statement['right'] + ' > ' + kemmadur.right);
        if((new RegExp(kemmadur.left)).test(statement['left']) &&
           (new RegExp(kemmadur.right)).test(statement['right'])) {
          console.log('COUCOU');
            var rummadKemmadur = getRummad(kemmadur.kemmadur);
            manager.displayRummadDOM(rummadKemmadur);
            document.getElementById('rummad-examples').appendChild(
              document.createTextNode(kemmadur.example)
            );
            break;
        }
      }

  }

  function getRummad(id) {
    for(var i = 0; i < rummadou.length; i++) {
      if(rummadou[i].id == id) {
        return rummadou[i];
      }
    }
    return null;
  }

  function getWord(id) {
    for(var i = 0; i < words.length; i++) {
      if(words[i].id == id) {
        return words[i];
      }
    }
    return null;
  }

  function updateKemmaduriou() {
    for(var i = 0; i < kemmaduriou.length; i++) {
      var kemmadur = kemmaduriou[i];
      var newLeft = kemmadur.left;
      var newRight = kemmadur.right;
      for(var j = 0; j< words.length; j++) {
          var word = words[j];
          if(word.pattern) {
              if(kemmadur.left.indexOf(word.id !== -1)) {
                kemmadur.left = kemmadur.left.replace(word.id, word.pattern);
              }
              if(kemmadur.left.indexOf(word.id !== -1)) {
                kemmadur.right = kemmadur.right.replace(word.id, word.pattern);
              }
          }
        }
    }

  }
});
