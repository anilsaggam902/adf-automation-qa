// spec.js

describe('ADF Demo App', function() {
	
	var applyButton = element(by.id('host-button'));
	var folderName = 'adrianamoraru';
	var newFolderButton = element(by.xpath("//mat-icon[text() = 'create_new_folder']"));
        var folderNameElement = element(by.id('adf-folder-name-input'));
	var addFolderButton  = element(by.id('adf-folder-create-button'));
	var paneElement = element(by.className('cdk-overlay-pane'));
	var myFolder = element(by.xpath("//span[@title='" + folderName + "']"));
	
	beforeAll(async() => {
		await browser.get('http://qaexercise.envalfresco.com/settings');
	
		expect(element(by.className('adf-setting-container')).isDisplayed()).toBeTruthy();
	});
  
  
 it('should change provider to ECM and navigate to login page', function() {
	 
	element.all(by.id('adf-provider-selector-panel')).each(function (eachElement, index) 
		{
		   element(by.css('mat-option-1')).click();
		   browser.driver.sleep(500);
		   expect(element(by.className('ng-tns-c134-1 ng-star-inserted'))).getText().toBe('ECM');
	   });
   
	applyButton.click(); 
	browser.driver.sleep(500);
	expect(element(by.className('adf-ie11FixerParent')).isDisplayed()).toBeTruthy();
	
});

 it('should login to the ADF Demo App', function() {  
 
        const userNameInput = element(by.id('username'));
        const userPassInput = element(by.id('password'));
        const submitButton = element(by.id('login-button'));
	
	userNameInput.sendKeys('guest@example.com');
	userPassInput.sendKeys('Password');
	submitButton.click();
	
	browser.driver.sleep(500);	
	expect(element(by.className('adf-app-title')).isDisplayed()).toBeTruthy();
//	expect(element(by.className('adf-app-title'))).getText().toBe('ADF Demo Application');

});

 it('should navigate to Content Services ', function() {  

	const contentFolder = element(by.xpath(".//mat-list-item[@data-automation-id = 'Content Services']"));
	contentFolder.click();
	
	expect(element(by.xpath("//span[text() = 'My files']")).isDisplayed()).toBeTruthy();	
});

 it('should create new folder', function() {  

	newFolderButton.click();
	expect(paneElement.isDisplayed()).toBeTruthy;

        folderNameElement.sendKeys(folderName);
        addFolderButton.click();	
	expect(myFolder.isDisplayed()).toBeTruthy();
});

 it('should not create new folder with an existing name', function() {  

	const spanElement = element(by.xpath('//simple-snack-bar//span'));
	const cancelButton = element(by.id('adf-folder-cancel-button'));
	newFolderButton.click();

        folderNameElement.sendKeys(folderName);
        addFolderButton.click();	
	
        expect(spanElement.getText()).toEqual("There's already a folder with this name. Try a different name.");
	expect(paneElement.isDisplayed()).toBeTruthy;
	cancelButton.click();
        expect(browser.isElementPresent(paneElement)).toBe(false);
});

 it('should delete the created folder', function() {  
 
        const dotsButton = element(by.xpath("//div[@data-automation-id='" + folderName 
										+ "']/following-sibling::div[@role='gridcell']//mat-icon[text()='more_vert']")); 
        const deleteButton = element(by.xpath("//button//span[text() = 'Delete']"));
 
        myFolder.click();
	dotsButton.click();
	browser.driver.sleep(500);	
	expect(paneElement.isDisplayed()).toBeTruthy;
	
	deleteButton.click();
	expect(browser.isElementPresent(myFolder)).toBe(false);
});

});
