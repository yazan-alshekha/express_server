"use strict";

class collection{
    constructor(model){
        this.model=model
    }

    async createRecord(obj){
        try{
            return await this.model.create(obj);
            
        }
        catch{
            console.error('error in creating a new record for model: ', this.model.name);
        }
    }

    async readRecord(id) {
        try {
            if (id) {
                return await this.model.findOne({ where: { id: id } })
            } else {
                return await this.model.findAll();
            }
        } catch (e) {
            console.error('error in reading record(s) for model: ', this.model.name);
        }
    }

    async updateRecord(updatedData , id){
        return await this.model.update( updatedData , {where:{id : id}} );

    }

    async deleteRecord(id){
        return await this.model.destroy( { where: {id:id} } );
    }
    async readWithOrders(Order) {
        // console.log('dddddd',Order)

        try {
            return await this.model.findAll({ include: [Order] })
        } catch (e) {
            console.error('error in reading record and orders for model: ', this.model.name);
        }
    }


}

module.exports = collection;