// Import dependencies
import React, { useState, useEffect } from 'react';
import contract from './contract';
import web3 from './web3';

const App = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDetails, setProductDetails] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newPrice, setNewPrice]=useState('');

  // Function to create a new product
  const createProduct = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    await contract.methods.createProduct(productId, productName, web3.utils.toWei(productPrice, 'ether')).send({
      from: accounts[0],
    });
  };

  // Function to delete a product
  const deleteProduct = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    await contract.methods.deleteProduct(productId).send({
      from: accounts[0],
    });
  };

  // Function to get details of a product
  const getProductDetails = async () => {
    const details = await contract.methods.getProductDetails(productId).call();
    setProductDetails(`Product Name: ${details[0]}, Product Price: ${web3.utils.fromWei(details[1], 'ether')} ETH`);
  };

  // Function to update product details
  const updateProductDetails = async () => {
    // Ensure productId is set before calling
    if (!productId) {
      alert('Please enter a valid product ID');
      return;
    }
  
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    await contract.methods.updateProductDetails(productId, newProductName,web3.utils.toWei(newPrice, 'ether')).send({
      from: accounts[0],
    });
  
    getProductDetails();
  };
  

  useEffect(() => {
    
    getProductDetails();
  }, [productId]);

  return (
    <div>
      <h1 class="heading">Poduct Management Dapp</h1>
      <div class="button">
        <h2>Create a Product</h2>
        <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
        <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <input type="text" placeholder="Product Price (in ETH)" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
        <button class="create" onClick={createProduct}>Create Product</button>
      </div>

      <div class="button">
        <h2>Delete a Product</h2>
        <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
        <button class="delete" onClick={deleteProduct}>Delete Product</button>
      </div>

      <div class="button">
        <h2>Get Product Details</h2>
        <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
        <button class="details" onClick={getProductDetails}>Get Details</button>
        <p>{productDetails}</p>
      </div>

      <div class="button">
        <h2>Update Product Details</h2>
        <input type="text" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
        <input type="text" placeholder="New Product Name" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
        <input type="text" placeholder="New Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
        <button class="update" onClick={updateProductDetails}>updateProduct</button>
      </div>
    </div>
  );
};

export default App;
