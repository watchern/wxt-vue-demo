export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  setInterval(async () => {
    const oldValue = await storage.getItem<number>('session:count');
    const newValue = (oldValue ?? 0) + 1;
    await storage.setItem('session:count', newValue);
  }, 1000);

  console.log(browser.i18n.getUILanguage()  ) //  用于获取用户的语言设置。
  console.log(browser.i18n.getMessage('appName'));
  console.log(i18n.global.t('some-key'));
  console.log(i18n.global.t('示例'));
});
