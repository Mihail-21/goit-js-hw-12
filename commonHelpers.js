import{a as v,S as x,i as a}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const d of t.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function s(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(r){if(r.ep)return;r.ep=!0;const t=s(r);fetch(r.href,t)}})();async function m(o,e){const s="42458886-d6d62fa6987d6f72b0a5e97bb",n="https://pixabay.com/api/";return(await v.get(n,{params:{per_page:15,page:e,key:s,q:o,image_type:"photo",safesearch:"true",orientation:"horizontal"}})).data}function h(o){return o.map(e=>`
        <li class="gallery-item">
          <div class="gallery-box item-card-wrapper">
            <a class="gallery-link" href="${e.largeImageURL}">
              <img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}" loading="lazy">
            </a>
            <div class="card-box">
              <div>
                <p class="card-box-text"><b>Likes</b></p>
                <p class="card-box-text">${e.likes}</p>
              </div>
              <div>
                <p class="card-box-text"><b>Views</b></p>
                <p class="card-box-text">${e.views}</p>
              </div>
              <div>
                <p class="card-box-text"><b>Comments</b></p>
                <p class="card-box-text">${e.comments}</p>
              </div>
              <div>
                <p class="card-box-text"><b>Downloads</b></p>
                <p class="card-box-text">${e.downloads}</p>
              </div>
            </div>
          </div>
        </li>`).join("")}const y=new x(".gallery a",{captionsData:"alt",captionDelay:250}),c=document.querySelector(".gallery"),b=document.querySelector(".loader"),p=document.querySelector(".btn-more");let u=1,l=null,i=!1;g();f();async function L(o){if(o.preventDefault(),l=document.querySelector('.form input[name="query"]').value.trim(),u=1,c.innerHTML="",l===""){a.warning({message:"Please enter a search query.",messageColor:"black",backgroundColor:"#FFAC26",position:"topRight",pauseOnHover:!1,progressBarColor:"black",timeout:3e3});return}F(),i=!0;try{const s=(await m(l,u)).hits;s.length===0&&a.error({theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",pauseOnHover:!1,progressBarColor:"#B51B1B",timeout:3e3}),c.innerHTML=h(s),s.length<15?(f(),a.info({theme:"dark",message:"We're sorry, but you've reached the end of search results.",messageColor:"#FFFFFF",backgroundColor:"#1F79FF",position:"topRight",pauseOnHover:!1,progressBarColor:"black",timeout:3e3})):C(),y.refresh()}catch{a.error({theme:"dark",message:"Sorry, there was an error fetching images. Please try again!",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",pauseOnHover:!1,progressBarColor:"#B51B1B",timeout:3e3})}finally{g(),i=!1,document.querySelector(".form").reset()}}document.querySelector(".form").addEventListener("submit",L);p.addEventListener("click",async()=>{if(!i)try{F(),i=!0;const e=(await m(l,++u)).hits;c.insertAdjacentHTML("beforeend",h(e)),y.refresh(),e.length<15&&(f(),a.info({theme:"dark",message:"We're sorry, but you've reached the end of search results.",messageColor:"#FFFFFF",backgroundColor:"#1F79FF",position:"topRight",pauseOnHover:!1,progressBarColor:"black",timeout:3e3}));const s=c.firstElementChild.getBoundingClientRect().height;scrollBy({behavior:"smooth",top:s*2})}catch(o){throw new Error(o.status)}finally{g(),i=!1}});function C(){p.classList.remove("is-hidden")}function f(){p.classList.add("is-hidden")}function F(){b.style.display="block"}function g(){b.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
