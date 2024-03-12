import{a as h,S as b,i as c}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}})();async function p(r,e){const a="42458886-d6d62fa6987d6f72b0a5e97bb",l="https://pixabay.com/api/";return(await h.get(l,{params:{per_page:15,page:e,key:a,q:r,IMAGE_TYPE:"photo",SAFESEARCH:"true",ORIENTATION:"horizontal"}})).data}function m(r){return r.map(e=>`
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
        </li>`).join("")}const y=new b(".gallery a",{captionsData:"alt",captionDelay:250}),s={form:document.querySelector(".form"),gallery:document.querySelector(".list"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".btn-more")};let d=1,n=null;u();f();async function v(r){if(r.preventDefault(),n=s.form.elements.query.value.trim(),d=1,s.gallery.innerHTML="",n===""){c.warning({message:"Please enter a search query.",messageColor:"black",backgroundColor:"#ffac26",position:"topRight",pauseOnHover:!1,progressBarColor:"black",timeout:3e3});return}g();const e=await p(n,d);try{const a=e.hits;s.gallery.innerHTML=m(a),a.length<15?f():x(),y.refresh()}catch{c.error({theme:"dark",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#ffffff",backgroundColor:"#ef4040",position:"topRight",pauseOnHover:!1,progressBarColor:"#b51b1b",timeout:3e3})}finally{u(),s.form.reset()}}s.form.addEventListener("submit",v);s.loadMoreBtn.addEventListener("click",async()=>{try{g();const r=await p(n,++d),e=document.querySelectorAll(".gallery-item").length;s.gallery.insertAdjacentHTML("beforeend",m(r.hits));const a=document.querySelectorAll(".gallery-item");a.length>e&&a[e].scrollIntoView({block:"start",behavior:"smooth"}),y.refresh(),r.hits.length<15&&(f(),c.info({theme:"dark",message:"We're sorry, but you've reached the end of search results.",messageColor:"#ffffff",backgroundColor:"#1f79ff",position:"topRight",pauseOnHover:!1,progressBarColor:"black",timeout:3e3}))}catch(r){throw new Error(r.status)}finally{u()}});function x(){s.loadMoreBtn.classList.remove("is-hidden")}function f(){s.loadMoreBtn.classList.add("is-hidden")}function g(){s.loader.style.display="block"}function u(){s.loader.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
