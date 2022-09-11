
var namePerson=localStorage.getItem('nameKey')?localStorage.getItem('nameKey'):'Unknown'
var msv=localStorage.getItem('msvKey')?localStorage.getItem('msvKey'):'Unknown'
var classPerson=localStorage.getItem('classKey')?localStorage.getItem('classKey'):'Unknown'
var isPost=Number(localStorage.getItem('postKey'))?Number(localStorage.getItem('postKey')):0 // Là 0 thì gửi đi còn 1 thì gỡ
const isLogin=Boolean(localStorage.getItem('localKey'))?Boolean(localStorage.getItem('localKey')):false
const setting=document.querySelector('.setting')
const btnSubmit=document.querySelector('.btn__submit--data')
const btnInfor=document.querySelector('.btn__submit--infor')

const ting= new Audio('../Source/ting.ogg')
const api='https://6308f3a0722029d9dddc15b7.mockapi.io/api/v1/DataUserTime'

const allModal=document.querySelectorAll('.modal')
const message=document.querySelector('.message')

const articleName=document.querySelectorAll('.article__name')
const articleClass=document.querySelectorAll('.article__class')
const articleMsv=document.querySelectorAll('.article__msv')

setting.addEventListener('click',()=>{
    localStorage.clear()
    location.reload()
})

function check(isPost){
    if (isPost){
        document.querySelector(".main__register .wrapper").style.pointerEvents="none";
    }
    else {
        document.querySelector(".main__register .wrapper").style.pointerEvents="auto";
    }
}
// Kiểm tra đầu vào
if(isPost){
    btnSubmit.innerHTML='Gỡ bỏ';
    getData(api+`/${localStorage.getItem('id')}`,(response)=>{
        response.data.forEach(id =>{
            const checkbox=document.getElementById(id)
            checkbox.checked=true
        })
    })
}
else {
    btnSubmit.innerHTML='Gửi đi';
}

function render(){
    getData(api,(response)=>handleRenderData(response))
}

check(isPost)
render() // render data

function updateInfor(namePerson,msv,classPerson){
    for(var i=0;i<articleClass.length;i++){
        articleName[i].innerHTML=namePerson
        articleClass[i].innerHTML=classPerson
        articleMsv[i].innerHTML=msv
    }
}

// Kiểm tra đăng nhập
if(isLogin){
    updateInfor(namePerson,msv,classPerson)
    allModal[1].classList.remove('open')
}
// GET data
function getData(api,callback){
    fetch(api)
        .then((response) => response.json())
        .then(callback);
} 

// POST request data to api
async function postData(url = '', data = {}) {
    const options ={
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        }
    const response = await fetch(url,options);
    return response.json();
}

async function delData(url = ''){
    const response=await fetch(url,{method: 'DELETE'}) 
    return response.json();
}
// creat mảng data id hay mảng time đăng kí
function createArrayId(nodelist){
    const arrayId=[]
    nodelist.forEach(item => {
        arrayId.push(item.id)
    });
   return arrayId; 
}
function exit(i){
    if(i===3){
        const body=document.querySelector('body');
        document.querySelector('.modal__thongke--toolbar').innerHTML=`
        <span class="thongke__header">Toolbar</span>
        
        `
        document.querySelector('.modal__thongke--data').innerHTML=`
        <span class="thongke__header">Resuilt</span>
        `
        const thongkeFeatures=document.querySelectorAll('.thongke--feature')
        thongkeFeatures.forEach((feature)=>{

            if(feature.classList.contains('featuring')){
                feature.classList.remove('featuring');
            }
        })
        
        body.style.overflowY == 'hidden'?body.style.overflowY ='scroll': body.style.overflowY ='hidden'
    }
    allModal[i].classList.remove('open')
   
}
   





btnInfor.addEventListener('click',()=>{
    namePerson=document.querySelector('.login--name').value||'Unknown'
    msv=document.querySelector('.login--msv').value||'Unknown'
    classPerson=document.querySelector('.login--class').value||'Unknown'
    localStorage.setItem('nameKey',namePerson)
    localStorage.setItem('msvKey',msv)
    localStorage.setItem('classKey',classPerson)
    localStorage.setItem('localKey',true)
    updateInfor(namePerson,classPerson,msv)
    allModal[1].classList.remove('open')
})


