const {Product} = require("../../dataBase");
const {ratingEnum} = require("../../constants");

module.exports = {
    findAll: (params = {}) => {
        return Product.find(params);
    },

    findAllWithPagination: async (query = {}) => {
        const {page = 1, perPage = 10, sortOrder, ...otherFilters} = query;
        const skip = (page - 1) * perPage;
        let products;

        // console.log(otherFilters);  // search, filterBy, ...

        const queryFilters = _getUserFilterQuery(otherFilters);

        if (sortOrder === ratingEnum.HIGH) {
            products = await Product.find(queryFilters).sort({rating: -1}).skip(skip).limit(perPage);
        } else if (sortOrder === ratingEnum.LOW) {
            products = await Product.find(queryFilters).sort({rating: 1}).skip(skip).limit(perPage)
        } else {
            products = await Product.find(queryFilters).skip(skip).limit(perPage);
        }
        const productsCount = await Product.countDocuments(queryFilters);

        return {
            page,
            perPage,
            data: products,
            count: productsCount,
        }
    },

    findAllByCategory: async (productType, category, query = {}) => {
        const {page = 1, perPage = 10, sortOrder, ...otherFilters} = query;
        const skip = (page - 1) * perPage;
        let products;

        const queryFilters = _getUserFilterQuery(otherFilters);

        if (sortOrder === ratingEnum.HIGH) {
            products = await Product.find({
                productType,
                category, ...queryFilters
            }).sort({rating: -1}).skip(skip).limit(perPage);
        } else if (sortOrder === ratingEnum.LOW) {
            products = await Product.find({
                productType,
                category, ...queryFilters
            }).sort({rating: 1}).skip(skip).limit(perPage)
        } else {
            products = await Product.find({productType, category, ...queryFilters}).skip(skip).limit(perPage);
        }

        const productsCount = await Product.countDocuments({productType, category, ...queryFilters});

        return {
            page,
            perPage,
            data: products,
            count: productsCount,
        }
    },

    findOne: (params = {}) => {
        return Product.findOne(params);
    },

    createOne: (product) => {
        return Product.create(product);
    },

    updateOne: (params = {}, productData, options = {new: true}) => {
        return Product.findOneAndUpdate(params, productData, options);
    },

    deleteOne: (params = {}) => {
        return Product.deleteOne(params);
    },
}

function _getUserFilterQuery(filters) {
    const searchObject = {};    // prepared mongo queries

    if (filters.filterBy) {
        const tags = filters.filterBy.split(';');

        Object.assign(searchObject, {
            tagList: {$in: tags}
        })
    }

    if (filters.brand) {
        Object.assign(searchObject, {
            brand: {$regex: filters.brand, $options: 'i'}
        })
    }

    if (filters.category) {
        Object.assign(searchObject, {
            category: {$regex: filters.category, $options: 'i'}
        })
    }

    if (filters.productType) {
        Object.assign(searchObject, {
            productType: {$regex: filters.productType, $options: 'i'}
        })
    }

    // console.log(JSON.stringify(searchObject, null, 2));

    return searchObject;
}
