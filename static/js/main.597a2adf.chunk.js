(this.webpackJsonpblackjack=this.webpackJsonpblackjack||[]).push([[0],{32:function(e,t,a){},34:function(e,t,a){},35:function(e,t,a){},36:function(e,t,a){},37:function(e,t,a){},38:function(e,t,a){},40:function(e,t,a){},41:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a(1),s=a.n(r),l=a(11),c=a.n(l),i=(a(32),a(3)),o=a(4),u=a(6),d=a(5),b=a(2),j=a.n(b),p=a(8),h=a(9),f=(a(34),a(7)),m=(a(35),a(13));var y=function(e){var t=e.onclickResetGame,a=e.onclickReset,s=e.onHistory,l=e.dropdown,c=e.dealerValue,i=e.dealerValueTotal,o=e.dealerData,u=Object(r.useState)(!1),d=Object(f.a)(u,2),b=d[0],j=d[1];return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("div",{className:"container_ham",children:[Object(n.jsx)(m.a,{toggled:b,toggle:j}),b?Object(n.jsx)("div",{className:"burger",children:Object(n.jsxs)("li",{children:[Object(n.jsx)("ul",{children:Object(n.jsx)("button",{className:"btn",onClick:s,children:"History"})}),Object(n.jsx)("ul",{children:Object(n.jsx)("button",{className:"btn",onClick:a,children:"Reset Round"})}),Object(n.jsx)("ul",{children:Object(n.jsx)("button",{className:"btn",onClick:t,children:"Reset Game"})})]})}):null,l?Object(n.jsx)("div",{className:"dropdown",children:l}):null]}),Object(n.jsxs)("div",{className:"dealer",children:["Dealer: ",c,"/",i]}),Object(n.jsx)("div",{className:"cards",children:o})]})},k=(a(36),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props,t=e.playerValue,a=e.playerValueTotal,r=e.playerData;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("div",{className:"player",children:["Player: ",t,"/",a]}),Object(n.jsx)("div",{className:"cards",children:r})]})}}]),a}(s.a.Component)),O=(a(37),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).buttonVisible=function(t){return e.props.play===t?"hide":""},e.isDisabled=function(){return e.props.play?"Disabled":""},e.isDealDisabled=function(){return 0===e.props.bet?"Disabled":""},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props,t=e.onclickDouDown,a=e.onclickStand,r=e.onclickHit,s=e.onclickDeal,l=e.onClickBetMin,c=e.onClickBetMid,i=e.onClickBetMax;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("div",{className:"bets",children:[Object(n.jsx)("button",{className:"bet "+this.buttonVisible(!0),onClick:l,style:{backgroundColor:"red"},children:"5"}),Object(n.jsx)("button",{className:"bet "+this.buttonVisible(!0),onClick:c,style:{backgroundColor:"yellow"},children:"15"}),Object(n.jsx)("button",{className:"bet "+this.buttonVisible(!0),onClick:i,style:{backgroundColor:"white"},children:"30"})]}),Object(n.jsxs)("div",{className:"control",children:[Object(n.jsx)("button",{className:"btn"+this.isDealDisabled()+" "+this.buttonVisible(!0),onClick:s,children:"Deal"}),Object(n.jsx)("button",{className:"btn "+this.buttonVisible(!1),onClick:r,children:"Hit"}),Object(n.jsx)("button",{className:"btn "+this.buttonVisible(!1),onClick:a,children:"Stand"}),Object(n.jsx)("button",{className:"btn "+this.buttonVisible(!1),onClick:t,children:"Double Down"})]})]})}}]),a}(s.a.Component)),v=(a(38),{generateDeck:function(){return fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52").then((function(e){return e.json()})).then((function(e){return e.cards}))}});var x=function(e){var t=Object(r.useState)(!0),a=Object(f.a)(t,2),s=a[0],l=a[1];return Object(n.jsxs)("div",{className:"content",style:{display:s?"block":"none"},children:[Object(n.jsx)("div",{className:"title",children:Object(n.jsx)("h1",{children:"Black Jack"})}),Object(n.jsx)("div",{className:"start",children:Object(n.jsx)("button",{onClick:function(){v.generateDeck().then((function(t){e.parentCallBack(t),l(!1)}))},children:"Start Game"})})]})},C=function(){var e=Object(p.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.length<10)&&t){e.next=4;break}return e.next=3,v.generateDeck();case 3:t=e.sent;case 4:return e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),D=a(12),S=a.n(D),g=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var r;return Object(i.a)(this,a),(r=t.call(this,e)).takeBet=function(e){r.setState((function(t){return{bet:t.bet+e,chips:t.chips-e}}))},r.countCards=function(){r.setState((function(e){return{dealerValue:r.calcCards(r.state.dealerCards,!1),playerValue:r.calcCards(r.state.playerCards,!1),dealerValueTotal:r.calcCards(r.state.dealerCards,!0),playerValueTotal:r.calcCards(r.state.playerCards,!0)}}))},r.calcCards=function(e,t){return Object.keys(e).reduce((function(a,n){var r=e[n].value;return"ACE"===r?r=1:"KING"!==r&&"QUEEN"!==r&&"JACK"!==r||(r=10),r=1===(r=Number(r))&&t?11:r,Number(a)+r}),0)},r.drawCards=function(e,t,a){var n;for(n=1;n<=a;n++){var r=e.pop();t.push(r)}return t},r.checkBust=function(){var e,t,a,n="";e=r.calcCards(r.state.playerData,!1),t=r.calcCards(r.state.playerData,!0),(a=Math.min(e,t))>21?(n="Player Bust!!!",r.saveData(n)):21===a&&(n="Player Wins!!!",r.saveData(n)),r.setState({gameStatus:n})},r.checkDealerStatus=function(e,t){var a,n,s="";return a=r.calcCards(e,!1),n=r.calcCards(e,!0),Math.min(a,n)>21?(s="Player Wins!!!",r.saveData(s)):a<=21&&a===t||n<=21&&n===t?(s="Push",r.saveData(s)):(a<=21&&a>t||n<=21&&n>t)&&(s="Dealer wins!!!",r.saveData(s)),s},r.onStay=Object(p.a)(j.a.mark((function e(){var t,a,n,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(t=Math.max(r.state.playerValue,r.state.playerValueTotal))>21&&(t=Math.min(r.state.playerValue,r.state.playerValueTotal)),e.next=4,C(r.state.deck);case 4:if(a=e.sent,n=r.state.dealerCards,""===(s=r.checkDealerStatus(n,t)))do{r.drawCards(a,n,1),s=r.checkDealerStatus(n,t)}while(""===s);r.setState((function(e){return{deck:a,dealerCards:n,gameStatus:s}})),r.countCards();case 10:case"end":return e.stop()}}),e)}))),r.onDeal=Object(p.a)(j.a.mark((function e(){var t,a,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==r.state.bet){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,C(r.state.deck);case 4:t=e.sent,a=r.state.dealerData,n=r.state.playerData,r.drawCards(t,a,2),r.drawCards(t,n,2),r.setState({deck:t,dealerCards:a,playerCards:n,play:!0},(function(){this.countCards()}));case 10:case"end":return e.stop()}}),e)}))),r.onHit=Object(p.a)(j.a.mark((function e(){var t,a,n,s,l;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null===r.state.gameStatus){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,C(r.state.deck);case 4:t=e.sent,a=r.state.playerData,r.drawCards(t,a,1),r.setState((function(e){return{playerCards:a,deck:t}})),n=r.state.dealerData,s=r.state.playerValueTotal,l=r.checkDealerStatus(n,s),r.setState({gameStatus:l}),r.countCards(),r.checkBust();case 14:case"end":return e.stop()}}),e)}))),r.onDown=function(){if(null===r.state.gameStatus){var e=r.state.bet;e>=1e3||r.takeBet(e)}},r.onReset=function(){if(0!==r.state.bet){var e=r.state.chips,t=r.state.bet;"Push"===r.state.gameStatus?e+=t:"Player Wins!!!"===r.state.gameStatus&&(e+=1.5*t),r.setState({savedState:[],dealerData:[],dealerValue:0,dealerValueTotal:0,dealerCards:[],playerData:[],playerValue:0,playerValueTotal:0,playerCards:[],play:!1,bet:0,chips:e,gameStatus:null})}},r.onresetGame=function(){localStorage.clear(),r.setState({visible:!0,savedState:[],dataLastGame:[],deck:"",chips:1e3,bet:0,playerData:[],playerCards:[],playerValue:0,playerValueTotal:0,dealerData:[],dealerCards:[],dealerValue:0,dealerValueTotal:0,play:!1,gameStatus:null,ele:null})},r.saveData=function(e){var t=localStorage.dataGame?JSON.parse(localStorage.dataGame):null;r.setState(t);var a={data:S()(new Date).format("LTS"),status:e,bet:r.state.bet};r.state.dataLastGame.push(a),localStorage.dataGame=JSON.stringify(r.state.dataLastGame)},r.onHistory=function(){if(localStorage.dataGame&&!r.state.ele1){var e=JSON.parse(localStorage.dataGame),t=e.slice(Math.max(e.length-5,0)).reverse();r.renderHtml(t)}},r.renderHtml=function(e){var t=[];e.forEach((function(e){var a=Object(n.jsxs)("li",{children:[e.data," ",e.status," = ",e.bet]});t.push(a)})),r.setState({ele:Object(n.jsx)("div",{className:"dropdown",onClick:r.clear,children:Object(n.jsxs)("ul",{children:[t[0],t[1],t[2],t[3],t[4]]})})})},r.clear=function(){r.setState({ele:null})},r.state={visible:!1,savedState:[],dataLastGame:[],deck:"",chips:1e3,bet:0,playerData:[],playerCards:[],playerValue:0,playerValueTotal:0,dealerData:[],dealerCards:[],dealerValue:0,dealerValueTotal:0,play:!1,gameStatus:null,ele:null},r.passDate=r.passDate.bind(Object(h.a)(r)),r}return Object(o.a)(a,[{key:"passDate",value:function(e){if(e){var t=JSON.parse(JSON.stringify(e));this.setState({deck:t,visible:!0})}}},{key:"componentDidMount",value:function(){var e=this,t=localStorage.table?JSON.parse(localStorage.table):null;this.setState(t),window.onbeforeunload=function(){return e.setState({visible:!1}),localStorage.table=JSON.stringify(e.state),"Do you really want to close?"}}},{key:"render",value:function(){var e=this,t=this.state,a=t.play,r=t.chips,s=t.bet,l=t.dealerData,c=t.playerData,i=t.dealerValue,o=t.playerValue,u=t.dealerValueTotal,d=t.playerValueTotal,b=t.gameStatus,j=t.content,p=t.ele;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(x,{parentCallBack:this.passDate}),Object(n.jsxs)("div",{style:{display:this.state.visible?"block":"none"},children:[Object(n.jsx)(y,{onHistory:this.onHistory,onclickReset:this.onReset,onclickResetGame:this.onresetGame,dealerValue:i,dealerValueTotal:u,dealerData:l.map((function(e){return Object(n.jsx)("img",{alt:"card",src:e.image,height:"150px"},e.code)}))}),j,Object(n.jsx)(k,{playerValue:o,playerValueTotal:d,playerData:c.map((function(e){return Object(n.jsx)("img",{alt:"card",src:e.image,height:"150px"},e.code)}))}),Object(n.jsxs)("div",{className:"bet",children:["Bet: ",s,"$"]}),Object(n.jsxs)("div",{className:"chips",children:["Wallet: ",r,"$"]}),Object(n.jsx)(O,{play:a,bet:s,onclickDeal:this.onDeal,onclickHit:this.onHit,onclickDouDown:this.onDown,onclickStand:this.onStay,onClickBetMin:function(){return e.state.play?null:e.takeBet(5)},onClickBetMid:function(){return e.state.play?null:e.takeBet(15)},onClickBetMax:function(){return e.state.play?null:e.takeBet(30)}}),b?Object(n.jsx)("div",{className:"message",onClick:this.onReset,children:Object(n.jsx)("p",{children:b})}):null,p||null]})]})}}]),a}(s.a.Component),V=(a(40),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return Object(n.jsx)("div",{className:"App",children:Object(n.jsx)(g,{})})}}]),a}(s.a.Component)),N=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,42)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,s=t.getLCP,l=t.getTTFB;a(e),n(e),r(e),s(e),l(e)}))};c.a.render(Object(n.jsx)(s.a.StrictMode,{children:Object(n.jsx)(V,{})}),document.getElementById("root")),N()}},[[41,1,2]]]);
//# sourceMappingURL=main.597a2adf.chunk.js.map