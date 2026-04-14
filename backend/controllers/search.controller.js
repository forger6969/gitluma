const searchUser = async (req ,res , next)=>{

    try {
        
        const {q} = req.params

        if (!q.length > 2) {
            return res.status(400).json({success:false , message:"Enter minimum 2 characters"})
        }

        

    } catch (err) {
        next(err)
    }

}