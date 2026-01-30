const STATE={user:null,workouts:[],foods:[],goals:[],hydration:[],selectedWorkoutType:'Walking'};
let isRecording=false,recognition=null;
let trackTimer=null,trackStart=0,gpsWatch=null,lastPos=null,isTracking=false,isPaused=false,pausedTime=0,mapUpdateTimer=null;

function load(){const s=localStorage.getItem('hm_data');if(s){try{Object.assign(STATE,JSON.parse(s));}catch(e){}}}
function save(){try{localStorage.setItem('hm_data',JSON.stringify(STATE));}catch(e){}}

function goTo(s){
    document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));
    document.getElementById(s).classList.add('active');
    if(s==='workout'){
        if(isTracking){
            document.getElementById('workout-selection').style.display='none';
            document.getElementById('workout-tracking').style.display='flex';
        }else{
            document.getElementById('workout-selection').style.display='block';
            document.getElementById('workout-tracking').style.display='none';
        }
    }
    if(s==='dashboard')updateDash();
    if(s==='goals')updateGoals();
    if(s==='nutrition')updateNutrition();
    if(s==='coach'){
        const voiceBtn=document.getElementById('voice-btn');
        voiceBtn.innerHTML='<svg id="voice-icon" viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3" fill="white"/><path d="M5 10v2a7 7 0 0 0 14 0v-2" stroke="white" stroke-width="2" fill="none"/><line x1="12" y1="19" x2="12" y2="23" stroke="white" stroke-width="2"/><line x1="8" y1="23" x2="16" y2="23" stroke="white" stroke-width="2"/></svg>';
        voiceBtn.classList.remove('listening','processing');
        setTimeout(()=>{document.getElementById('chat').scrollTop=document.getElementById('chat').scrollHeight;},100);
    }
}

function nav(el,s){
    document.querySelectorAll('.nav-item, .nav-hero').forEach(x=>x.classList.remove('active'));
    if(el)el.classList.add('active');
    else document.querySelector('.nav-hero').classList.add('active');
    goTo(s);
}

function signup(){
    const name=document.getElementById('signup-name').value.trim();
    const email=document.getElementById('signup-email').value.trim();
    const pass=document.getElementById('signup-password').value;
    const err=document.getElementById('signup-error');
    if(!name||!email||!pass){err.textContent='Please fill all fields';return;}
    if(pass.length<6){err.textContent='Password must be 6+ characters';return;}
    if(localStorage.getItem('u_'+email)){err.textContent='Email already registered';return;}
    localStorage.setItem('u_'+email,JSON.stringify({name,email,pass}));
    alert('Account created! Please login.');
    goTo('login');
}

function login(){
    const email=document.getElementById('login-email').value.trim();
    const pass=document.getElementById('login-password').value;
    const err=document.getElementById('login-error');
    if(!email||!pass){err.textContent='Please enter email and password';return;}
    const data=localStorage.getItem('u_'+email);
    if(!data){err.textContent='Account not found';return;}
    const user=JSON.parse(data);
    if(user.pass!==pass){err.textContent='Incorrect password';return;}
    STATE.user=user;save();goTo('dashboard');
}

