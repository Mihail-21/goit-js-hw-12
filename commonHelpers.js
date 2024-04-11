import{a as v,S as x,i as s}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(r){if(r.ep)return;r.ep=!0;const t=a(r);fetch(r.href,t)}})();async function g(o,e){const a="42458886-d6d62fa6987d6f72b0a5e97bb",i="https://pixabay.com/api/";return(await v.get(i,{params:{per_page:15,page:e,key:a,q:o,image_type:"photo",safesearch:"true",orientation:"horizontal"}})).data}function y(o){return o.map(e=>`
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
        </li>`).join("")}const h=new x(".gallery a",{captionsData:"alt",captionDelay:250}),d=document.querySelector(".gallery"),b=document.querySelector(".loader"),p=document.querySelector(".btn-more");let u=1,l=null,n=!1;m();f();async function L(o){if(o.preventDefault(),l=document.querySelector('.form input[name="query"]').value.trim(),u=1,d.innerHTML="",l===""){s.warning({message:"Please enter a search query.",messageColor:"black",backgroundColor:"#FFAC26",position:"topRight",pauseOnHover:!1,progressBarColor:"black",timeout:3e3});return}F(),n=!0;try{const a=(await g(l,u)).hits;a.length===0&&s.error({theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",pauseOnHover:!1,progressBarColor:"#B51B1B",timeout:3e3}),d.innerHTML=y(a),a.length<15?(f(),s.info({theme:"dark",message:"We're sorry, but you've reached the end of search results.",messageColor:"#FFFFFF",backgroundColor:"#1F79FF",position:"topRight",pauseOnHover:!1,progressBarColor:"black",timeout:3e3})):w(),h.refresh()}catch{s.error({theme:"dark",message:"Sorry, there was an error fetching images. Please try again!",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",pauseOnHover:!1,progressBarColor:"#B51B1B",timeout:3e3})}finally{m(),n=!1,document.querySelector(".form").reset()}}document.querySelector(".form").addEventListener("submit",L);p.addEventListener("click",async()=>{if(!n)try{F(),n=!0;const e=(await g(l,++u)).hits;d.insertAdjacentHTML("beforeend",y(e)),h.refresh(),e.length<15&&(f(),s.info({theme:"dark",message:"We're sorry, but you've reached the end of search results.",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",pauseOnHover:!1,progressBarColor:"black",timeout:3e3}))}catch(o){throw new Error(o.status)}finally{m(),n=!1}});function w(){p.classList.remove("is-hidden")}function f(){p.classList.add("is-hidden")}function F(){b.style.display="block"}function m(){b.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
