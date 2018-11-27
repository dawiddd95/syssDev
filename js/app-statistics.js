let statisticsController = (function() {

	function Storehouse(lp, name, amount, price) {
		this.lp = lp;
		this.name = name;
		this.amount = amount;
		this.price = price;
	}

	function Shop(lp, name, amount, price) {
		Storehouse.call(this, lp, name, amount, price);
	}

	let dataElements = {
		storehouse: [],
		shop: [],
		lpNumber: 0,
		lpShopNumber: 1,
		lpPosition: -1,
		lpShopPosition: -1
	}

	const getDataElements = () => {
		return dataElements;
	}

	const addProduct = (productLp, productName, productAmount, productPrice) => {
		let newStorehouse;
		
		newStorehouse = new Storehouse(productLp, productName, productAmount, productPrice);

		dataElements.storehouse.push(newStorehouse);

		return newStorehouse;
	}

	const deleteFromStorehouse = (lp) => { 
		let ids, index;

		ids = dataElements.storehouse.map(function(currentElement) {
			return currentElement.lp; 
		})
			
		index = ids.indexOf(lp); 

		if (index !== -1) {
			dataElements.storehouse.splice(index,1);
		}

		// wszystkie lp powyzej tego usunietego dekrementacja o 1
		dataElements.storehouse.forEach(function(currentElement) {
			if(currentElement.lp > index) {
				currentElement.lp--;
			}
		})	

		dataElements.lpNumber--;
	}

	const editStorehouseItem = (lp) => {
		let stringsDOM; 

		stringsDOM = controllerUI.getStringsDOM();

		dataElements.storehouse.forEach(function(currentElement) {
			if(currentElement.lp === lp) {
				currentElement.name = document.querySelector(stringsDOM.editModalName).value;
				currentElement.amount = document.querySelector(stringsDOM.editModalAmount).value;
				currentElement.price = document.querySelector(stringsDOM.editModalPrice).value;
			}
		})
	}

	const updateItemAmountValue = (selectName, toShopAmount) => {

		dataElements.storehouse.forEach(function(currentElement) {
			if(currentElement.name === selectName) {
				currentElement.amount = currentElement.amount-toShopAmount;
			}
		})
	}

	const moveToShop = (productLp, productName, productAmount, productPrice) => {
		let newShop;

		newShop = new Shop(productLp, productName, productAmount, productPrice);

		dataElements.shop.push(newShop);

		return newShop; 
	}

	const deleteFromShop = (lp) => { 
		let ids, index;

		ids = dataElements.shop.map(function(currentElement) {
			return currentElement.lp; 
		})
			
		index = ids.indexOf(lp); 

		if (index !== -1) {
			dataElements.shop.splice(index,1);
		}

		dataElements.shop.forEach(function(currentElement) {
			if(currentElement.lp > index) {
				currentElement.lp--;
			}
		})	

		dataElements.lpShopNumber--;
	}

	const editShopItem = (lp) => {
		let stringsDOM; 

		console.log(lp);

		stringsDOM = controllerUI.getStringsDOM();

		dataElements.shop.forEach(function(currentElement) {
			if(currentElement.lp === lp) {
				currentElement.name = document.querySelector(stringsDOM.editShopModalName).value;
				currentElement.amount = document.querySelector(stringsDOM.editShopModalAmount).value;
				currentElement.price = document.querySelector(stringsDOM.editShopModalPrice).value;
			}
		})	
	}
	
	return {
		getDataElements: getDataElements,
		addProduct: addProduct,
		deleteFromStorehouse: deleteFromStorehouse,
		editStorehouseItem: editStorehouseItem,
		editStorehouseItem: editStorehouseItem,
		moveToShop: moveToShop,
		deleteFromShop: deleteFromShop,
		updateItemAmountValue: updateItemAmountValue,
		editShopItem: editShopItem
	}
	

})();