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

  Ps.initialize(left);
  Ps.initialize(right);
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
             blockDom.className = blockDom.className  + ' leaf';
             var blockText = blockDom.getElementsByClassName('block-text')[0];
             var bits = statement[side].split('-');
             for(i in bits) {
                blockText.innerHTML += '<h1>' + getWord(bits[i]).title + '</h1>';
             }
             blockText.className = blockText.className + ' ' + otherSide[side];
             leafBlock.setHtml(blockDom);
             displayBlockArray([leafBlock], container, side);
             endSide[side] = true;
             if(endSide['left'] && endSide['right']) {
                displayEnd();
             }
           }

             Ps.update(left);
             Ps.update(right);
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
           var bfade= document.getElementsByClassName('show-' + side);
           for(var i = 0; i < bfade.length; i++) {
             bfade[i].className = bfade[i].className + ' fade-out';
           }
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
      var rummadKemmadur = null;
      var kemmadur = null;
      for(var i = 0; i<kemmaduriou.length; i++) {
        var kemmaduri = kemmaduriou[i];
        console.log(statement['left'] + ' > ' + kemmaduri.left);
        console.log(statement['right'] + ' > ' + kemmaduri.right);
        if((new RegExp(kemmaduri.left)).test(statement['left']) &&
           (new RegExp(kemmaduri.right)).test(statement['right'])) {
          console.log('COUCOU');
            kemmadur = kemmaduri;
            rummadKemmadur = getRummad(kemmadur.kemmadur);
            break;
        }
      }
      if(rummadKemmadur == null) {
        rummadKemmadur = getRummad('null');
      }
      manager.displayRummadDOM(rummadKemmadur);

      if(kemmadur && kemmadur.example) {
         document.getElementById('rummad-examples').appendChild(
          document.createTextNode(kemmadur.example)
         );
      } else {
          document.getElementById('rummad-examples-container').className = 'invisible';
      }
      if(kemmadur && kemmadur.exceptions) {
         document.getElementById('rummad-exceptions').appendChild(
          document.createTextNode(kemmadur.exceptions)
         );
      } else {
          document.getElementById('rummad-exceptions-container').className = 'invisible';
      }
      Ps.initialize(document.getElementById('rummad'));

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
