exports.index = function (req,res){
    message = '';
    if (req.method =="POST"){
        var post = req.body;
        var name = post.user_name;
        var pass = post.password
        var fname = post.first_name;
        var lname = post.last_name;
        var mob = post.mob_no;
        var bday = post.bday;
        var add = post.address;
        

        if (!req.files)
            return res.status(400).send('No files were uploaded');

        var file = req.files.uploaded_image;
        var img_name=file.name;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif"){

            file.mv('public/images/upload_images/'+file.name, function(err){

                if (err)
                return res.status(500).send(err);
                var sql = "INSERT INTO `profile` (`first_name`,`last_name`,`bday`,`address`,`mob_no`,`user_name`,`password`,`image`) VALUES ('"+fname+"','"+lname+"','"+bday+"','"+add+"','"+mob+"','"+name+"','"+pass+"','"+img_name+"')";

                    var query = db.query(sql, function (err, result){
                        res.redirect('profile/'+result.insertId);
                    });
            });
            
        }else{
            message = "This format is not allowed , please upload file with '.png ','.gif' ,'jpg'";
            res.render('index.ejs',{message: message});
        }
    }else{
        res.render('index');
    }
}
exports.profile = function(req, res){
    var message = '';
    var id = req.params.id;
    var sql = "SELECT * from `profile` WHERE `id` = '"+id+"'";
    db.query (sql, function (err,result){
        if (result.length <= 0)
        message= "Profile not found!";

        res.render('profile.ejs',{data:result,message:message});
    });
};