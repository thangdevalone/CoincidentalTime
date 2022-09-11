const btnThongKe=document.querySelector('.btn__thongke');
const modalThongKe=document.querySelectorAll('.modal')[3];
const body=document.querySelector('body');
const features=document.querySelectorAll('.thongke--feature');
const toolbar=document.querySelector('.modal__thongke--toolbar');
const resuiltData=document.querySelector('.modal__thongke--data');
const api='https://6308f3a0722029d9dddc15b7.mockapi.io/api/v1/DataUserTime'
const loader=`
<div class="loader loader--style1" title="0">
  <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.75s"
      repeatCount="indefinite"/>
    </path>
  </svg>
</div>

`
const _data={
    dataUsers:[]
}

import html from './html.js'


btnThongKe.addEventListener('click',()=>{
      
    loadData()
    btnThongKe.innerHTML=loader

})

function loadData(thongkeDuLieu){
        getData((data)=>{
            btnThongKe.innerHTML ='Thống kê dữ liệu'
            body.style.overflowY == 'hidden'?body.style.overflowY ='scroll': body.style.overflowY ='hidden'
            modalThongKe.classList.add('open')
            _data.dataUsers=[...data];
            const dataFix=[..._data.dataUsers]
            handleClickFeatures(dataFix)

            
    })
}

function chooseList(html){
    const tool2_1=document.querySelector('#tool_2-1');
    tool2_1.addEventListener('change',()=>{
        const waitChoose=document.querySelector('.waitChoose');
        tool2_1.value==='theothu'?render(html.html__toolbarListDays,waitChoose,1):render(html.html__toolbarListHours,waitChoose,1)
    })
}
function chooseFeedback(html){
    const tool4_1=document.querySelector('#tool_4-1');
    tool4_1.addEventListener('change',()=>{
        const waitChoose=document.querySelector('.waitChoose');
        tool4_1.value==='_5'?render(html.html_feedback_options5,waitChoose,1):render('<div class="waitChoose"></div>',waitChoose,1)
    })
}

//fetch

function getData(callback){
    fetch(api)
        .then((response)=>response.json())
        .then(callback)
}

// lắng nghe click vào tinh năng

const handleClickFeatures = (data)=>{
    var lastIndex=null

    features.forEach((feature,index)=>{
        
        feature.addEventListener('click',()=>{       

            if(lastIndex!==null){
                features[lastIndex].classList.remove('featuring')
            }
            if(index !==2){
                feature.classList.toggle('featuring')
            }
            

            if( lastIndex !== index && index !== 2){
                render(html.html__resuilt,resuiltData,0)
                if(index===0){
                    render(html.html__toolbarFilter,toolbar,0)
                    
                    //Thuật toán 
                    filterAlgorithm(data)
                }
                if(index===1){
                    render(html.html__toolbarList,toolbar,0)
                    const waitChoose=document.querySelector('.waitChoose');
                    render(html.html__toolbarListDays,waitChoose,1)
                    chooseList(html)

                    //Thuật toán 
                    listAlgorithm(data)
                }
               
                if(index===3){
                    render(html.html__toolbarResuilt,toolbar,0)
                    chooseFeedback(html)

                    //Thuật toán 
                    feedbackAlgorithm(data)

                }

            }
            else{
                if(index === 2){
                    if(lastIndex){

                        features[lastIndex].classList.add('featuring')
                    }
                    alert('Xin lỗi tớ chưa phát triển xong phần này nên các bạn đợi sau nhé ❤')
                }
            }
            if(index !==2){

                lastIndex = index
            }
        })
    })
}

