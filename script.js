(() => {
const slides=[...document.querySelectorAll('.slide')];
const prev=document.getElementById('prev'), next=document.getElementById('next');
const counter=document.getElementById('counter'), progress=document.getElementById('progress');
let i=0;
function show(n){
  i=(n+slides.length)%slides.length;
  slides.forEach((s,j)=>s.classList.toggle('active',j===i));
  counter.textContent=`${i+1} / ${slides.length}`;
  progress.style.width=`${(i+1)/slides.length*100}%`;
  try{history.replaceState(null,'',`#slide-${i+1}`)}catch(e){}
}
prev.addEventListener('click',()=>show(i-1));
next.addEventListener('click',()=>show(i+1));
document.addEventListener('keydown',e=>{
  if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();show(i+1)}
  else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();show(i-1)}
});
let x=null;
document.addEventListener('touchstart',e=>{x=e.touches[0]?.clientX??null},{passive:true});
document.addEventListener('touchend',e=>{
  if(x===null)return;
  const d=(e.changedTouches[0]?.clientX??x)-x;
  if(Math.abs(d)>60)show(i+(d<0?1:-1));
  x=null;
},{passive:true});
const m=location.hash.match(/slide-(\d+)/);
show(m?Math.max(0,Math.min(slides.length-1,+m[1]-1)):0);
})();