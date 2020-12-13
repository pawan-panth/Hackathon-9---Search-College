const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connections } = require('mongoose'); 
const { connection } = require('./connector')

app.get("/findColleges", async (req,res)=>{
    let name1 = req.query.name?req.query.name:".*";
    let state1= req.query.state?req.query.state:".*";
    let city1=req.query.city?req.query.city:".*";
    let course1 = req.query.course?req.query.course:".*";
    let exams1 = req.query.exams? `^${req.query.exams}$`:".*";
    let minPackage1 = req.query.minPackage?Number(req.query.minPackage):".*";
    let maxFees1 = req.query.maxFees? Number(req.query.maxFees):".*";
    if(minPackage1>0 && maxFees1>0)
            {   
                 let found = await connection.aggregate([
                {
                        $match:{
                            $and: [
                                {name : new RegExp(name1,'i')},
                                {state: new RegExp(state1,'i')},
                                {city: new RegExp(city1,'i')},
                                {course:new RegExp(course1,'i')},
                                {exam: new RegExp(exams1,'i')},
                            ]          
                        }
                },
                {
    
                    $match:{
                        
                        $expr: {
                            $gt: ["$minPackage",minPackage1]
                        }
                    }
                },
                {
                    $match:{
                        $expr: {
                            $lt: ["$maxFees", maxFees1]
                        }
                    }
                },
                {
                    $project: {
                        _id:0,
                        __v:0
                    }
                }
                ]);
                console.log("both");
                res.send(found);
            }
            else if(minPackage1>0){
                let found = await connection.aggregate([
                    {
                            $match:{
                                $and: [
                                    {name : new RegExp(name1,'i')},
                                    {state: new RegExp(state1,'i')},
                                    {city: new RegExp(city1,'i')},
                                    {course:new RegExp(course1,'i')},
                                    {exam: new RegExp(exams1,'i')},
                                ]          
                            }
                    },
                    {
        
                        $match:{
                            
                            $expr: {
                                $gt: ["$minPackage",minPackage1]
                            }
                        }
                    },
                    {
                        $project: {
                            _id:0,
                            __v:0
                        }
                    }
                    ]);
                    console.log("minpack1")
                    res.send(found);
            }
            else if(maxFees1>0)
            {
                let found = await connection.aggregate([
                {
                        $match:{
                            $and: [
                                {name : new RegExp(name1,'i')},
                                {state: new RegExp(state1,'i')},
                                {city: new RegExp(city1,'i')},
                                {course:new RegExp(course1,'i')},
                                {exam: new RegExp(exams1,'i')},
                            ]          
                        }
                },
                {
    
                    $match:{
                        
                        $expr: {
                            $lt: ["$maxFees",maxFees1]
                        }
                    }
                },
                {
                    $project: {
                        _id:0,
                        __v:0
                    }
                }

                ]);
                console.log("maxFees");
                res.send(found);
    
            }
            else{
                let found = await connection.aggregate([
                    {
                        $match:{
                            $and: [
                                {name : new RegExp(name1,'i')},
                                {state: new RegExp(state1,'i')},
                                {city: new RegExp(city1,'i')},
                                {course:new RegExp(course1,'i')},
                                {exam: new RegExp(exams1,'i')},
                            ]          
                        }
                    },
                    {
                        $project: {
                            _id:0,
                            __v:0
                        }
                    }
                ]);
                console.log("none");
                res.send(found);
            } 

});



app.listen(port, () => console.log(`App listening on port ${port}!`))



module.exports = app;















// app.get('/findColleges', async (req,res)=>{
//     let name1 = req.query.name?req.query.name:"";
//     let state1= req.query.state?req.query.state:"";
//     let city1=req.query.city?req.query.city:"";
//     let course1 = req.query.course?req.query.course:"";
//     let exams1 = req.query.exams? req.query.exams:"";
//     let minPackage1 = req.query.minPackage?req.query.minPackage:"";
//     let maxFees1 = req.query.maxFees? req.query.maxFees:"";
//     try{
//         if(Number(minPackage1)>0 && Number(maxFees1)>0)
//         {   
//              let found = await connection.aggregate([
//             {
//                     $match:{
//                         $and: [
//                             {name : new RegExp(name1,'i')},
//                             {stat: new RegExp(state1,'i')},
//                             {city: new RegExp(city1,'i')},
//                             {course:new RegExp(course1,'i')},
//                             {exams: new RegExp(exams1,'i')},
//                         ]          
//                     }
//             },
//             {

//                 $match:{
                    
//                     $expr: {
//                         $gt: ["$minPackage",minPackage1]
//                     }
//                 }
//             },
//             {
//                 $match:{
//                     $expr: {
//                         $lt: ["$maxFees", maxFees1]
//                     }
//                 }
//             }
//             ]);
//             res.send(found);
//         }
//         else if(Number(minPackage1)>0){
//             let found = await connection.aggregate([
//                 {
//                         $match:{
//                             $and: [
//                                 {name : new RegExp(name1,'i')},
//                                 {stat: new RegExp(state1,'i')},
//                                 {city: new RegExp(city1,'i')},
//                                 {course:new RegExp(course1,'i')},
//                                 {exams: new RegExp(exams1,'i')},
//                             ]          
//                         }
//                 },
//                 {
    
//                     $match:{
                        
//                         $expr: {
//                             $gt: ["$minPackage",minPackage1]
//                         }
//                     }
//                 },
//                 ]);
//                 res.send(found);
//         }
//         else if(Number(maxFees1)>0)
//         {
//             let found = await connection.aggregate([
//             {
//                     $match:{
//                         $and: [
//                             {name : new RegExp(name1,'i')},
//                             {stat: new RegExp(state1,'i')},
//                             {city: new RegExp(city1,'i')},
//                             {course:new RegExp(course1,'i')},
//                             {exams: new RegExp(exams1,'i')},
//                         ]          
//                     }
//             },
//             {

//                 $match:{
                    
//                     $expr: {
//                         $lt: ["$maxFees",maxFees1]
//                     }
//                 }
//             },
//             ]);
//             res.send(found);

//         }
//         else{
//             let found = await connection.aggregate([
//                 {
//                     $match:{
//                         $and: [
//                             {name : new RegExp(name1,'i')},
//                             // {stat: new RegExp(state1,'i')},
//                             // {city: new RegExp(city1,'i')},
//                             // {course:new RegExp(course1,'i')},
//                             // {exams: new RegExp(exams1,'i')},
//                         ]          
//                     }
//                 },
//             ]);
//             console.log(found);
//             res.send(found);
//         } 
//     }
//     catch(e){
//         console.log(e);
//     }
    
// });