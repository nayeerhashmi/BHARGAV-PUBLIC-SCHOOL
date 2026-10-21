document.addEventListener("DOMContentLoaded",function(){
const select=document.getElementById("monthSelect"),view=document.getElementById("monthView"),eventsBox=document.getElementById("monthEvents");
const holidays=[
["2026-04-14","Baisakhi and Dr. B.R. Ambedkar Jayanti","holiday"],
["2026-05-01","Buddha Purnima","holiday"],
["2026-05-27","Eid-ul-Azha (moon-dependent)","holiday"],
["2026-05-28","Eid-ul-Azha (moon-dependent)","holiday"],
["2026-06-26","Ashoora (moon-dependent)","holiday"],
["2026-07-05","Guru Hargobind Ji’s Birthday","holiday"],
["2026-08-15","Independence Day","holiday"],
["2026-08-26","Eid-i-Milad-ul-Nabi (moon-dependent)","holiday"],
["2026-08-28","Friday following Eid-i-Milad-ul-Nabi (moon-dependent)","holiday"],
["2026-09-04","Janamashtami","holiday"],
["2026-09-23","Birthday of Maharaja Hari Singh Ji","holiday"],
["2026-10-02","Mahatma Gandhi’s Birthday","holiday"],
["2026-10-20","Mahanavami / Dussehra","holiday"],
["2026-10-26","Accession Day","holiday"],
["2026-11-08","Diwali","holiday"],
["2026-11-24","Guru Nanak Dev Ji’s Birthday","holiday"],
["2026-12-25","Christmas Day","holiday"],
["2027-01-26","Republic Day","activity"]
];
const activities=[
["2026-04-22","Earth Day","activity"],["2026-05-08","Red Cross Day","activity"],["2026-05-31","World No Tobacco Day","activity"],["2026-06-05","World Environment Day","activity"],["2026-06-21","International Yoga Day","activity"],["2026-06-26","Anti-Drug Abuse Day","activity"],["2026-07-22","School activity planning / enrolment follow-up","activity"],["2026-08-29","National Sports Day","activity"],["2026-09-05","Teachers’ Day","activity"],["2026-09-08","World Literacy Day","activity"],["2026-09-14","Hindi Diwas","activity"],["2026-10-14","Children’s Day activity planning","activity"],["2026-11-14","Children’s Day","activity"],["2026-11-26","Constitution Day","activity"],["2026-12-22","National Mathematics Day","activity"],["2027-01-26","Republic Day celebration","activity"],["2027-03-08","International Women’s Day","activity"],["2027-03-22","World Water Day","activity"]];
const exams=[
["2026-05-04","Formative Assessment 1 · first week (indicative)","exam"],
["2026-08-03","Formative Assessment 2 · first week (indicative)","exam"],
["2026-09-14","Formative Assessment 3 · third week (indicative)","exam"],
["2026-11-02","Formative Assessment 4 · first week (indicative)","exam"],
["2026-12-07","Formative Assessment 5 · second week (indicative)","exam"],
["2027-01-25","Formative Assessment 6 · last week (indicative)","exam"],
["2027-03-08","Summative Assessment · second week (indicative)","exam"]];
const all=[...holidays,...activities,...exams];
const months=[];for(let y=2026,m=3;y<2027||(y===2027&&m<3);){months.push({y,m});m++;if(m>11){m=0;y++;}}
const key=(y,m,d)=>y+"-"+String(m+1).padStart(2,"0")+"-"+String(d).padStart(2,"0");
months.forEach((x,i)=>{const o=document.createElement("option");o.value=i;o.textContent=new Date(x.y,x.m,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"});select.append(o);});
function render(){
const x=months[Number(select.value)||0],first=new Date(x.y,x.m,1).getDay(),last=new Date(x.y,x.m+1,0).getDate();
view.replaceChildren();const title=document.createElement("div");title.className="month-title";title.textContent=new Date(x.y,x.m,1).toLocaleDateString("en-IN",{month:"long",year:"numeric"});view.append(title);
const week=document.createElement("div");week.className="weekdays";["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(d=>{const s=document.createElement("span");s.textContent=d;week.append(s);});view.append(week);
const days=document.createElement("div");days.className="days";
for(let i=0;i<first;i++){const d=document.createElement("div");d.className="day empty";days.append(d);}
for(let d=1;d<=last;d++){const cell=document.createElement("div");cell.className="day";const n=document.createElement("span");n.className="day-number";n.textContent=d;cell.append(n);const todays=all.filter(e=>e[0]===key(x.y,x.m,d));if(todays.length){if(todays.some(e=>e[2]==="holiday"))cell.classList.add("holiday");else if(todays.some(e=>e[2]==="activity"))cell.classList.add("activity");if(todays.some(e=>e[2]==="exam"))cell.classList.add("exam");todays.forEach(e=>{const label=document.createElement("span");label.className="day-label";label.textContent=e[1];cell.append(label);});}days.append(cell);}
while(days.children.length%7){const d=document.createElement("div");d.className="day empty";days.append(d);}view.append(days);
const monthly=all.filter(e=>e[0].startsWith(x.y+"-"+String(x.m+1).padStart(2,"0")));
eventsBox.replaceChildren();const h=document.createElement("h3");h.textContent="Dates and activities this month";eventsBox.append(h);const ul=document.createElement("ul");
if(!monthly.length){const p=document.createElement("p");p.className="empty-message";p.textContent="No government holiday or scheduled observance is listed here for this month. The school may announce additional events.";eventsBox.append(p);return;}
monthly.sort((a,b)=>a[0].localeCompare(b[0])).forEach(e=>{const li=document.createElement("li");const date=new Date(e[0]+"T12:00:00").toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"});li.textContent=date+" — "+e[1];ul.append(li);});eventsBox.append(ul);
}
select.addEventListener("change",render);select.value=String(months.findIndex(x=>x.y===2026&&x.m===9));render();
});