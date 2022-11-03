
const express=require('express');
const connection=require('../connection');
const router=express.Router();

router.post('/create',(req,res,next)=>{
    let product=req.body;
   
    query="insert into product (name,description,price) values(?,?,?)";
  
    connection.query(query,[product.name,product.description,product.price],(err,result)=>{
        if(!err){
            return res.status(200).json({message:"Product Added Successfully"});

        }
        else
        console.log("ERROR")
        return res.status(500).json(err);
        
    });
    
});

router.get('/read',(req,res,next)=>{
    var query="select * from product";
    connection.query(query,(err,results)=>{
        if(!err){
            console.log("success")
            return res.status(200).json(results);
        }
        else
        {   
            console.log("failed")
            return res.status(500).json(err);
        }

    });
});


router.patch('/update/:id',(req,res,next)=>{
    console.log("aa")
    let product=req.body;
    const id=req.params.id;
    var query="update product set name=?,description=?,price=? where id=?";
    console.log("asadxsa")

    connection.query(query,[product.name,product.description,product.price,id],(err,results)=>{
        console.log("aass")

        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message:"Product id does not exist"});
            }
            return res.status(200).json({message:"sucessfuly updated product"});
        }
        else
        {
            return res.status(500).json(err)
        }
    });
});




router.delete('/delete/:id',(req,res,next)=>{
    console.log("aa")
    //let product=req.body;
    const id=req.params.id;
    var query="delete from product where id=?";
    console.log("asadxsa")

    connection.query(query,[id],(err,results)=>{
                console.log("aass")

        if(!err){
            if(results.affectedRows==0){
                return res.status(404).json({message:"Product id does not exist"});
            }
            return res.status(200).json({message:"sucessfuly updated product"});
        }
        else
        {
            return res.status(500).json(err)
        }
    });
});




    
module.exports=router;