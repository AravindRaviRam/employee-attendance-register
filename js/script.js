let video = document.createElement("video");
let canvasElement = document.getElementById("canvas");
let canvas = canvasElement.getContext("2d");
let outputContainer = document.getElementById("output");

const drawLine =(begin, end, color)=>{
      canvas.beginPath();
      canvas.moveTo(begin.x, begin.y);
      canvas.lineTo(end.x, end.y);
      canvas.lineWidth = 4;
      canvas.strokeStyle = color;
      canvas.stroke();

   }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.play();
      requestAnimationFrame(tick);
    });

    const tick=()=>{    
      loadingMessage.innerText = "⌛ Loading video..."
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true;
        canvasElement.hidden = false;
        outputContainer.hidden = false;
        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        let imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        let code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
  let putAtten=(emp)=>{
    let empData=emp.split("_");
    let empid=empData[0];
    let empName=empData[1];
    let comname=empData[2];
    let netcheck =navigator.onLine;
    if(comname==="SELCHIN ONLINE SERVICE" && netcheck===true){
       var win = window.open('https://docs.google.com/forms/d/e/1FAIpQLSd_BiHOYeErNfyfYy46StWupIhOKnSZqbrqpRNAkW_mxeIdpw/formResponse?usp=pp_url&entry.547707860='+ empid +'&entry.455394488='+ empName);
        setTimeout(function () { win.close();}, 4000);

    }else{

      alert("Sorry Your ID is Invalid  or Please Check your Internet Connection");

    }
  }
      let empinfo;
        if (code) {
          drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
          drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
          drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
          drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
          empinfo =code.data;
          putAtten(empinfo);
        } else {
          outputMessage.hidden = false;
          outputData.parentElement.hidden = true;
        }
      }
      requestAnimationFrame(tick);
    }
    //tmie and date starts
              const addZero=(i)=>{
                if(i<10){
                    i= "0"+i;
                }
                return i;
            }
            const currentTime=()=>{
                let date= new Date();
                let weekDay=["SUN","MON","TUE","WED","THU","FRI","SAT"];
                let month=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP",
                "OCT","NOV","DEC"];
                let hour= date.getHours();
                let min= date.getMinutes();
                let today=weekDay[date.getDay()];
                let todayDate=date.getDate();
                let curMonth=month[date.getMonth()];
                //add zero for lessthen 10
                min=addZero(min);
                //sec=addZero(sec);
                let time= hour + ":" + min;
                document.getElementById('time').innerHTML = time;
                document.getElementById('curDate').innerHTML = today + " " + todayDate + " " + curMonth; 
                t =setTimeout(function(){
                    currentTime();
                },500);
            }
            currentTime();
