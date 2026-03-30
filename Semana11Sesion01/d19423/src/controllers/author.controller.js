const Author = require('../models/author.model');

exports.create = async(req,res)=>{
    try {
        const author = await Author.create(req.body);
        res.status(201).send(author);
    } catch (error) {
        res.status(500).send({message: error});
    }
}

exports.get = async(req,res)=>{
    try {
        const {q, limit=20, page=1} = req.query;
        const filter = q?{name: new RegExp(q,'i')}:{};
        const skip = (Number(page)-1)*Number(limit);
        const [items, total] = await Promise.all([
            Author.find(filter).sort({name:1}).skip(skip).limit(limit).lean(),
            Author.countDocuments(filter)
        ]);
        res.json({
            total,
            page: Number(page),
            items
        });

    } catch (error) {
        res.status(500).send({message: error});
    }
}

exports.getById = async(req,res)=>{
    try {
        const author = await Author.findById(req.params.id);
        if(!author) return res.status(404).json({message: `No se ha encontrado el author con el id: ${req.params.id}`});
        res.status(200).json(author);
    } catch (error) {
        res.status(500).send({message: error});
    }
}

exports.put = async(req,res)=>{
    try {
        const updated = await Author.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        if(!updated) return res.status(404).json({message: `No se ha encontrado el author con el id: ${req.params.id}`});
        res.status(200).json(updated);
    } catch (error) {
         res.status(500).send({message: error});
    }
}

exports.delete = async(req,res)=>{
    try {
        const deleted = await Author.findByIdAndDelete(
            req.params.id,
        )
        if(!deleted) return res.status(404).json({message: `No se ha encontrado el author con el id: ${req.params.id}`});
        res.status(204).json();
    } catch (error) {
         res.status(500).send({message: error});
    }
}
