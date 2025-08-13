import{a as m,S as y,i as a}from"./assets/vendor-5YrzWRhu.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const h="51722729-ee26f011f433678f7a46d3d5a",g="https://pixabay.com/api/";async function b(n){try{return(await m.get(g,{params:{key:h,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data}catch(r){throw r}}const u=document.querySelector(".gallery"),d=document.querySelector(".loader"),L=new y(".gallery a",{captionsData:"alt",captionDelay:250});function S(n){const r=n.map(({webformatURL:o,largeImageURL:s,tags:e,likes:t,views:i,comments:f,downloads:p})=>`
    <li class="gallery-item">
      <a href="${s}">
        <img src="${o}" alt="${e}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${t}</p>
        <p><b>Views:</b> ${i}</p>
        <p><b>Comments:</b> ${f}</p>
        <p><b>Downloads:</b> ${p}</p>
      </div>
    </li>`).join("");u.insertAdjacentHTML("beforeend",r),L.refresh()}function q(){u.innerHTML=""}function w(){d.classList.remove("loader-hidden")}function l(){d.classList.add("loader-hidden")}const c=document.querySelector(".form"),v=c.querySelector('input[name="search-text"]');c.addEventListener("submit",P);function P(n){n.preventDefault();const r=v.value.trim();if(r===""){a.error({title:"Error",message:"Search query cannot be empty",position:"topRight"});return}q(),w(),b(r).then(o=>{if(l(),o.hits.length===0){a.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}S(o.hits),c.reset()}).catch(o=>{l(),a.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(o)})}
//# sourceMappingURL=index.js.map
