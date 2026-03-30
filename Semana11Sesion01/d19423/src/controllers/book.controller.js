const Book = require('../models/book.model');

exports.create = async(req,res)=>{
    try {
        const book = await Book.create(req.body);
        res.status(201).send(book);
    } catch (error) {
        res.status(500).send({message:error})
    }
}

exports.get = async (req,res) => {
    try {
        const {q, limit=20, page = 1, select, sort='-createdAt',tag, inStock, minPrice, maxPrice} = req.query;
        const filter  = {deletedAt:null}
        if(q) filter.$text = {$search: q}
        if(tag) filter.tags = tag.toLowerCase();
        if(inStock !== undefined) filter.inStock = inStock===true;
        if(minPrice||maxPrice){
            filter.price = {};
            if(minPrice) filter.price.$gte=Number(minPrice);
            if(maxPrice) filter.price.$lte = Number(maxPrice)
        }
        // q ? {name: new RegExp(q,'i')} : {};


        const skip= (Number(page)-1)*Number(limit);

        const projection = select? select.split(',').join(' '): '';

        const query =  Book.find(filter)
            .select(projection)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate('author', 'name country')
            .lean()

        const [items, total] = await Promise.all([
            query,
            Book.countDocuments(filter)
        ])
        res.json({
            total,
            page: Number(page),
            items
        })
    } catch (error) {
        res.status(500).send({message:error})
    }
}
exports.getById = async (req,res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!author) return res.status(404).json({message: "No se ha encontrado el libro"});
        res.status(200).json({...book.toObject(), isClassic: book.isClassic})
    } catch (error) {
         res.status(500).send({message:error})
    }
}

exports.put = async (req,res) => {
    try {
        const updated = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        
        if(!updated) return res.status(404).json({message: "No se ha encontrado el libro"});
        res.status(200).json(updated)
    } catch (error) {
         res.status(500).send({message:error})
    }
}

exports.delete = async (req,res) => {
    try {
        const deleted = await Author.findByIdAndUpdate(req.params.id,
            {
                deletedAt: new Date()
            },
            {
                new:true
            })
        
        if(!deleted) return res.status(404).json({message: "No se ha encontrado el libro"});
        res.status(204).json()
    } catch (error) {
         res.status(500).send({message:error})
    }
}