function updateDash(){
    if(!STATE.user)return;
    document.getElementById('dash-name').textContent=STATE.user.name.split(' ')[0];
    let steps=0,dist=0,cal=0;
    STATE.workouts.forEach(w=>{steps+=w.steps||0;dist+=w.distance||0;cal+=w.calories||0;});
    if(isTracking && STATE.tracking){steps+=STATE.tracking.steps||0;dist+=STATE.tracking.distance||0;cal+=STATE.tracking.calories||0;}
    document.getElementById('dist-val').textContent=dist.toFixed(1);
    document.getElementById('workout-val').textContent=STATE.workouts.length;
    const circ=326.7;
    document.getElementById('steps-ring').style.strokeDashoffset=circ-(Math.min(steps/10000,1)*circ);
    document.getElementById('steps-txt').textContent=steps.toLocaleString();
    document.getElementById('cal-ring').style.strokeDashoffset=circ-(Math.min(cal/500,1)*circ);
    document.getElementById('cal-txt').textContent=Math.floor(cal);
    const bars=document.getElementById('weekly-bars');
    bars.innerHTML='';
    [40,60,30,80,50,90,70].forEach((h,i)=>{
        const bar=document.createElement('div');
        bar.className='bar';
        bar.style.height=h+'%';
        const lbl=document.createElement('div');
        lbl.className='bar-label';
        lbl.textContent=['M','T','W','T','F','S','S'][i];
        bar.appendChild(lbl);
        bars.appendChild(bar);
    });
    let totalCal=0;
    if(STATE.foods)STATE.foods.forEach(f=>totalCal+=f.calories||0);
    const goal=2000;
    const remaining=goal-totalCal+cal;
    document.getElementById('dash-cal-remaining').textContent=Math.max(0,Math.round(remaining));
    document.getElementById('dash-nutr-subtitle').textContent=`Eaten: ${totalCal} cal | Burned: ${Math.round(cal)} cal`;
    const goalDisplay=document.getElementById('dash-goal-display');
    if(STATE.goals && STATE.goals.length>0){
        const g=STATE.goals[0];
        const elapsed=Math.floor((Date.now()-new Date(g.created).getTime())/(1000*60*60*24));
        const remaining=Math.max(0,g.days-elapsed);
        const progress=Math.min(100,(elapsed/g.days)*100);
        goalDisplay.innerHTML=`<div class="list-item"><div class="list-item-info"><div class="list-item-title">${g.title}</div><div class="list-item-subtitle">${remaining} days remaining</div></div><div class="list-item-value">${Math.round(progress)}%</div></div>`;
    }else{
        goalDisplay.innerHTML='<div class="list-item"><div class="list-item-info"><div class="list-item-title">No goals set</div><div class="list-item-subtitle">Tap Goals to set your first goal</div></div></div>';
    }
}

function selectWorkoutType(type,el){
    STATE.selectedWorkoutType=type;
    document.querySelectorAll('.workout-type').forEach(x=>x.classList.remove('selected'));
    el.classList.add('selected');
}

function startWorkout(){
    if(isTracking)return;
    STATE.tracking={type:STATE.selectedWorkoutType,start:Date.now(),distance:0,steps:0,calories:0,speeds:[]};
    isTracking=true;
    isPaused=false;
    document.getElementById('tracking-indicator').style.display='block';
    document.getElementById('workout-selection').style.display='none';
    document.getElementById('workout-tracking').style.display='flex';
    document.getElementById('workout-type-label').textContent=STATE.selectedWorkoutType;
    trackStart=Date.now();
    trackTimer=setInterval(()=>{updateTimer();updateTrackDisplay();updateDash();},1000);
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            pos=>{
                lastPos={lat:pos.coords.latitude,lon:pos.coords.longitude,time:Date.now(),alt:pos.coords.altitude||0};
                updateMapSmooth(lastPos.lat,lastPos.lon);
                gpsWatch=navigator.geolocation.watchPosition(
                    pos=>{
                        if(!isPaused){
                            const curr={lat:pos.coords.latitude,lon:pos.coords.longitude,time:Date.now(),alt:pos.coords.altitude||0};
                            if(lastPos){
                                const d=dist(lastPos.lat,lastPos.lon,curr.lat,curr.lon);
                                const timeDiff=(curr.time-lastPos.time)/1000;
                                const speed=timeDiff>0?(d/timeDiff)*3600:0;
                                STATE.tracking.distance+=d;
                                STATE.tracking.speeds.push(speed);
                                if(STATE.selectedWorkoutType==='Walking'){
                                    STATE.tracking.steps+=Math.floor(d*1315);
                                    STATE.tracking.calories+=d*65;
                                }else if(STATE.selectedWorkoutType==='Running'){
                                    STATE.tracking.steps+=Math.floor(d*1570);
                                    STATE.tracking.calories+=d*100;
                                }else if(STATE.selectedWorkoutType==='Cycling'){
                                    const avgSpeed=STATE.tracking.speeds.reduce((a,b)=>a+b,0)/STATE.tracking.speeds.length;
                                    STATE.tracking.calories+=d*40*Math.max(1,avgSpeed/15);
                                }else if(STATE.selectedWorkoutType==='Hiking'){
                                    const altGain=Math.max(0,curr.alt-lastPos.alt);
                                    STATE.tracking.steps+=Math.floor(d*1315);
                                    STATE.tracking.calories+=d*70+altGain*0.05;
                                }
                            }
                            lastPos=curr;
                            updateMapSmooth(curr.lat,curr.lon);
                        }
                    },
                    err=>console.error('GPS:',err),
                    {enableHighAccuracy:true,timeout:10000,maximumAge:0}
                );
            },
            err=>{alert('Please enable GPS');}
        );
    }
}

