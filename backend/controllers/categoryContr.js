import Category from '../models/categoryModel.js'

const categoryCtrl ={
    getCategories: async(req,res)=>{
        try {
            const categories = await Category.findAll()
            res.json(categories) //[]
        } catch (error) {
            return res.status(400).json({msg: error.message})
        }
    },
    createCategory: async(req,res)=>{
        try {
            // res.json('Check admin sucess')
            //if user have role = 1 --> admin
            //only admin can create , delete, and update category
            const {name} = req.body 
            const category = await Category.findOne({
                where:{
                    name: name
                }
            })
            if(category) return res.status(400).json({msg: "This category already exists."})
            //save to database
            await Category.create({
                name:name,
            })
            res.json({msg: "Created a category"})
        } catch (error) {
            return res.status(400).json({msg: error.message})
        }
    },
    deleteCategory: async(req,res)=>{
        try {
            await Category.destroy({
                where:{
                    id: req.params.id
                }
            })
            res.json({msg: "Daleted a Category"})
        } catch (error) {
            return res.status(400).json({msg: error.message})
        }
    },
    updateCategory: async(req,res)=>{
        try {
            await Category.update({name:req.body.name},{
                where:{
                    id: req.params.id
                }
            })
            res.json({msg: "Updated a Category"})
        } catch (error) {
            return res.status(400).json({msg: error.message})
        }
    }
}

export default categoryCtrl