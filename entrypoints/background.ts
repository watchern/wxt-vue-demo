export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  setInterval(async () => {
    const oldValue = await storage.getItem<number>('session:count');
    const newValue = (oldValue ?? 0) + 1;
    await storage.setItem('session:count', newValue);
  }, 1000);

  console.log(browser.i18n.getMessage('extName'));
  console.log(i18n.global.t('some-key'));
});
