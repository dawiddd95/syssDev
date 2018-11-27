let controllerUI = (function() { 

	let stringsDOM = {

		storehouseSection: '.app__storehouse',
		shopSection: '.app__shop',
		
		storehousePanel: '.storehouse__panel',
		shopPanel: '.shop__panel',
		
		addStorehouse: '.panel__add-storehouse',
		storehouseModal: '.add__storehouse',
		storehouseCloseModal: '.storehouse__close',
		storehouseModalNameInput: '.name__input',
		storehouseModalAmountInput: '.amount__input',
		storehouseModalPriceInput: '.price__input',
		addStorehouseInformation: '.content__information',
		addStorehouseButton: '.storehouse__button',
		
		storehouseEditModal: '.edit__storehouse',
		storehouseEditModalClose: '.edit__close',
		editModalName: '.edit__name',
		editModalAmount: '.edit__amount',
		editModalPrice: '.edit__price',
		editModalInformation: '.shop__information',
		editModalButton: '.edit__button',
		
		addShop: '.panel__add-shop',
		shopModal: '.add__shop',
		shopCloseModal: '.shop__close',
		shopModalAmountInput: '.shop__amount',
		addShopButton: '.shop__button',
		
		shopEditModal: '.edit__shop',
		shopEditModalClose: '.shop-edit__close',
		editShopModalName: '.edit-shop__name',
		editShopModalAmount: '.edit-shop__amount',
		editShopModalPrice: '.edit-shop__price',
		editShopButton: '.edit-shop__button',
		
		showStorehouse: '.panel__show-storehouse',
		showShop: '.panel__show-shop',
		storehouseView: '.main__storehouse',
		shopView: '.main__shop'
	}

	let appInputs = {
		storehouseModalName: document.querySelector(stringsDOM.storehouseModalNameInput),
		storehouseModalAmount: document.querySelector(stringsDOM.storehouseModalAmountInput),
		storehouseModalPrice: document.querySelector(stringsDOM.storehouseModalPriceInput),
		shopModalAmount: document.querySelector(stringsDOM.shopModalAmountInput)
	}

	let dataElements = statisticsController.getDataElements();

	const getStringsDOM = () => {
		return stringsDOM;
	}

	const getAppInputs = () => {
		return appInputs;
	}

	const showStorehousePanel = () => {
		document.querySelector(stringsDOM.storehousePanel).classList.toggle('storehouse__panel-open');
	}

	const showShopPanel = () => {
		document.querySelector(stringsDOM.shopPanel).classList.toggle('shop__panel-open');	
	}

	const showStorehouseModal = () => {
		document.querySelector(stringsDOM.storehouseModal).style.display = 'block';
	}

	const hideStorehouseModal = () => {
		document.querySelector(stringsDOM.storehouseModal).style.display = 'none';
		document.querySelector(stringsDOM.storehouseModalNameInput).style.borderColor = 'blue'
		document.querySelector(stringsDOM.storehouseModalAmountInput).style.borderColor = 'blue';
		document.querySelector(stringsDOM.storehouseModalPriceInput).style.borderColor = 'blue';
	}

	const checkName = () => {
		let name = appInputs.storehouseModalName;

		if(name.value == '') {
			name.style.borderColor = 'red';
		} else {
			name.style.borderColor = 'green';
		}
	}

	const checkAmount = () => {
		let amount = appInputs.storehouseModalAmount;

		if(amount.value == '' || isNaN(amount.value) || amount.value <= 0) {
			amount.style.borderColor = 'red';
		} else {
			amount.style.borderColor ='green';
		}
	}

	const checkPrice = () => {
		let price = appInputs.storehouseModalPrice;

		if(price.value == '' || isNaN(price.value) || price.value <= 0) {
			price.style.borderColor = 'red';
		} else {
			price.style.borderColor ='green';
		}
	}

	const clearAddStorehouseModal = () => {		
		appInputs.storehouseModalName.value = '';
		appInputs.storehouseModalAmount.value = '';
		appInputs.storehouseModalPrice.value = '';

		document.querySelector(stringsDOM.addStorehouseInformation).style.display = 'none';
	}

	const showStorehouseEditModal = () => {
		document.querySelector(stringsDOM.storehouseEditModal).style.display = 'block';
	}

	const hideStorehouseEditModal = () => {
		document.querySelector(stringsDOM.storehouseEditModal).style.display = 'none';
	}

	const completeEditModal = (lp) => { 

		dataElements.storehouse.forEach(function(currentElement) {
			if(currentElement.lp === lp) {
				document.querySelector(stringsDOM.editModalName).value = currentElement.name;
				document.querySelector(stringsDOM.editModalAmount).value = currentElement.amount;
				document.querySelector(stringsDOM.editModalPrice).value = currentElement.price;
			}
		})	

		dataElements.lpPosition = lp;
	}

	const showShopModal = () => {
		document.querySelector(stringsDOM.shopModal).style.display = 'block';
	}

	const hideShopModal = () => {
		document.querySelector(stringsDOM.shopModal).style.display = 'none';
		document.querySelector(stringsDOM.shopModalAmountInput).style.borderColor = 'blue';
		document.querySelector(stringsDOM.shopModalAmountInput).value = '';
		document.querySelector(stringsDOM.editModalInformation).style.display = 'none';
		document.querySelector('select').value = 'Choose here';
	}

	const showShopEditModal = () => {
		document.querySelector(stringsDOM.shopEditModal).style.display = 'block';
	}

	const hideShopEditModal = () => {
		document.querySelector(stringsDOM.shopEditModal).style.display = 'none';
	}

	const completeShopEditModal = (lp) => { 

		dataElements.shop.forEach(function(currentElement) {
			if(currentElement.lp === lp) {
				document.querySelector(stringsDOM.editShopModalName).value = currentElement.name;
				document.querySelector(stringsDOM.editShopModalAmount).value = currentElement.amount;
				document.querySelector(stringsDOM.editShopModalPrice).value = currentElement.price;
			}
		})	

		dataElements.lpShopPosition = lp;
	}

	const showStorehouse = () => {
		document.querySelector(stringsDOM.storehouseView).style.display = 'flex';
		document.querySelector(stringsDOM.shopView).style.display = 'none';
	} 

	const showShop = () => {
		document.querySelector(stringsDOM.storehouseView).style.display = 'none';
		document.querySelector(stringsDOM.shopView).style.display = 'flex';
	}

	const displayStorehouse = () => {

		let wrapper = document.querySelector(`${stringsDOM.storehouseView} .wrapper-cell__table`);
		
		// Czysci rodzica , usuwa wszystkie jego dziecis
		while(wrapper.firstChild) {
			wrapper.removeChild(wrapper.firstChild);
		}

		dataElements.storehouse.forEach(function(currentElement) {

			let cell = document.createElement('div');
			let lp = document.createElement('div');
			let name = document.createElement('div');
			let amount = document.createElement('div');
			let price = document.createElement('div');
			let actions = document.createElement('div');
			let del = document.createElement('img');
			let edit = document.createElement('img');

			cell.classList.add('table__cell');
			cell.setAttribute('id', 'cell');
			lp.classList.add('cell__column');
			lp.classList.add('cell__lp');
			name.classList.add('cell__column');
			name.classList.add('cell__name');
			amount.classList.add('cell__column');
			amount.classList.add('cell__amount');
			price.classList.add('cell__column');
			price.classList.add('cell__price');
			actions.classList.add('cell__column');
			actions.classList.add('cell__actions');
			del.classList.add('actions__edit');
			edit.classList.add('actions__del');
			
			edit.setAttribute('src', 'images/configuration.svg');
			edit.setAttribute('alt', 'edit');
			del.setAttribute('src', 'images/delete.svg');
			del.setAttribute('alt', 'delete');

			lp.innerHTML = currentElement.lp;
			name.innerHTML = currentElement.name;
			amount.innerHTML = currentElement.amount;
			price.innerHTML = currentElement.price;
		
			wrapper.appendChild(cell);
			cell.appendChild(lp);
			cell.appendChild(name);
			cell.appendChild(amount);
			cell.appendChild(price);		
			cell.appendChild(actions);
			actions.appendChild(edit);
			actions.appendChild(del);

			del.addEventListener('click', function() {
				statisticsController.deleteFromStorehouse(currentElement.lp);
				displayStorehouse();
				displayProductsListToShop();
			})

			edit.addEventListener('click', function() { 
				showStorehouseEditModal();
				completeEditModal(currentElement.lp);
			})
		})
	}

	const displayProductsListToShop = () => {

		let select = document.querySelector('select');
		let firstOption = document.createElement('option');

		while(select.firstChild) {
			select.removeChild(select.firstChild);
		}


		firstOption.setAttribute('value', 'choose here');
		firstOption.innerHTML = 'Choose here';
		select.appendChild(firstOption);

		dataElements.storehouse.forEach(function(currentElement) {
			
			let option = document.createElement('option');

			option.setAttribute('value', currentElement.name);
		
			option.innerHTML = `${currentElement.name}  ${currentElement.amount}szt.`;
	
			select.appendChild(option);
		})
	}

	const displayShop = () => {
		let wrapper = document.querySelector(`${stringsDOM.shopView} .wrapper-cell__table`);
		
		while(wrapper.firstChild) {
			wrapper.removeChild(wrapper.firstChild);
		}

		dataElements.shop.forEach(function(currentElement) {

			let cell = document.createElement('div');
			let lp = document.createElement('div');
			let name = document.createElement('div');
			let amount = document.createElement('div');
			let price = document.createElement('div');
			let actions = document.createElement('div');
			let del = document.createElement('img');
			let edit = document.createElement('img');

			cell.classList.add('table__cell');
			cell.setAttribute('id', 'cell');
			lp.classList.add('cell__column');
			lp.classList.add('cell__lp');
			name.classList.add('cell__column');
			name.classList.add('cell__name');
			amount.classList.add('cell__column');
			amount.classList.add('cell__amount');
			price.classList.add('cell__column');
			price.classList.add('cell__price');
			actions.classList.add('cell__column');
			actions.classList.add('cell__actions');
			del.classList.add('actions__edit');
			edit.classList.add('actions__del');
			
			edit.setAttribute('src', 'images/configuration.svg');
			edit.setAttribute('alt', 'edit');
			del.setAttribute('src', 'images/delete.svg');
			del.setAttribute('alt', 'delete');

			lp.innerHTML = currentElement.lp;
			name.innerHTML = currentElement.name;
			amount.innerHTML = currentElement.amount;
			price.innerHTML = currentElement.price;
		
			wrapper.appendChild(cell);
			cell.appendChild(lp);
			cell.appendChild(name);
			cell.appendChild(amount);
			cell.appendChild(price);		
			cell.appendChild(actions);
			actions.appendChild(edit);
			actions.appendChild(del);

			del.addEventListener('click', function() {
				statisticsController.deleteFromShop(currentElement.lp);
				displayShop();
			})

			edit.addEventListener('click', function() { 
				showShopEditModal();
				completeShopEditModal(currentElement.lp);
			})
		})
	}

	return {
		getStringsDOM: getStringsDOM,
		getAppInputs: getAppInputs,
		showStorehousePanel: showStorehousePanel,
		showShopPanel: showShopPanel,
		showStorehouseModal: showStorehouseModal,
		hideStorehouseModal: hideStorehouseModal,
		hideStorehouseEditModal: hideStorehouseEditModal,
		showShopModal: showShopModal,
		hideShopModal: hideShopModal,
		hideShopEditModal: hideShopEditModal,
		showStorehouse: showStorehouse,
		showShop: showShop,
		displayStorehouse: displayStorehouse,
		displayProductsListToShop: displayProductsListToShop,
		checkName: checkName,
		checkAmount: checkAmount,
		checkPrice: checkPrice,
		clearAddStorehouseModal: clearAddStorehouseModal,
		displayShop: displayShop
	}

})();