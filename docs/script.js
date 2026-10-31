(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(s,r){return (r||document).querySelector(s)};
  var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  /* reveal on scroll */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.15});
  $$('.reveal').forEach(function(el){ io.observe(el); });

  /* count up */
  var cio = new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      var el=e.target, to=+el.dataset.count, t0=null;
      function step(t){ t0=t0||t; var p=Math.min((t-t0)/1400,1); el.textContent=Math.round(to*(1-Math.pow(1-p,3))); if(p<1) requestAnimationFrame(step); }
      reduce ? el.textContent=to : requestAnimationFrame(step);
      cio.unobserve(el);
    });
  },{threshold:.6});
  $$('[data-count]').forEach(function(el){ cio.observe(el); });

  /* nav, progress, parallax */
  var nav=$('#nav'), bar=$('#bar'), par=$$('[data-parallax]'), ticking=false;
  function onScroll(){
    var y=window.scrollY, h=document.documentElement.scrollHeight-innerHeight;
    nav.classList.toggle('stuck', y>40);
    bar.style.width=(h>0? y/h*100:0)+'%';
    if(!reduce){
      par.forEach(function(el){
        var r=el.getBoundingClientRect();
        if(r.bottom<-200||r.top>innerHeight+200) return;
        var f=parseFloat(el.dataset.parallax), c=r.top+r.height/2-innerHeight/2;
        var isImg = el.classList.contains('craft-img');
        if(isImg){ el.firstElementChild.style.transform='translateY('+(-c*f)+'px)'; }
        else if(el.classList.contains('hero-bg')||el.classList.contains('final-bg')){ el.style.translate='0 '+(-c*f)+'px'; }
        else { el.style.marginTop=(c*f)+'px'; }
      });
    }
    ticking=false;
  }
  addEventListener('scroll',function(){ if(!ticking){ticking=true;requestAnimationFrame(onScroll);} },{passive:true});
  onScroll();

  if($('#range')){
  /* range selector */
  var V=[
    {t:'milk',tag:'MILK',n:'Milk Chocolate',bn:'মিল্ক চকলেট',d:'Cream panel, caramel ring. Smooth and gentle, the one that welcomes everyone.',img:'assets/pack-milk.webp',alt:'Milk chocolate bar'},
    {t:'dark',tag:'DARK',n:'Dark Chocolate',bn:'ডার্ক চকলেট',d:'Cocoa panel, deep ring. Rich and full, made for those who love the real thing.',img:'assets/pack-dark.webp',alt:'Dark chocolate bar'},
    {t:'dark90',tag:'90% DARK',n:'90% Dark Chocolate',bn:'ডার্ক চকলেট ৯০%',d:'Cocoa black panel. The most intense bar in the range, pure and uncompromising.',img:'assets/pack-dark90.webp',alt:'90 percent dark chocolate bar'},
    {t:'white',tag:'WHITE',n:'White Chocolate',bn:'হোয়াইট চকলেট',d:'White panel, ivory ring. Creamy, soft and quietly indulgent.',img:'assets/pack-white.webp',alt:'White chocolate bar'}
  ];
  var cur=0, range=$('#range'), img=$('#packImg'), info=$('#info'), chips=$$('#chips button');
  function show(i){
    cur=(i+V.length)%V.length; var v=V[cur];
    range.dataset.theme=v.t;
    img.classList.remove('swap'); void img.offsetWidth;
    img.src=v.img; img.alt=v.alt; img.classList.add('swap');
    $('#vTag').textContent=v.tag; $('#vName').textContent=v.n; $('#vBn').textContent=v.bn; $('#vDesc').textContent=v.d;
    info.classList.remove('fade'); void info.offsetWidth; info.classList.add('fade');
    chips.forEach(function(c,k){ c.classList.toggle('on',k===cur); c.setAttribute('aria-selected',k===cur); });
  }
  chips.forEach(function(c){ c.addEventListener('click',function(){ show(+c.dataset.i); }); });
  $('.arrow.prev').addEventListener('click',function(){ show(cur-1); });
  $('.arrow.next').addEventListener('click',function(){ show(cur+1); });
  V.forEach(function(v){ var p=new Image(); p.src=v.img; });

  /* 3D tilt on pack */
  var stage=$('#packStage');
  if(!reduce && matchMedia('(hover:hover)').matches){
    stage.addEventListener('mousemove',function(e){
      var r=stage.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      img.style.transform='rotateY('+(x*24)+'deg) rotateX('+(-y*18)+'deg)';
    });
    stage.addEventListener('mouseleave',function(){ img.style.transform=''; });
  }

  }

  /* floating cocoa nibs / gold dust */
  var cv=$('#nibs');
  if(!reduce && cv){
    var ctx=cv.getContext('2d'), W,H, P=[], N=innerWidth<700?18:38;
    function size(){ W=cv.width=innerWidth; H=cv.height=innerHeight; }
    size(); addEventListener('resize',size);
    for(var i=0;i<N;i++) P.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*2.2+.6,s:Math.random()*.35+.08,a:Math.random()*6.28,g:Math.random()>.45});
    (function loop(){
      ctx.clearRect(0,0,W,H);
      P.forEach(function(p){
        p.y-=p.s; p.a+=.01; p.x+=Math.sin(p.a)*.3;
        if(p.y<-10){ p.y=H+10; p.x=Math.random()*W; }
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,6.28);
        ctx.fillStyle=p.g?'rgba(200,164,110,.7)':'rgba(181,92,39,.55)'; ctx.fill();
      });
      requestAnimationFrame(loop);
    })();
  }
})();
