(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var c=t(1),r=t.n(c),o=t(16),s=t.n(o),a=t(3),i=t(0),u=function(e){var n=e.eventHandler;return Object(i.jsxs)("div",{children:[" filter shown with ",Object(i.jsx)("input",{onChange:n})," "]})},l=function(e){var n=e.submitHandler,t=e.nameHandler,c=e.numberHandler,r=e.newName,o=e.newNumber;return Object(i.jsx)("div",{children:Object(i.jsxs)("form",{onSubmit:n,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:r,onChange:t})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:o,onChange:c})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})})},d=function(e){var n=e.filteredPersons,t=e.handleDelete;return Object(i.jsx)("div",{children:n.map((function(e){return Object(i.jsxs)("p",{children:[e.name," ",e.number,Object(i.jsx)("button",{onClick:function(){return t(e)},children:"delete"})]},e.id)}))})},j=t(4),f=t.n(j),b="/api/persons",h={getAll:function(){return f.a.get(b).then((function(e){return e.data}))},create:function(e){return f.a.post(b,e).then((function(e){return e.data}))},del:function(e){return f.a.delete("".concat(b,"/").concat(e.id)).then((function(){return console.log("person deleted is",e)})).catch((function(n){return console.log("".concat(e.name," is already deleted"),n)}))},update:function(e,n){return f.a.put("".concat(b,"/").concat(e.id),n).then((function(e){return e.data})).catch((function(e){return console.log("update failed",e)}))}},m=function(e){var n=e.notification;return console.log("the notification is ",n),""===n.message?null:"success"===n.type?Object(i.jsx)("div",{className:"success",children:n.message}):"fail"===n.type?Object(i.jsx)("div",{className:"error",children:n.message}):void 0},p=function(){var e=Object(c.useState)([]),n=Object(a.a)(e,2),t=n[0],r=n[1],o=Object(c.useState)(""),s=Object(a.a)(o,2),j=s[0],f=s[1],b=Object(c.useState)(""),p=Object(a.a)(b,2),O=p[0],g=p[1],v=Object(c.useState)([]),x=Object(a.a)(v,2),w=x[0],y=x[1],H=Object(c.useState)({message:"",type:""}),C=Object(a.a)(H,2),N=C[0],S=C[1];Object(c.useEffect)((function(){h.getAll().then((function(e){console.log("response is ",e),r(e),y(e)}))}),[]);return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(m,{notification:N}),Object(i.jsx)(u,{eventHandler:function(e){var n=e.target.value.toUpperCase();if(console.log("filter is ",n),""!==n){var c=t.filter((function(e){return e.name.toUpperCase().includes(n)}));console.log("list of filtered persons",c),y(c)}else y(t)}}),Object(i.jsx)("h2",{children:" add a new "}),Object(i.jsx)(l,{submitHandler:function(e){e.preventDefault();t.find((function(e){return e.name===j}));var n={name:j,number:O};h.create(n).then((function(e){r(t.concat(e)),f(""),g("")})).then((function(){S({message:"Created person ".concat(n.name," successfully"),type:"success"}),setTimeout((function(){S({message:"",type:""})}),5e3)})).catch((function(e){console.log(e.response.data),S({message:"error creating new person ".concat(e),type:"fail"}),setTimeout((function(){S({message:"",type:""})}),5e3)}))},nameHandler:function(e){return f(e.target.value)},numberHandler:function(e){return g(e.target.value)},newName:j,newNumber:O}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(d,{filteredPersons:w,handleDelete:function(e){window.confirm("Delete ".concat(e.name,"?"))&&h.del(e).then(r(t.filter((function(n){return n.id!==e.id}))))}})]})};t(40);s.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(p,{})}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.5c771c69.chunk.js.map