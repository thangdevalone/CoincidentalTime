const isLogin=Boolean(localStorage.getItem('localKey'))?Boolean(localStorage.getItem('localKey')):false
const btnSubmit=document.querySelector('.btn__submit--data')
const btnInfor=document.querySelector('.btn__submit--infor')
var namePerson=localStorage.getItem('nameKey')?localStorage.getItem('nameKey'):'Unknown'
var msv=localStorage.getItem('msvKey')?localStorage.getItem('msvKey'):'Unknown'
var classPerson=localStorage.getItem('classKey')?localStorage.getItem('classKey'):'Unknown'
const ting= new Audio('../effect/ting.mp3')
const api='https://6308f3a0722029d9dddc15b7.mockapi.io/api/v1/DataUserTime'
const closeBtn=document.querySelector('.exit')
const modal=document.querySelectorAll('.modal')[0]
const articleName=document.querySelector('.article__name')
const articleClass=document.querySelector('.article__class')
const articleMsv=document.querySelector('.article__msv')

function updateInfor(namePerson,msv,classPerson){
    articleName.innerHTML=namePerson
    articleClass.innerHTML=classPerson
    articleMsv.innerHTML=msv
}
if(isLogin){
    updateInfor(namePerson,classPerson,msv)
    document.querySelectorAll('.modal')[1].classList.remove('open')
}
// GET data
function getData(callback){
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
// update số lượng người của từng thời gian

// creat mảng data id hay mảng time đăng kí
function createArrayId(nodelist){
    const arrayId=[]
    nodelist.forEach(item => {
        arrayId.push(item.id)
    });
   return arrayId; 
}
closeBtn.addEventListener('click',()=>{
    modal.classList.remove('open')
})




function render(){
    getData((response)=>handleRenderData(response))
}

render() // render data


btnInfor.addEventListener('click',()=>{
    namePerson=document.querySelector('.login--name').value
    msv=document.querySelector('.login--msv').value
    classPerson=document.querySelector('.login--class').value
    localStorage.setItem('nameKey',namePerson)
    localStorage.setItem('msvKey',msv)
    localStorage.setItem('classKey',classPerson)
    localStorage.setItem('localKey',true)
    updateInfor(namePerson,classPerson,msv)
    document.querySelectorAll('.modal')[1].classList.remove('open')
})


//lắng nghe sự kiện click vào nút gửi data
btnSubmit.addEventListener('click', ()=>{
    const boxChecked=document.querySelectorAll('td input[type="checkbox"]:checked');
    const dataTime=createArrayId(boxChecked)
    if(dataTime){
        const datas={
            name: namePerson,
            class: classPerson,
            MSV: msv,
            data:dataTime
        }

        postData(api,datas)
        .then((item)=> renderCoutingPeople(item))


        ting.play()
        modal.classList.add('open')

    }
    else alert('Bạn gửi không thành công vui long tích lại thời khóa biểu')
    
})

function handleRenderData(datas){
    datas.forEach((item => {

        //Thuật toán tự chế khá tệ nhưng dùng cũng ổn
        renderCoutingPeople(item)
        
    }))
}

function renderCoutingPeople(item){
    item.data.forEach(id =>{
        const html =document.querySelector(`span #id${id}`)
        html.innerHTML=Number(html.innerHTML)+1
    })
   
}
