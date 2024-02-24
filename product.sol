// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

contract ProductManagement {
    
    struct Product {
        string name;
        uint256 price;
    }

    
    mapping(uint256 => Product) public products;

    // Event emitted when a new product is created
    event ProductCreated(uint256 productId, string name, uint256 price);

    // Event emitted when a product is updated
    event ProductUpdated(uint256 productId, string newName, uint256 newPrice);

    // Event emitted when a product is deleted
    event ProductDeleted(uint256 productId);

    // Function to create a new product
    function createProduct(uint256 _productId, string memory _name, uint256 _price) external {
        
        require(products[_productId].price == 0, "Product ID already exists");

        // Create the product
        products[_productId] = Product({
            name: _name,
            price: _price
        });

        // Emit the ProductCreated event
        emit ProductCreated(_productId, _name, _price);
    }

    // Function to get the details of a product
    function getProductDetails(uint256 _productId) external view returns (string memory, uint256) {
        Product storage product = products[_productId];
        require(product.price > 0, "Product does not exist");
        return (product.name, product.price);
    }

    // Function to update the details of a product
    function updateProductDetails(uint256 _productId, string memory _newName, uint256 _newPrice) external {
        Product storage product = products[_productId];
        require(product.price > 0, "Product does not exist");

        // Update the product details
        product.name = _newName;
        product.price = _newPrice;

        // Emit the ProductUpdated event
        emit ProductUpdated(_productId, _newName, _newPrice);
    }

    // Function to delete a product
    function deleteProduct(uint256 _productId) external {
        Product storage product = products[_productId];
        require(product.price > 0, "Product does not exist");

        // Delete the product
        delete products[_productId];

        // Emit the ProductDeleted event
        emit ProductDeleted(_productId);
    }
}