function render(data,pos,i){
    i===0?pos.innerHTML=data:pos.outerHTML=data
}
const findName = (value1,value2)=>{
    var resuilt=[]
    value1.forEach((value)=>{
        value2.forEach(val=>{
            if(val.name===value){
                resuilt.push(val)
            }
        })
    })
    return resuilt
}
const findMsv = (value1,value2)=>{
    var resuilt=[]
    value1.forEach((value)=>{
        value2.forEach(val=>{
            if(val.MSV===value){
                resuilt.push(val)
            }
        })
    })
    return resuilt
}
const convertToTime=(value)=>{
    const DATE=['Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy','Chủ nhật']
    const TIME=['7:00-8:00','8:00-9:00','9:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00']
    var resuilt=[]
    value.data.forEach((val)=>{
        const idDay=Number(val[0])-1
        const idTime=val.length<4?Number(val[2])-1:Number(val.slice(2,4))-1
        const day=DATE[idDay]
        const time=TIME[idTime]
        resuilt.push(`${day}, ${time}`)
    })
    return resuilt
}
const dataFix__All=(value)=>{
    var resuilt=[]
    value.forEach((val)=>{
        val={...val,time:convertToTime(val)}
        resuilt.push(val)
    })
    return resuilt
}
const getMinMax=(array,val)=>{
    return array.map((item,i)=>{
        if(item.soLuong===val){
            return item
        }
    })
}
const counterData= (value)=>{
    var resuilt={}
    //tạo dữ liệu
    value.forEach((val)=>{
        val.time.forEach((timing)=>{
            resuilt={...resuilt,[`${timing}`]:0}
        })
    })
    // counter
    value.forEach((val)=>{
        val.time.forEach((timing)=>{
            resuilt[`${timing}`]=resuilt[`${timing}`]+1
        })
    })
    return resuilt
}
const includeData=(val1,val2,val3,msv,xMsv)=>{
    if (msv!=='undefined'){
        if(msv.toUpperCase()!==xMsv.toUpperCase()) return false
    }
    if (val1!=='undefined' && val2!=='undefined'){
        const val=`${val1}, ${val2}`
        if (val3.includes(val)) return true
        else return false
    }
    if (val2!=='undefined'){
        if (val3.includes(val2)) return true
        else return false
    }
    if (val1!=='undefined'){
        if (val3.includes(val1)) return true
        else return false
    }
}
//-------------------------filterAlgorithm---------------------------------------------
function filterAlgorithm(data){
    const icoBtn=document.querySelectorAll(".ico");
    var _value1=null;
    var _value2=null;
    var _value3=null;

    const btnTool=document.querySelector('.btn__tool');
    const resuiltTable=document.querySelector('.resuilt__data');

    var _resuilt=data

    btnTool.addEventListener('click', ()=>{
        const value_1=document.querySelector('#tool_1-1').value;
        const value_2=document.querySelector('#tool_1-2').value;
        const value_3=document.querySelector('#tool_1-3').value||'undefined';
        _value1=value_1
        _value2=value_2
        _value3=value_3
  
        const resuilt=data


        renderFilterResuilt(dataFix__All(resuilt),resuiltTable,value_1,value_2,value_3)
        icoBtn.forEach(ico=>{
            if(ico.classList.contains('active')){
                ico.classList.remove('active')
            }
        })
    })
    
    var lastIndex=null;
    icoBtn.forEach((ico,index)=>ico.addEventListener('click',()=>{

        if(lastIndex!==null && lastIndex!==index ){
                icoBtn[lastIndex].classList.remove('active')
                icoBtn[lastIndex].style.pointerEvents = 'auto'

        }
        ico.style.pointerEvents = 'none';
        ico.classList.toggle('active')
        
        lastIndex=index

        // sắp xếp theo tên
        if(((index===0)||(index===1)) && (_resuilt.length>0)){
            var resuiltFix=[];
            for(var i=0;i<_resuilt.length;i++){
                resuiltFix.push(_resuilt[i].name)
            }
            const resuilt=findName(resuiltFix.sort(),_resuilt);

            if (index===0 ){
                renderFilterResuilt(dataFix__All(resuilt),resuiltTable,_value1,_value2,_value3)
            }
            if (index===1){
                renderFilterResuilt(dataFix__All(resuilt.reverse()),resuiltTable,_value1,_value2,_value3)
            }
        }

        // sắp xêp theo mã sinh viên
        if(((index===2)||(index===3)) && (_resuilt.length>0)){
            var resuiltFix=[];
            
            for(var i=0;i<_resuilt.length;i++){
                resuiltFix.push(_resuilt[i].MSV)
              
            }

            const resuilt=findMsv(resuiltFix.sort(),_resuilt);
            if (index===2 ){
                renderFilterResuilt(dataFix__All(resuilt),resuiltTable,_value1,_value2,_value3)

            }
            if (index===3){
                renderFilterResuilt(dataFix__All(resuilt.reverse()),resuiltTable,_value1,_value2,_value3)

            }
        }

    }))

    
}
function renderFilterResuilt(resuilt,resuiltTable,isDay,isTime,isMsv){
    const html=resuilt.map(x => {
        return x.time.map((data)=>{    
            if(isDay==='undefined' && isTime==='undefined' && isMsv==='undefined'){
                return`<div class='col display--flex flex--between'>
                            <div class="col-1-3">${x.name}</div>
                            <div class="col-1-3">${x.MSV}</div>
                            <div class="col-1-3">[ ${data} ]</div>
                        </div>
                    `
            }
            const bool1=includeData(isDay,isTime,data,isMsv,x.MSV)
            if (bool1){
               
                return `<div class='col display--flex flex--between'>
                            <div class="col-1-3">${x.name}</div>
                            <div class="col-1-3">${x.MSV}</div>
                            <div class="col-1-3">[ ${data} ]</div>
                        </div>
                    `
            }
            else return []

        }).join('')
    })
    resuiltTable.innerHTML=html.join('')
}
//------------------------listAlgorithm----------------------------------------------
function listAlgorithm(data){
    const icoBtn=document.querySelectorAll(".ico");
    const btnTool=document.querySelector('.btn__tool');
    const resuiltTable=document.querySelector('.resuilt__data');
    var _value1=null;
    var _value2=null;
    const resuilt=data
    const soLuongTime= counterData(dataFix__All(resuilt))
    
    const resuiltFix=()=>{
        var resuiltFixInit=[]
        for(let key in soLuongTime){
            resuiltFixInit.push({
                thu:key,
                soLuong:soLuongTime[key]
            })
        }
        return resuiltFixInit;
    };
   

    btnTool.addEventListener('click',()=>{

        const value_1=document.querySelector('#tool_2-1').value;
        const value_2=document.querySelector('#tool_2-2').value;
        _value1=value_1
        _value2=value_2
       
        renderListResuilt(resuiltFix(),resuiltTable,value_1,value_2)
        icoBtn.forEach(ico=>{
            if(ico.classList.contains('active')){
                ico.classList.remove('active')
                icoBtn[lastIndex].style.pointerEvents = 'auto'
            }
        })
    })

    var lastIndex=null;

    icoBtn.forEach((ico,index)=>ico.addEventListener('click',()=>{

        if(lastIndex!==null && lastIndex!==index ){
                icoBtn[lastIndex].classList.remove('active')
                icoBtn[lastIndex].style.pointerEvents = 'auto'

    }
        ico.style.pointerEvents = 'none';
        ico.classList.toggle('active')
        
        lastIndex=index

        // sắp xếp theo số lượng người đã đăng kí
        if(((index===0)||(index===1)) && (resuilt.length>0)){

            if (index===0 ){
           
                renderListResuilt(resuiltFix().sort(dynamicSort("soLuong")),resuiltTable,_value1,_value2)
            }
            if (index===1){
                renderListResuilt(resuiltFix().sort(dynamicSort("-soLuong")),resuiltTable,_value1,_value2)
            }
        }
    }))


}
function renderListResuilt(resuilt,resuiltTable,isVal1,isVal2){
    var flag=false;//kt data
    const htmlInit= resuilt.map((val)=> {
            if( val.thu.includes(isVal2) && isVal1==='theothu'){
                flag=true;
                return `<div class='col display--flex flex--between'>
                                    <div class="col-1-2">[ ${val.thu} ]</div>
                                    <div class="col-1-2">${val.soLuong} người đã đăng kí</div>
                                    </div>`
            }
            if( val.thu.includes(isVal2) && isVal1==='theogio'){
                flag=true;
                return `<div class='col display--flex flex--between'>
                                    <div class="col-1-2">[ ${val.thu} ]</div>
                                    <div class="col-1-2">${val.soLuong} người đã đăng kí</div>
                                    </div>`
            }
    }) 
    
    const htmlNoData=[`<div class='col display--flex flex--between flag'>
    <div class="col" style="font-size:30px">Không có người đắng kí</div>
    </div>`]
    const html=flag===true?htmlInit:htmlNoData
    resuiltTable.innerHTML=html.join('')
}
//--------------------------feedbackAlgorithm-------------------------------------------------------------- 
function feedbackAlgorithm(data){
    const btnTool=document.querySelector('.btn__tool');
    const resuiltTable=document.querySelector('.resuilt__data');
    var _value1=null;
    var _value2=null;
    const resuilt=data
    const soLuongTime= counterData(dataFix__All(resuilt))
    
    const resuiltFix=()=>{
        var resuiltFixInit=[]
        for(let key in soLuongTime){
            resuiltFixInit.push({
                thu:key,
                soLuong:soLuongTime[key]
            })
        }
        return resuiltFixInit;
    };
    btnTool.addEventListener('click',()=>{

        const value_1=document.querySelector('#tool_4-1').value;
        if(value_1==='_1' || value_1==='_2'){
            if(value_1==='_1'){
                const resuiltFixSorted = resuiltFix().sort(dynamicSort("-soLuong"))
                renderFeedbackResuilt(getMinMax(resuiltFixSorted,resuiltFixSorted[0].soLuong),resuiltTable,0,1,2)
            }  
            if(value_1==='_2'){
                const resuiltFixSorted = resuiltFix().sort(dynamicSort("soLuong"))
                renderFeedbackResuilt(getMinMax(resuiltFixSorted.reverse(),resuiltFixSorted.reverse()[0].soLuong),resuiltTable,0,2,2)
            }  
           
        }
        
    
    })
}

