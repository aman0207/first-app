const express = require('express');
const router = express.Router();
const RespModel = require('../models/RespModel');
const minTimeSec = 15;
const maxTimeSec = 30;

//GET 
router.get('/process',(req,resp)=> {
    var startTime = new Date();

    setTimeout(function() {
        let respObj = setResponse(req, startTime);

        respObj.save((err,respBody)=>{

            if(err){
                console.log('Error while saving obj in GET req');
            }else{
                console.log('GET Obj saved successfully')
            }
        })
        
        resp.send(respObj);
       }, randomIntFromInterval(minTimeSec,maxTimeSec)*1000); 
})

//POST
router.post('/process',(req,resp)=> {
    var startTime = new Date();

    setTimeout(function() {
        var respObj = setResponse(req, startTime);
        console.log(`POST Response obj : ${respObj}`)
        respObj.save((err,respBody)=>{

            if(err){
                console.log('Error while saving obj in POST req');
            }else{
                console.log('POST Obj saved successfully')
            }
        })
        
        resp.send(respObj);
       }, randomIntFromInterval(minTimeSec,maxTimeSec)*1000);
})

//PUT
router.put('/process/:id',(req,resp)=> {
    var startTime = new Date();

    setTimeout(function() {
        let respObj = setResponse(req, startTime);

        respObj.save((err,respBody)=>{

            if(err){
                console.log('Error while saving obj in PUT req');
            }else{
                console.log('PUT Obj saved successfully')
            }
        })
        
        resp.send(respObj);
       }, randomIntFromInterval(minTimeSec,maxTimeSec)*1000);    
})


//DELETE
router.delete('/process/:id',(req,resp)=> {
    var startTime = new Date();

    setTimeout(function() {
        let respObj = setResponse(req, startTime);

        respObj.save((err,respBody)=>{

            if(err){
                console.log('Error while saving obj in DELETE req');
            }else{
                console.log('DELETE Obj saved successfully')
            }
        })
        
        resp.send(respObj);
       }, randomIntFromInterval(minTimeSec,maxTimeSec)*1000);   
})

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function setResponse(req, startTime){
    
    let respObj = new RespModel({
        time  : startTime,
        method : req.method,
        header : req.headers,
        path : req.path,
        query : req.query,
        body : req.body,
        duration : Math.round((new Date() - startTime)/1000)

    })
    return respObj;
}

router.get('/stats',(req, resp)=>{
    RespModel.find((err, respModel)=>{
        console.log(respModel.length);
        var getReqs = respModel.filter((eachObj)=>{
            return eachObj.method === 'GET' ;
        })
        
        var putReqs = respModel.filter((eachObj)=>{
            return eachObj.method === 'PUT' ;
        })
        var postReqs = respModel.filter((eachObj)=>{
            return eachObj.method === 'POST' ;
        })
        var delReqs = respModel.filter((eachObj)=>{
            return eachObj.method === 'DELETE' ;
        });
        console.log(getReqs.length);
        var oldHr = new Date(Date.now()-3600000);
        
        console.log(oldHr);
        var oldHrReqs = respModel.filter((eachObj)=>{
            return eachObj.time > oldHr;
        });
        console.log(oldHrReqs.length);
        var oldHrGETReq = oldHrReqs.filter((eachObj)=>{
            return eachObj.method === 'GET' ;
        });
        var oldHrPUTReq = oldHrReqs.filter((eachObj)=>{
            return eachObj.method === 'PUT' ;
        });
        var oldHrPOSTReq = oldHrReqs.filter((eachObj)=>{
            return eachObj.method === 'POST' ;
        });
        var oldHrDELETEReq = oldHrReqs.filter((eachObj)=>{
            return eachObj.method === 'DELETE' ;     
        });
        var oldMin = new Date(Date.now()-60000);
        console.log(oldMin)
        var oldMinReqs = respModel.filter((eachObj)=>{
            return eachObj.time > oldMin ;
    });
    var oldMinGETReq = oldMinReqs.filter((eachObj)=>{
        return eachObj.method === 'GET' ;
    });
    var oldMinPUTReq = oldMinReqs.filter((eachObj)=>{
        return eachObj.method === 'PUT' ;
    }); 
    var oldMinPOSTReq = oldMinReqs.filter((eachObj)=>{
        return eachObj.method === 'POST' ;
    });
    var oldMinDELETEReq = oldMinReqs.filter((eachObj)=>{
        return eachObj.method === 'DELETE' ;
    });
    console.log(oldMinReqs.length);
        resp.json({
            totalNumberOfRequest : respModel.length,
            totalGetRequests : getReqs.length,
            averageResponseTimeOfGetReq : calAvg(getReqs),
            totalPostRequests : postReqs.length,
            averageResponseTimeOfPostReq : calAvg(postReqs),
            totalPutRequests : putReqs.length,
            averageResponseTimeOfPutReq : calAvg(putReqs),
            totalDeleteRequests : delReqs.length,
            averageResponseTimeOfDeleteReq : calAvg(delReqs),
            pastOneHourDetails : {
                totalGetRequests : oldHrGETReq.length,
                averageResponseTimeOfGetReq : calAvg(oldHrGETReq),
                totalPostRequests : oldHrPOSTReq.length,
                averageResponseTimeOfPostReq : calAvg(oldHrPOSTReq),
                totalPutRequests : oldHrPUTReq.length,
                averageResponseTimeOfPutReq : calAvg(oldHrPUTReq),
                totalDeleteRequests : oldHrDELETEReq.length,
                averageResponseTimeOfDeleteReq : calAvg(oldHrDELETEReq)
            },
            pastOneMinuteDates: {
                totalGetRequests : oldMinGETReq.length,
                averageResponseTimeOfGetReq : calAvg(oldMinGETReq),
                totalPostRequests : oldMinPOSTReq.length,
                averageResponseTimeOfPostReq : calAvg(oldMinPOSTReq),
                totalPutRequests : oldMinPUTReq.length,
                averageResponseTimeOfPutReq : calAvg(oldMinPUTReq),
                totalDeleteRequests : oldMinDELETEReq.length,
                averageResponseTimeOfDeleteReq : calAvg(oldMinDELETEReq)
            }
        });
    })
})

function calAvg(dataArr){
    var total = 0;
    for(var i =0;i< dataArr.length;i++){
        total+= dataArr[i].duration;
    }
    return (total/dataArr.length) || 0 ;
}
module.exports = router;