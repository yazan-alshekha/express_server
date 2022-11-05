"use strict";

class collection {
    constructor(model) {
        this.model = model
    }

    async createRecord(obj) {
        try {
            return await this.model.create(obj);

        }
        catch {
            console.error('error in creating a new record for model: ', this.model.name);
        }
    }

    async readRecord(condition, id) {
        try {
            if (condition) {
                return await this.model.findOne({ where: { [condition]: id } })
            } else {
                return await this.model.findAll();
            }
        } catch (e) {
            console.error('error in reading record(s) for model: ', this.model.name);
        }
    }
    async getCurrenciesByCca2(cca2Value  ) {
        try {
                return await this.model.findOne({ where: { cca2: cca2Value } , attributes: ['currencies'] })
                // return await this.model.findOne( { attributes: ['currencies'] } )

        } catch (e) {
            console.error('error in reading record(s) for model: ', this.model.name);
        }
    }

}

module.exports = collection;