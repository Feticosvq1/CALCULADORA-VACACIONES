const $=id=>document.getElementById(id);
const annual={x1:22,x2:22,x3:22,x4:22,x5:22,x6:18,x7:22,x8:18,x9:15,x10:22};
const fmt=n=>new Intl.NumberFormat('es-ES',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
function calculate(){
 const shift=$('shift').value, start=$('start').value, end=$('end').value, taken=Math.max(0,Math.floor(Number($('taken').value)||0));
 if(!start||!end){return}
 const s=new Date(start+'T12:00:00'), e=new Date(end+'T12:00:00');
 if(e<s){$('rest').textContent='Revisa las fechas';$('breakdown').innerHTML='<div class="row"><span>La fecha fin debe ser igual o posterior al inicio.</span></div>';return}
 const days=Math.floor((e-s)/86400000)+1;
 // Prorrateo por días naturales del año, contando ambos extremos del contrato.
 const yearDays=(new Date(s.getFullYear(),1,29).getMonth()===1)?366:365;
 const accrued=days/yearDays*annual[shift];
 const rounded=Math.round(accrued);
 const remaining=rounded-taken;
 $('earned').textContent=fmt(accrued)+' días';
 $('rounded').textContent=rounded+' días';
 $('takenShow').textContent=taken+' días';
 $('rest').textContent=remaining+' días';
 $('breakdown').innerHTML=[
 ['Turno',shift.toUpperCase()],
 ['Vacaciones anuales asignadas',annual[shift]+' días'],
 ['Inicio de contrato',s.toLocaleDateString('es-ES')],
 ['Fin de contrato',e.toLocaleDateString('es-ES')],
 ['Días naturales del periodo (incluidos inicio y fin)',days],
 ['Vacaciones generadas',fmt(accrued)+' días'],
 ['Vacaciones redondeadas',rounded+' días'],
 ['Vacaciones disfrutadas',taken+' días'],
 ['RESTO PENDIENTE',remaining+' días']
 ].map(([a,b])=>`<div class="row"><span>${a}</span><b>${b}</b></div>`).join('');
}
document.querySelectorAll('input,select').forEach(el=>{el.addEventListener('input',calculate);el.addEventListener('change',calculate)});calculate();