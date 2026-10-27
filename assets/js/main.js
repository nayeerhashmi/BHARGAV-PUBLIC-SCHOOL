document.addEventListener("DOMContentLoaded",function(){var y=document.getElementById("year");if(y)y.textContent=new Date().getFullYear();var t=document.querySelector(".menu-toggle"),n=document.querySelector("header nav");if(t&&n)t.addEventListener("click",function(){var o=n.classList.toggle("open");t.setAttribute("aria-expanded",String(o));});document.querySelectorAll(".nav-trigger").forEach(function(b){b.addEventListener("click",function(e){e.preventDefault();var p=b.closest(".nav-item"),o=p.classList.toggle("open");b.setAttribute("aria-expanded",String(o));});});var s=document.querySelector(".slider");if(s){var root=location.pathname.indexOf("/pages/school/")!==-1?"../../":"";var names=Array.from({length:12},function(_,i){return root+"assets/images/school-gallery/slide-"+(i+1)+".jpg";});Promise.all(names.map(function(src){return new Promise(function(resolve){var im=new Image();im.onload=function(){resolve(src);};im.onerror=function(){resolve(null);};im.src=src;});})).then(function(res){var photos=res.filter(Boolean);if(!photos.length)photos=[root+"bhargav-logo.png"];var track=s.querySelector(".slider-track"),dots=s.querySelector(".slider-dots"),captions=["Learning today. Leading tomorrow.","A place to learn, grow and belong.","Education Is Liberation."];photos.forEach(function(src,i){var sl=document.createElement("div");sl.className="slide"+(!i?" active":"");var im=document.createElement("img");im.src=src;im.alt="Bhargav Public School photo "+(i+1);var cap=document.createElement("div");cap.className="slide-caption";cap.textContent=captions[i%captions.length];sl.append(im,cap);track.append(sl);var d=document.createElement("button");d.type="button";d.setAttribute("aria-label","Show photo "+(i+1));if(!i)d.className="active";dots.append(d);d.addEventListener("click",function(){show(i);restart();});});var slides=Array.from(track.children),ds=Array.from(dots.children),cur=0,timer;function show(i){cur=(i+slides.length)%slides.length;slides.forEach(function(x,j){x.classList.toggle("active",j===cur);});ds.forEach(function(x,j){x.classList.toggle("active",j===cur);});}function restart(){clearInterval(timer);if(slides.length>1&&!matchMedia("(prefers-reduced-motion: reduce)").matches)timer=setInterval(function(){show(cur+1);},5000);}s.querySelector(".slider-prev").addEventListener("click",function(){show(cur-1);restart();});s.querySelector(".slider-next").addEventListener("click",function(){show(cur+1);restart();});restart();});}var items=document.querySelectorAll("section,.strip,footer,.page-body,.page-hero");if("IntersectionObserver"in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){items.forEach(function(x){x.classList.add("reveal");});var ob=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("visible");ob.unobserve(e.target);}});},{threshold:.12});items.forEach(function(x){ob.observe(x);});}else items.forEach(function(x){x.classList.add("visible");});});

/* Lightweight page polish: reading progress, back-to-top and header state */
document.addEventListener("DOMContentLoaded",function(){
  var bar=document.createElement("div");bar.className="scroll-progress";bar.setAttribute("aria-hidden","true");bar.innerHTML="<span></span>";document.body.appendChild(bar);
  var fill=bar.firstElementChild,topButton=document.createElement("button");topButton.className="back-to-top";topButton.type="button";topButton.setAttribute("aria-label","Back to top");topButton.title="Back to top";topButton.textContent="↑";document.body.appendChild(topButton);
  var header=document.querySelector("header"),scheduled=false;
  function updateScroll(){var max=document.documentElement.scrollHeight-window.innerHeight,progress=max>0?window.scrollY/max*100:0;fill.style.width=progress+"%";topButton.classList.toggle("visible",window.scrollY>420);if(header)header.classList.toggle("is-scrolled",window.scrollY>12);scheduled=false;}
  window.addEventListener("scroll",function(){if(!scheduled){window.requestAnimationFrame(updateScroll);scheduled=true;}},{passive:true});
  topButton.addEventListener("click",function(){window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});});
  updateScroll();
});


/* Interactive school discovery tabs */
document.addEventListener("DOMContentLoaded",function(){
 var tabs=Array.from(document.querySelectorAll(".explore-tab"));
 var panels=Array.from(document.querySelectorAll(".explore-panel"));
 function activateTab(tab,moveFocus){
  tabs.forEach(function(t){var active=t===tab;t.classList.toggle("active",active);t.setAttribute("aria-selected",String(active));t.setAttribute("tabindex",active?"0":"-1");});
  panels.forEach(function(p){var active=p.id===tab.dataset.panel;p.hidden=!active;p.classList.toggle("active",active);});
  if(moveFocus)tab.focus();
 }
 tabs.forEach(function(tab,index){
  tab.addEventListener("click",function(){activateTab(tab,false);});
  tab.addEventListener("keydown",function(e){
   if(["ArrowRight","ArrowLeft","Home","End"].indexOf(e.key)===-1)return;
   e.preventDefault();var next=index;
   if(e.key==="ArrowRight")next=(index+1)%tabs.length;
   if(e.key==="ArrowLeft")next=(index+tabs.length-1)%tabs.length;
   if(e.key==="Home")next=0;if(e.key==="End")next=tabs.length-1;
   activateTab(tabs[next],true);
  });
 });
 if(tabs.length)tabs.forEach(function(t,i){t.setAttribute("tabindex",i===0?"0":"-1");});
 /* Keep the FAQ tidy by allowing one answer open at a time. */
 document.querySelectorAll(".faq-item").forEach(function(item){
  item.addEventListener("toggle",function(){
   if(!item.open)return;
   document.querySelectorAll(".faq-item").forEach(function(other){if(other!==item)other.open=false;});
  });
 });
});