function updateMapSmooth(lat,lon){
    if(mapUpdateTimer)clearTimeout(mapUpdateTimer);
    mapUpdateTimer=setTimeout(()=>{
        const mapFrame=document.getElementById('map-frame');
        const mapPlaceholder=document.getElementById('map-placeholder');
        mapFrame.src=`https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.005},${lat-0.005},${lon+0.005},${lat+0.005}&layer=mapnik&marker=${lat},${lon}`;
        mapFrame.style.display='block';
        mapPlaceholder.style.display='none';
    },2000);
}

function pauseWorkout(){
    const btn=document.getElementById('pause-btn');
    if(!isPaused){
        isPaused=true;
        pausedTime=Date.now();
        clearInterval(trackTimer);
        btn.textContent='RESUME';
        btn.style.background='linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)';
    }else{
        isPaused=false;
        trackStart+=(Date.now()-pausedTime);
        trackTimer=setInterval(()=>{updateTimer();updateTrackDisplay();updateDash();},1000);
        btn.textContent='PAUSE';
        btn.style.background='linear-gradient(135deg, #EC4899 0%, #DB2777 100%)';
    }
}

function stopWorkout(){
    if(!isTracking)return;
    clearInterval(trackTimer);
    if(gpsWatch)navigator.geolocation.clearWatch(gpsWatch);
    if(mapUpdateTimer)clearTimeout(mapUpdateTimer);
    document.getElementById('tracking-indicator').style.display='none';
    STATE.workouts.push({
        type:STATE.selectedWorkoutType,
        date:new Date().toISOString(),
        distance:STATE.tracking.distance,
        steps:Math.floor(STATE.tracking.steps),
        calories:Math.floor(STATE.tracking.calories)
    });
    STATE.tracking=null;
    lastPos=null;
    isTracking=false;
    isPaused=false;
    document.getElementById('workout-selection').style.display='block';
    document.getElementById('workout-tracking').style.display='none';
    document.getElementById('timer').textContent='00:00:00';
    document.getElementById('t-dist').textContent='0.0';
    document.getElementById('t-steps').textContent='0';
    document.getElementById('t-cal').textContent='0';
    const mapFrame=document.getElementById('map-frame');
    mapFrame.style.display='none';
    document.getElementById('map-placeholder').style.display='flex';
    mapFrame.src='';
    const btn=document.getElementById('pause-btn');
    btn.textContent='PAUSE';
    btn.style.background='linear-gradient(135deg, #EC4899 0%, #DB2777 100%)';
    save();
    const last=STATE.workouts[STATE.workouts.length-1];
    alert(`Workout saved!\n${last.distance.toFixed(2)}km • ${last.steps} steps • ${last.calories} cal`);
    nav(document.querySelector('.nav-item'),'dashboard');
}

