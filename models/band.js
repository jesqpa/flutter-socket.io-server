const { v4: uuidV4 } = require('uuid');

class Band{

    constructor( name = 'no-name'){

        this.name = name;
        this.votes = 0;
        this.id = uuidV4();
    }
}

module.exports = Band;