function renderFeedbackResuilt(resuilt,resuiltTable,isVal1,choose,loop){
    const resuiltFixThu=resuilt.map((item)=>{ // fix các lấy các ngày bỏ qua giờ
        if (item !== undefined){
        
            return {...item,thu:item.thu.slice(0,item.thu.indexOf(','))}
        }
    })
    const resuiltFixDistinct=()=>{ // fix cacs thứ giống nhau
        var resuilt=[]
        resuiltFixThu.filter((item,index)=>{
            var flag=true
            console.log(index)
            if(item===undefined){
                return false
            }
            if(resuiltFixThu.length>0 && index===0){
                resuilt.push(item)
            }
            for(var i=0;i<resuilt.length;i++){
                if (resuilt[i].thu===item.thu){
                    flag=false
                }
            }
            flag?resuilt.push(item):''
        })
        return resuilt
    }
        
    console.log(resuiltFixDistinct())
    const html= resuiltFixDistinct().map((val)=> {
                if((choose===1 || choose===2) && (loop===1 ||loop===2)){
                    if(loop===1){
                        loop=0
                    }
                    return `<div class='col display--flex flex--between'>
                                        <div class="col-1-2">[ ${val.thu} ]</div>
                                        <div class="col-1-2">${val.soLuong} người đã đăng kí</div>
                                        </div>`
                }


    }) 
    resuiltTable.innerHTML=html.join('')
}
//----------------------------------------------------------------


function dynamicSort(property) { // sắp xếp cho mảng đối tượng
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
//
