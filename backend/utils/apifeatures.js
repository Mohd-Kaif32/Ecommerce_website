class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword=this.queryStr.keyword?
        {
            name:{
                $regex:this.queryStr.keyword,
                $options:"i"
            }
        }:{};
        this.query=this.query.find({...keyword});
        return this;
    }
    // filter(){
    //     const queryCopy={...this.queryStr};
    //     const removeFields=["keyword","page","limit"];
        

    //     removeFields.forEach(key=>delete queryCopy[key]);


    // //     if (queryCopy.price) {
    // //     if (queryCopy.price.gte) queryCopy.price.gte = Number(queryCopy.price.gte);
    // //     if (queryCopy.price.lte) queryCopy.price.lte = Number(queryCopy.price.lte);
    // // }

    //     let queryStr=JSON.stringify(queryCopy);
    //     queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`);

    //     this.query=this.query.find(JSON.parse(queryStr));

    //     return this;
    // }

    filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    
    if (queryCopy.price) {
        const priceFilter = {};

        if (queryCopy.price.gte) {
            priceFilter.$gte = Number(queryCopy.price.gte);
        }

        if (queryCopy.price.lte) {
            priceFilter.$lte = Number(queryCopy.price.lte);
        }

        queryCopy.price = priceFilter;
    }

    console.log("Final MongoDB query conditions:", queryCopy);

    this.query = this.query.find(queryCopy);
    return this;
}








    pagination(resultPerPage){
        const currentPage=Number(this.queryStr.page)||1;
        const skip=resultPerPage*(currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
module.exports=ApiFeatures;