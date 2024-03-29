import { Builder, By, until } from 'selenium-webdriver'

async function exampleTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {

    
    await driver.get('http://localhost:5173');
    

    for (let i = 0; i < 6; i++) {

      for (let j = 0; j < 6; j++) {

        await driver.wait(until.elementLocated(By.id(`${i},${j}`), 10000))

        for(let k=0; k < 4; k++) { //This number could be increased to a large number to do stress testing as well
          await driver.findElement(By.id(`${i},${j}`)).click();
        }
        
          
      }
    }

    await driver.executeScript('alert("Test sucessful.")')

  } finally {

  }
  
}

exampleTest();