(function () {

    if(!window['LHB']){window['LHB']={};}

    function isCompatible(other) {
        if (other === false
            || !Array.prototype.push
            || !Object.hasOwnProperty
            || !document.createElement
            || !document.getElementsByTagName) {
            return false;
        }
        return true;
    };
    window['LHB']['isCompatible']=isCompatible;

    function $() {
        var elements=new Array();

        for(var i in arguments){
            var element=arguments[i];

            if(typeof element == 'string'){
                element=document.getElementById(element);
            }

            if(arguments.length==1){
                return element;
            }

            elements.push(element);
        }

        return elements;
    }
    window['LHB']['$']=$;

    function addEvent(node,type,listener) {
        if(!isCompativle()){
            return false;
        }

        if(!(node=$(node))){
            return false;
        }

        if(node.addEventListener){
            node.addEventListener(type,listener,false);
            return true;
        }else if(node.attachEvent){
            node['e'+type+listener]=listener;
            node[type+listener]=function () {
                node['e'+type+listener](window.event);
            };
            node.attachEvent('on'+type,node[type+listener]);
            return true;
        }

        return false;
    }
    window['LHB']['addEvent']=addEvent;

    function removeEvent(node,type,listener) {
        if(!(node=$(node))){return false;}

        if(node.removeEventListener){
            node.removeEventListener(type,listener,false);
            return true;
        }else if(node.detachEvent){
            node.detachEvent('on'+type,node[type+listener]);
            node[type+listener]=null;
            return true;
        }
        return false;
    }
    window['LHB']['removeEvent']=removeEvent;

    function getElementByClassName(className,tag,parent) {
        if(!document.getElementsByClassName){
            return document.getElementsByName(className);
        }

        parent=parent||document;
        if(!(parent=$(parent))){return false;}

        var allTags=(tag=='*'&&parent.all)?parent.all:parent.getElementsByName(tag);
        var matchingElements=new Array();

        className=className.replace(/\-/g,'\\-');
        var regex=new RegExp('(^|\\s)'+className+'(\\s|$)');

        var element;
        for(var i=0;i<allTags.length;i++){
            element=allTags[i];
            if(regex.test(element.className)){
                matchingElements.push(element);
            }
        }
        return matchingElements;
    }
    window['LHB']['getElementByClassName']=getElementByClassName;

    function toggleDisplay(node,value) {
        if(!(node=$(node))){return false;}

        if(node.style.display!='none'){
            node.style.display='none';
        }else{
            node.style.display=value||'';
        }
        return true;
    }
    window['LHB']['toggleDisplay']=toggleDisplay;

    function insertAfter(node,referenceNode) {
        if (!(node = $(node))) {
            return false;
        }
        if (!(referenceNode = $(referenceNode))) {
            return false;
        }

        return referenceNode.parentNode.insertBefore(
            node, referenceNode.nextSibling
        );
    }
    window['LHB']['insertAfter']=insertAfter;

    function removeChildren(parent) {
        if(!(parent=$(parent))){return false;}

        while(parent.firstChild){
            parent.firstChild.parentNode.removeChild(parent.firstChild);
        }

        return parent;
    }
    window['LHB']['removeChildren']=removeChildren;

    function prependChild(parent,newChild) {
        if(!(parent=$(parent))){return false;}
        if(!(nextChild=$(nextChild))){return false;}

        if(parent.firstChild){
            parent.insertBefore(newChild,parent.firstChild);
        }else{
            parent.append(newChild);
        }

        return parent;
    }
    window['LHB']['$prependChild']=prependChild;
})();