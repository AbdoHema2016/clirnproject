import wd from 'wd';
export default async (driver) => {
  const action = new wd.TouchAction(driver);
  await action
    .press({x: 200, y: 1500})
    .wait(100)
    .moveTo({x: 200, y: 10})
    .release();
  await action.perform();
};