//lắng nghe sự kiện click vào nút gửi data
btnSubmit.addEventListener('click', ()=>{
    const boxChecked=document.querySelectorAll('td input[type="checkbox"]:checked');
    const dataTime=createArrayId(boxChecked)
    if(dataTime.length>0){
        const datas={
            name: namePerson,
            class: classPerson,
            MSV: msv,
            data:dataTime
        }
        
        if (!isPost){
            isPost=1
            localStorage.setItem('postKey',isPost)
            message.innerHTML='Đã gửi dữ liệu đi thành công!'
            btnSubmit.innerHTML='Gỡ bỏ!'
            postData(api,datas) // post data to api
            .then((item)=> {
                localStorage.setItem('id',item.id);
                renderCoutingPeople(item);
                })
        } else {
            isPost=0
            btnSubmit.innerHTML='Gửi đi!'
            localStorage.setItem('postKey',isPost)
            message.innerHTML='Đã gỡ dữ liệu thành công!'
            delData(api+`/${localStorage.getItem('id')}`)
            .then((item)=> {
                    item.data.forEach(id =>{
                    const checkbox=document.getElementById(id)
                    checkbox.checked=false
                    })
                })
            delCoutingPeople(dataTime)
        }
        ting.play()
        allModal[0].classList.add('open')
        check(isPost)


    }
    else alert('Bạn gửi không thành công vui lòng tích lại thời khóa biểu')
})

// xử lí render dữ liệu

function handleRenderData(datas){
    datas.forEach((item => {

        //Thuật toán tự chế khá tệ nhưng dùng cũng ổn
        renderCoutingPeople(item)
        
    }))
}
//+ data
function renderCoutingPeople(item){
    item.data.forEach(id =>{
        const html =document.querySelector(`span #id${id}`)
        html.innerHTML=Number(html.innerHTML)+1
    })
}
//xoa data
function delCoutingPeople(item){
    item.forEach(id =>{
        const html =document.querySelector(`span #id${id}`)
        html.innerHTML=Number(html.innerHTML)-1
    })
}

// xử lí click vào bảng 
const tableResuilt =document.querySelector('.main__resuilt table')
// lắng nghe click vào table
tableResuilt.addEventListener('click',(e)=>{
    const DATE=['Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy','Chủ nhật']
    const TIME=['7:00-8:00','8:00-9:00','9:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00']
    const tdCursor = e.target.closest('td:not(:first-child)')
    const idNoConvert=tdCursor.querySelector("span span").id
    const idDay=Number(idNoConvert[2])-1
    const idTime=idNoConvert.length<6?Number(idNoConvert[4])-1:Number(idNoConvert.slice(4,6))-1
    const day= DATE[idDay]
    const time=TIME[idTime]
    allModal[2].classList.toggle('open')
    document.querySelector('.day').innerHTML=day
    document.querySelector('.hour').innerHTML=time
    getData(api,(response) => {
        const data=convertResponse(response,idNoConvert.slice(2,6))
        console.log(data)
        renderPeopleRegister(data)
    })
})
// chuyển sang dạng data dễ xử dụng hơn
function convertResponse(response,idFind) {
    const DATASPEOPLE=[]
    response.forEach(item=>{
        item.data.forEach(id=>{
            if(id===idFind){
                const data={
                    namePerson:item.name,
                    classPerson:item.class,
                    msv:item.MSV,
                }
                DATASPEOPLE.push(data)
            }
        })
    })
    return DATASPEOPLE
}

function renderPeopleRegister(datas){
    const list=document.querySelector(".modal__data .list .list--body")
    // DOM render họ tên
    const html_name=datas.map(data => {
        return `<div>${data.namePerson}</div>`
    })
    // DOM render msv
    const html_msv=datas.map(data => {
        return `<div>${data.msv}</div>`
    })
    // DOM render class
    const html_class=datas.map(data => {
        return `<div>${data.classPerson}</d>`
    })
    list.innerHTML='<div class="col-1-3">'+html_name.join('')+'</div>'
                    +'<div class="col-1-3">'+html_msv.join('')+'</div>'
                    +'<div class="col-1-3">'+html_class.join('')+'</div>'
}