function updateTimer(){
    if(!isTracking)return;
    const e=Math.floor((Date.now()-trackStart)/1000);
    const h=Math.floor(e/3600);
    const m=Math.floor((e%3600)/60);
    const s=e%60;
    document.getElementById('timer').textContent=`${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

function updateTrackDisplay(){
    if(!STATE.tracking)return;
    document.getElementById('t-dist').textContent=STATE.tracking.distance.toFixed(2);
    document.getElementById('t-steps').textContent=Math.floor(STATE.tracking.steps).toLocaleString();
    document.getElementById('t-cal').textContent=Math.floor(STATE.tracking.calories);
}

function dist(lat1,lon1,lat2,lon2){
    const R=6371;
    const dLat=(lat2-lat1)*Math.PI/180;
    const dLon=(lon2-lon1)*Math.PI/180;
    const a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2);
    return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}

function showModal(type){
    const modal=document.getElementById('modal');
    const body=document.getElementById('modal-body');
    if(type==='food'){
        body.innerHTML=`<div class="modal-title">Add Food</div><input class="form-input" id="m-food-name" placeholder="Food name"><input class="form-input" id="m-food-cal" type="number" placeholder="Calories"><button class="btn-primary" onclick="addFood()">Log Food</button><button class="btn-secondary" onclick="closeModal()">Cancel</button>`;
    }else if(type==='water'){
        body.innerHTML=`<div class="modal-title">Add Water</div><input class="form-input" id="m-water-oz" type="number" placeholder="Ounces"><button class="btn-primary" onclick="addHydration('water')">Log Water</button><button class="btn-secondary" onclick="closeModal()">Cancel</button>`;
    }else if(type==='coffee'){
        body.innerHTML=`<div class="modal-title">Add Coffee</div><input class="form-input" id="m-coffee-oz" type="number" placeholder="Ounces"><button class="btn-primary" onclick="addHydration('coffee')">Log Coffee</button><button class="btn-secondary" onclick="closeModal()">Cancel</button>`;
    }else if(type==='goal'){
        body.innerHTML=`<div class="modal-title">Set Weight Goal</div><input class="form-input" id="m-goal-current" type="number" placeholder="Current weight (lbs)" step="0.1"><input class="form-input" id="m-goal-target" type="number" placeholder="Target weight (lbs)" step="0.1"><input class="form-input" id="m-goal-days" type="number" placeholder="Days to achieve"><button class="btn-primary" onclick="addGoal()">Set Goal</button><button class="btn-secondary" onclick="closeModal()">Cancel</button>`;
    }
    modal.classList.add('active');
}

function closeModal(){document.getElementById('modal').classList.remove('active');}

function addFood(){
    const name=document.getElementById('m-food-name').value.trim();
    const cal=parseInt(document.getElementById('m-food-cal').value);
    if(!name||!cal){alert('Please fill all fields');return;}
    if(!STATE.foods)STATE.foods=[];
    STATE.foods.push({name,calories:cal,time:new Date().toLocaleTimeString()});
    save();closeModal();updateNutrition();updateDash();
    alert(`${name} logged!`);
}

function addHydration(type){
    const ozInput=type==='water'?document.getElementById('m-water-oz'):document.getElementById('m-coffee-oz');
    const oz=parseInt(ozInput.value);
    if(!oz||oz<=0){alert('Please enter ounces');return;}
    if(!STATE.hydration)STATE.hydration=[];
    STATE.hydration.push({type,oz,time:new Date().toLocaleTimeString(),hour:new Date().getHours()});
    save();closeModal();updateNutrition();
    alert(`${oz}oz ${type} logged!`);
}

function addGoal(){
    const current=parseFloat(document.getElementById('m-goal-current').value);
    const target=parseFloat(document.getElementById('m-goal-target').value);
    const days=parseInt(document.getElementById('m-goal-days').value);
    if(!current||!target||!days){alert('Please fill all fields');return;}
    if(current<=target){alert('Current must be higher than target');return;}
    if(days<7){alert('Minimum 7 days');return;}
    const diff=current-target;
    const dailyCal=Math.ceil((diff*3500)/days);
    STATE.goals=[{title:`Lose ${diff.toFixed(1)} lbs`,current,target,days,dailyCalDeficit:dailyCal,created:new Date().toISOString()}];
    document.getElementById('target-intake').textContent=Math.max(1200,2000-dailyCal);
    document.getElementById('target-burn').textContent=dailyCal;
    save();closeModal();updateGoals();updateDash();
    alert(`Goal set!`);
}

function updateNutrition(){
    const foodList=document.getElementById('food-list');
    if(STATE.foods && STATE.foods.length>0){
        foodList.innerHTML=STATE.foods.map(f=>`<div class="list-item"><div class="list-item-info"><div class="list-item-title">${f.name}</div><div class="list-item-subtitle">${f.time}</div></div><div class="list-item-value">${f.calories}</div></div>`).join('');
    }else{
        foodList.innerHTML='<p style="text-align: center; color: var(--text-gray); padding: 24px; font-size: 14px;">No meals logged yet. Tap + to add!</p>';
    }
    let totalCal=0;
    if(STATE.foods)STATE.foods.forEach(f=>totalCal+=f.calories||0);
    let burned=0;
    STATE.workouts.forEach(w=>burned+=w.calories||0);
    if(isTracking&&STATE.tracking)burned+=STATE.tracking.calories||0;
    const goal=2000;
    const remaining=goal-totalCal+burned;
    document.getElementById('cal-remaining').textContent=Math.max(0,Math.round(remaining));
    document.getElementById('cal-subtitle').textContent=`Eaten: ${totalCal} cal | Burned: ${Math.round(burned)} cal`;
    let waterOz=0,coffeeOz=0;
    if(STATE.hydration){STATE.hydration.forEach(h=>{if(h.type==='water')waterOz+=h.oz||0;else coffeeOz+=h.oz||0;});}
    document.getElementById('water-count').textContent=waterOz;
    document.getElementById('coffee-count').textContent=coffeeOz;
    const nutrBars=document.getElementById('nutr-bars');
    nutrBars.innerHTML='';
    [1200,1800,1500,2100,1900,2200,totalCal||500].forEach((cal,i)=>{
        const bar=document.createElement('div');
        bar.className='bar';
        bar.style.height=Math.min(100,(cal/2500)*100)+'%';
        bar.style.background='linear-gradient(180deg, #14B8A6 0%, #0D9488 100%)';
        const lbl=document.createElement('div');
        lbl.className='bar-label';
        lbl.textContent=i===6?`Today\n${cal}cal`:['Mon','Tue','Wed','Thu','Fri','Sat'][i];
        bar.appendChild(lbl);
        nutrBars.appendChild(bar);
    });
    drawHydrationChart();
}

function drawHydrationChart(){
    const svg=document.getElementById('hydration-svg');
    if(!STATE.hydration||STATE.hydration.length===0){
        svg.innerHTML='<text x="50" y="50" text-anchor="middle" fill="#64748B" font-size="8">No hydration data yet</text>';
        return;
    }
    const hourlyData={};
    for(let h=0;h<24;h++)hourlyData[h]={water:0,coffee:0};
    STATE.hydration.forEach(h=>{if(hourlyData[h.hour])hourlyData[h.hour][h.type]+=h.oz||0;});
    const maxOz=Math.max(...Object.values(hourlyData).map(d=>d.water+d.coffee),1);
    let waterPath='M 0,100',coffeePath='M 0,100';
    Object.keys(hourlyData).forEach((hour,i)=>{
        const x=(i/23)*100;
        const waterY=100-((hourlyData[hour].water/maxOz)*80);
        const coffeeY=100-((hourlyData[hour].coffee/maxOz)*80);
        waterPath+=` L ${x},${waterY}`;
        coffeePath+=` L ${x},${coffeeY}`;
    });
    waterPath+=' L 100,100 Z';
    coffeePath+=' L 100,100 Z';
    svg.innerHTML=`<path d="${waterPath}" fill="rgba(20,184,166,0.3)" stroke="#14B8A6" stroke-width="1"/><path d="${coffeePath}" fill="rgba(161,98,7,0.3)" stroke="#A16207" stroke-width="1"/><line x1="0" y1="100" x2="100" y2="100" stroke="#E2E8F0" stroke-width="0.5"/><text x="2" y="15" font-size="6" fill="#64748B">${Math.round(maxOz)}oz</text>`;
}

function updateGoals(){
    const msgs=['You\'re unstoppable!','Amazing dedication!','Every step counts!','Crushing your goals!','Your hard work pays off!'];
    document.getElementById('goal-motivation').textContent=msgs[Math.floor(Math.random()*msgs.length)];
    const goalView=document.getElementById('active-goal-view');
    if(STATE.goals && STATE.goals.length>0){
        const g=STATE.goals[0];
        const elapsed=Math.floor((Date.now()-new Date(g.created).getTime())/(1000*60*60*24));
        const remaining=Math.max(0,g.days-elapsed);
        const progress=Math.min(100,(elapsed/g.days)*100);
        goalView.innerHTML=`<div class="list-item"><div class="list-item-info"><div class="list-item-title">${g.title}</div><div class="list-item-subtitle">${remaining} days left of ${g.days} total</div></div><div class="list-item-value">${Math.round(progress)}%</div></div><div class="goal-progress-bar"><div class="goal-progress-fill" style="width: ${progress}%"></div></div>`;
    }else{
        goalView.innerHTML='<div class="list-item"><div class="list-item-info"><div class="list-item-title">No active goal</div><div class="list-item-subtitle">Tap + to set a new goal</div></div></div>';
    }
    const bars=document.getElementById('goal-bars');
    bars.innerHTML='';
    [20,35,50,65,75,85,95].forEach((progress,i)=>{
        const bar=document.createElement('div');
        bar.className='bar';
        bar.style.height=progress+'%';
        bar.style.background='linear-gradient(180deg, #EC4899 0%, #DB2777 100%)';
        const lbl=document.createElement('div');
        lbl.className='bar-label';
        lbl.textContent=`Day ${i+1}\n${progress}%`;
        bar.appendChild(lbl);
        bars.appendChild(bar);
    });
}

function toggleVoice(){
    const voiceBtn=document.getElementById('voice-btn');
    if(isRecording){stopRecording();return;}
    if('webkitSpeechRecognition' in window || 'SpeechRecognition' in window){
        if(!recognition){
            recognition=new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.continuous=false;
            recognition.interimResults=false;
            recognition.lang='en-US';
            recognition.onresult=async e=>{
                const transcript=e.results[0][0].transcript;
                addUserMessage(transcript);
                voiceBtn.classList.remove('listening');
                voiceBtn.classList.add('processing');
                voiceBtn.innerHTML='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="white" stroke-width="4" fill="none" stroke-dasharray="31.4 31.4" style="animation: spin 1s linear infinite;"/></svg>';
                const reply=await getAIReply(transcript);
                addBotMessage(reply);
                speakReply(reply);
            };
            recognition.onend=()=>{
                isRecording=false;
                voiceBtn.classList.remove('listening','processing');
                voiceBtn.innerHTML='<svg id="voice-icon" viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3" fill="white"/><path d="M5 10v2a7 7 0 0 0 14 0v-2" stroke="white" stroke-width="2" fill="none"/><line x1="12" y1="19" x2="12" y2="23" stroke="white" stroke-width="2"/><line x1="8" y1="23" x2="16" y2="23" stroke="white" stroke-width="2"/></svg>';
            };
            recognition.onerror=e=>{
                isRecording=false;
                voiceBtn.classList.remove('listening','processing');
                voiceBtn.innerHTML='<svg id="voice-icon" viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3" fill="white"/><path d="M5 10v2a7 7 0 0 0 14 0v-2" stroke="white" stroke-width="2" fill="none"/><line x1="12" y1="19" x2="12" y2="23" stroke="white" stroke-width="2"/><line x1="8" y1="23" x2="16" y2="23" stroke="white" stroke-width="2"/></svg>';
                addBotMessage("Sorry, couldn't hear that. Try again or type!");
            };
        }
        startRecording();
    }else{alert('Voice not supported. Please type!');}
}

function startRecording(){
    const voiceBtn=document.getElementById('voice-btn');
    isRecording=true;
    voiceBtn.classList.add('listening');
    voiceBtn.innerHTML='<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" fill="white"/></svg>';
    recognition.start();
}

function stopRecording(){isRecording=false;if(recognition)recognition.stop();}

function speakReply(text){
    const voiceBtn=document.getElementById('voice-btn');
    if('speechSynthesis' in window){
        const utterance=new SpeechSynthesisUtterance(text);
        utterance.onend=()=>{
            voiceBtn.classList.remove('processing');
            voiceBtn.innerHTML='<svg id="voice-icon" viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3" fill="white"/><path d="M5 10v2a7 7 0 0 0 14 0v-2" stroke="white" stroke-width="2" fill="none"/><line x1="12" y1="19" x2="12" y2="23" stroke="white" stroke-width="2"/><line x1="8" y1="23" x2="16" y2="23" stroke="white" stroke-width="2"/></svg>';
        };
        speechSynthesis.speak(utterance);
    }else{
        voiceBtn.classList.remove('processing');
        voiceBtn.innerHTML='<svg id="voice-icon" viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="12" rx="3" fill="white"/><path d="M5 10v2a7 7 0 0 0 14 0v-2" stroke="white" stroke-width="2" fill="none"/><line x1="12" y1="19" x2="12" y2="23" stroke="white" stroke-width="2"/><line x1="8" y1="23" x2="16" y2="23" stroke="white" stroke-width="2"/></svg>';
    }
}

function addUserMessage(msg){
    const chat=document.getElementById('chat');
    chat.innerHTML+=`<div class="message user">${msg}</div>`;
    chat.scrollTop=chat.scrollHeight;
}

function addBotMessage(msg){
    const chat=document.getElementById('chat');
    chat.innerHTML+=`<div class="message bot">${msg}</div>`;
    chat.scrollTop=chat.scrollHeight;
}

const AI={"lose weight":"Create 300-500 cal daily deficit. Cardio 3-4x/week + strength 2-3x/week. Track food. Aim 1-2 lbs weekly.","build muscle":"0.8-1g protein per lb bodyweight. Lift heavy 3-4x/week progressive overload. Sleep 7-9 hours.","protein":"0.8-1g per lb bodyweight. Chicken, fish, eggs, yogurt, beans, tofu. Spread throughout day.","water":"Half bodyweight in oz daily. Add 16-20oz per exercise hour. Dark urine = need more.","workout":"Beginners: 3-4x/week full body. Intermediate: 4-5x/week split. Warm-up, workout, cool-down.","cardio":"Mix steady-state (30-45min) or HIIT (15-20min). 3-5x/week after weights or separate.","rest":"Crucial! Muscles grow during rest. 1-2 full rest days weekly. Light activity OK.","motivated":"Set SMART goals. Track with photos/measurements. Find buddy. Remember WHY!","diet":"Whole foods: lean proteins, fruits, veggies, whole grains, healthy fats. 80/20 rule.","sleep":"7-9 hours nightly. Recovery and hormones happen here. Poor sleep = poor results.","beginner":"3x/week full body + 20-30min cardio 2-3x/week. Learn form. Track nutrition. Patient!","abs":"Made in kitchen! Core 2-3x/week: planks, twists, leg raises, crunches. Daily not needed.","stretch":"Dynamic before. Static after (hold 30sec). Improves flexibility, reduces injury.","strength":"Compound first: squats, deadlifts, bench, rows. Then isolation. 3-4 sets, 8-12 reps.","running":"Start slow! Walk-run, focus form, good shoes, increase 10% weekly max.","cycling":"Adjust fit. Start 20-30min easy. Build endurance before intensity.","walking":"Great low-impact! 30-60min most days. Swing arms, posture, comfortable pace.","hiking":"Build endurance. Proper footwear. Bring water. Start easy trails.","calories":"Calculate TDEE. Loss: TDEE-500. Maintenance: TDEE. Gain: TDEE+300-500.","carbs":"Fuel workouts! Complex: oats, brown rice, quinoa, sweet potato. Eat around workouts.","fat":"Essential! Avocados, nuts, olive oil, fatty fish. 20-30% total calories.","meal prep":"Sundays! Cook bulk proteins, chop veggies, portion meals. Containers. Freeze extras.","supplements":"Helpful: Protein powder, Creatine (5g daily), Vitamin D, Omega-3. Food first!","creatine":"Safest! 5g daily improves strength and muscle. Stay hydrated.","injury":"Stop if pain! RICE: Rest, Ice, Compression, Elevation. See doctor if persists.","sore":"DOMS normal! Peaks 24-48hrs. Ease with movement, stretching, foam rolling, protein.","plateau":"Increase intensity, change routine, recalculate calories, check portions.","recovery":"When adaptation happens! Sleep, nutrition, hydration, active recovery, stretching.","consistency":"Key! Better 30min 4x/week than 2hr once. Build habits. Small actions = big results.","motivation":"Comes/goes - build discipline! Routine, schedule workouts, celebrate wins.","stress":"Exercise reduces stress! Releases endorphins. Also: meditation, yoga, breathing.","gym":"First: Tour, machines, learn 5-6 exercises, don't compare, ask staff.","home":"No gym? Bodyweight: push-ups, squats, lunges, planks, burpees. Add bands, dumbbells.","equipment":"Minimal: bands ($20), dumbbells ($100-200), mat ($20). Enough!","track":"Track everything! Workouts, food, measurements. Data = progress.","progress":"Multiple ways: photos, measurements, clothes fit, strength, energy.","age":"Never too old! Start slow, focus form, listen body. Strength important aging.","woman":"Lift weights! Won't bulk. Benefits: strength, bones, metabolism!","form":"Form over weight ALWAYS! Bad form = injury. Start light, master movement.","nutrition":"70-80% results! Can't out-train bad diet. Focus nutrient-dense foods.","hydration":"Improves performance, aids recovery, regulates temperature. Sip throughout.","flexibility":"Enhances performance, reduces injury. Add yoga/mobility 2-3x/week.","core":"Improves posture, balance, strength! Planks, dead bugs, bird dogs, pallof.","hiit":"20-30sec max, 60-90sec rest. Repeat 8-10x. Fat loss. 2-3x/week max!","morning":"Great! Fasted or light snack. Benefits: consistency, energy. Protein after.","evening":"Works too! May be stronger. Eat 1-2hrs before. May affect sleep - test.","food":"Nourish body, align goals. Prioritize proteins, complex carbs, healthy fats, veggies.","weight loss":"Consistency over perfection! Balanced nutrition + exercise + sleep + hydration.","muscle":"Grow during rest! Eat protein, lift consistently, adequate recovery.","exercise":"Consistency trumps intensity! Better moderate regularly than intense sporadically.","how":"Start today! Set one goal, schedule workout, clean foods, take photos.","when":"Best time when you'll do it! Some prefer mornings, others evenings.","start":"Hardest part starting! Begin where you are, use what you have."};
const FALLBACKS=["That's interesting! I specialize in fitness, nutrition, weight loss, muscle building, workouts, recovery, motivation. Rephrase?","Great question! While I'm focused on fitness, I'd love to help! Ask about workouts, nutrition, supplements, recovery.","I'm here for fitness! Try 'lose weight', 'build muscle', 'meal prep', 'workout routines', 'staying motivated'.","Interesting! What about: weight loss, muscle building, nutrition, workout programming, recovery?","I'm your AI fitness coach! Exercise, nutrition, supplements, injury prevention, motivation. What interests you?"];

async function getAIReply(msg){
    let reply='';
    if('ai' in self && 'languageModel' in self.ai){
        try{
            const capabilities=await self.ai.languageModel.capabilities();
            if(capabilities && capabilities.available==='readily'){
                const session=await self.ai.languageModel.create({systemPrompt:"You are an enthusiastic fitness coach. Give practical advice in 2-3 sentences. Be encouraging!"});
                reply=await session.prompt(msg);
                session.destroy();
            }
        }catch(e){}
    }
    if(!reply){
        const m=msg.toLowerCase();
        for(let key in AI){if(m.includes(key)){reply=AI[key];break;}}
        if(!reply)reply=FALLBACKS[Math.floor(Math.random()*FALLBACKS.length)];
    }
    return reply;
}

async function sendMsg(){
    const input=document.getElementById('chat-input');
    const msg=input.value.trim();
    if(!msg)return;
    addUserMessage(msg);
    input.value='';
    const reply=await getAIReply(msg);
    addBotMessage(reply);
}

document.addEventListener('DOMContentLoaded',()=>{
    load();
    setTimeout(()=>{goTo(STATE.user?'dashboard':'login');},2000);
});
