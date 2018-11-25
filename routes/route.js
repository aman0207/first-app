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

})

module.exports = router;