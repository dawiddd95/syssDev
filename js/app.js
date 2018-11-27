let globalController = (function() {

	let stringsDOM = controllerUI.getStringsDOM();
	let input = controllerUI.getAppInputs();
	let dataElements = statisticsController.getDataElements();

	const addStorehouseController = () => {
		controlAddStorehouse();
	}

	const addShopController = () => {

		let productAmount, selectName, amountInput, productName, productPrice, newShop; 
		
		selectName = document.querySelector('select').value;
		amountInput = document.querySelector(stringsDOM.shopModalAmountInput).value; 

		dataElements.storehouse.forEach(function(currentElement) {
			if(currentElement.name === selectName) {
				productAmount = currentElement.amount;
				productName = currentElement.name;
				productPrice = currentElement.price;
			}
		})
	
		productAmount = parseInt(productAmount);
		amountInput = parseInt(amountInput);

		if(productAmount<amountInput) {

			document.querySelector(stringsDOM.editModalInformation).style.display = 'inline';
			document.querySelector(stringsDOM.shopModalAmountInput).style.borderColor = 'red';
		} else {

			newShop = statisticsController.moveToShop(dataElements.lpShopNumber, productName, amountInput, productPrice); 
			controllerUI.hideShopModal();
			controllerUI.displayShop();
			statisticsController.updateItemAmountValue(selectName, amountInput);			
			controllerUI.displayStorehouse();
			controllerUI.displayProductsListToShop();

			dataElements.lpShopNumber++;
		}
	}

	const controlAddStorehouse = () => {
		let newStorehouse;

		if(input.storehouseModalName.value != '' && !isNaN(input.storehouseModalAmount).value && input.storehouseModalAmount.value > 0 &&  !isNaN(input.storehouseModalPrice).value && input.storehouseModalPrice.value > 0) {
			dataElements.lpNumber++;

			newStorehouse = statisticsController.addProduct(dataElements.lpNumber, input.storehouseModalName.value, input.storehouseModalAmount.value, input.storehouseModalPrice.value);
			controllerUI.displayStorehouse(newStorehouse);
			controllerUI.displayProductsListToShop();
			controllerUI.hideStorehouseModal();
			controllerUI.clearAddStorehouseModal();
		}  else {
			document.querySelector(stringsDOM.addStorehouseInformation).style.display = 'inline';
 			controlValidateAddStorehouse();
		}
	}

	const controlValidateAddStorehouse = () => {
		controllerUI.checkName();
 		controllerUI.checkAmount();
 		controllerUI.checkPrice();
	}

	const controlEditStorehouse = () => {
		statisticsController.editStorehouseItem(dataElements.lpPosition);
		controllerUI.displayStorehouse();
		controllerUI.hideStorehouseEditModal();
		controllerUI.displayProductsListToShop();
	}

	const controlEditShop = () => {
		statisticsController.editShopItem(dataElements.lpShopPosition); 
		controllerUI.displayShop();
		controllerUI.hideShopEditModal(); 
	}

	document.querySelector(stringsDOM.addStorehouseButton).addEventListener('click', addStorehouseController);
	document.querySelector(stringsDOM.editModalButton).addEventListener('click', controlEditStorehouse);
	document.querySelector(stringsDOM.addShopButton).addEventListener('click', addShopController);
	document.querySelector(stringsDOM.editShopButton).addEventListener('click', controlEditShop);


	document.querySelector(stringsDOM.storehouseSection).addEventListener('click', controllerUI.showStorehousePanel);
	document.querySelector(stringsDOM.shopSection).addEventListener('click', controllerUI.showShopPanel);
	document.querySelector(stringsDOM.addStorehouse).addEventListener('click', controllerUI.showStorehouseModal);
	document.querySelector(stringsDOM.storehouseCloseModal).addEventListener('click', controllerUI.hideStorehouseModal);
	document.querySelector(stringsDOM.storehouseEditModalClose).addEventListener('click', controllerUI.hideStorehouseEditModal);
	document.querySelector(stringsDOM.storehouseCloseModal).addEventListener('click', controllerUI.clearAddStorehouseModal);
	document.querySelector(stringsDOM.addShop).addEventListener('click', controllerUI.showShopModal);
	document.querySelector(stringsDOM.shopCloseModal).addEventListener('click', controllerUI.hideShopModal);
	document.querySelector(stringsDOM.shopEditModalClose).addEventListener('click', controllerUI.hideShopEditModal);
	document.querySelector(stringsDOM.showStorehouse).addEventListener('click', controllerUI.showStorehouse);
	document.querySelector(stringsDOM.showShop).addEventListener('click', controllerUI.showShop);

})();

