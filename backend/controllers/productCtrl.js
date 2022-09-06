import Product from '../models/productModel.js'
import path from 'path';

// Filter, sorting and paginating

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const productCtrl = {
    getProducts: async(req, res) =>{
        try {
            const features = new APIfeatures(Products.find(), req.query)
            .filtering().sorting().paginating()

            const products = await features.query

            res.json({
                status: 'success',
                result: products.length,
                products: products
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async(req, res) =>{
        if(req.files === null) return res.status(400).json({msg: "No File Uploaded"})
        // res.json("test")
        const {product_id, title, price, description, content, category} = req.body;
        const file = req.files.file; //get name image or file
        const fileSize = file.data.length; //Size of file or image
        const ext = path.extname(file.name); //get extension (.png,.jpg,....)
        const filename = file.md5 + ext; //(name is hush)+extension we used for data security
        const url = `${req.protocol}://${req.get('host')}/images/${filename}`;
        const allowedType = ['.png','.jpg','.jpeg'];
        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Images must be less than 5MB"});
        file.mv(`./public/images/${filename}`, async(err)=>{
            if(err) res.status(500).json({msg: err.message}); 
            try {
                await Product.create({
                    product_id: product_id,
                    title: title,
                    price: price,
                    description: description,
                    content: content,
                    image:filename,
                    category: category,
                    url:url
                });
                res.json({msg: "Product Created Successfully"});
            } catch (error) {
                console.log(error.message);
            }
        })
    },
    deleteProduct: async(req, res) =>{
        try {
            await Product.destroy({
                where:{
                    id:req.params.id
                }
            })
            res.json({msg: "Deleted a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async(req, res) =>{
        try {
            const {product_id, title, price, description, content, category} = req.body;
            const file = req.files.file; //get name image or file

            await Product.update({
                product_id: product_id,
                title: title,
                price: price,
                description: description,
                content: content,
                image:filename,
                category: category,
                url:url
            },{
                where:{
                    id: req.params.id
                }
            })
            res.json({msg: "Updated a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

export default productCtrl