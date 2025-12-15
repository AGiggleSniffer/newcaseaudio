// ==UserScript==
// @name         New Case Audio
// @tag          audio
// @namespace    http://tampermonkey.net/
// @version      2.0.3
// @description  Audio output when a new case is detected
// @author       Chris
// @match        https://necam.servicenowservices.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=servicenowservices.com
// @grant        none
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/AGiggleSniffer/newcaseaudio/refs/heads/main/dist/index.user.js
// @updateURL    https://raw.githubusercontent.com/AGiggleSniffer/newcaseaudio/refs/heads/main/dist/index.user.js
// ==/UserScript==

(function(e){typeof define==`function`&&define.amd?define([],e):e()})(function(){let e=5e3;function t(){let e=null,t=null,n=null,r=document.querySelector(`[app-id]`);if(!r)return console.warn(`Could not find app element`),{sidebar:e,cases:t,refresh:n};let i=[r];for(;i.length;){let r=i.pop();if(r!=null){try{if(e||=r.querySelector(`sn-canvas-toolbar`),t||=r.querySelector(`tbody`),!n){let e=r.querySelector(`sn-record-list-declarative-actions-wrapper`)?.shadowRoot?.childNodes[0];if(!(e instanceof HTMLElement))throw TypeError(`Not HTMLElement`);n=e?.shadowRoot?.childNodes[0].childNodes[0].childNodes[0].childNodes[0]}}catch(e){e instanceof TypeError?console.error(e):console.warn(e)}if(!e||!t||!n)r?.shadowRoot?.childNodes.forEach(e=>{e instanceof HTMLElement&&i.push(e)}),r?.childNodes.forEach(e=>{e instanceof HTMLElement&&i.push(e)});else break}}return{sidebar:e,cases:t,refresh:n}}function n(e,t,n,r,i){return()=>{n.innerText=`60`,setInterval(()=>{n.innerText=`${Number(n.innerText)-1}`},1e3),setInterval(()=>{n.innerText=`60`,r.click(),console.log(`refresh`),setTimeout(()=>{let n=e.size;t.querySelectorAll(`tr`).forEach(t=>{let n=t.childNodes[2];n instanceof HTMLElement&&e.add(n.dataset.tooltip??``)}),n<e.size&&i.play(),console.log(e)},2e3)},6e4),n.disabled=!0}}var r=()=>{let e=document.createElement(`button`);return e.innerText=`Start Timer`,e.style.margin=`auto`,e.style.backgroundColor=`blue`,e};console.warn(`Waiting ${e/1e3} seconds to start...`),setTimeout(i,e);function i(){let{sidebar:e,cases:i,refresh:a}=t();if(!e||!i||!a){console.warn(`Could not find all elements`),console.log({sidebar:e,cases:i,refresh:a});return}let o=r();e.shadowRoot?.querySelector(`div.sn-canvas-toolbar-group`)?.appendChild(o),o.onclick=n(new Set,i,o,a,new Audio(`https://dw.zobj.net/download/v1/bIhGBewc6ZkspxCSDinGP9RFZDTmSQ3aydiirpCl22grL9AXh3Q7zi7Zx8tqM5bzBWyDuSBRgjAi0oZvYJ3-fGzkmY2F0ChxpxrQplO9aaVZjMY2SeT_WD9BWCfw/?a=&c=72&f=arc_probe.mp3&special=1764697421-9X3DBzgUwkBYR1umAkIktfg9dQepMu5f4Rru3fVJQwo%3D`))}});