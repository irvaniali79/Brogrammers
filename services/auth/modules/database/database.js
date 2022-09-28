class DB {
    #instance
    constructor(driver){
        if(this.#instance){
            return this.#instance;
        }
        this.#instance = driver;
        return this.#instance;
    }
}


module.exports = DB;