async function injectCss(tabId) {
  const css = `
    * {
      user-select: auto !important;
    }`;

  chrome.scripting.insertCSS(
    {
      target: { tabId: tabId },
      css: css,
    },
    () => {
      const e = chrome.runtime.lastError;
      if (e !== undefined) {
        console.log(e);
      }
    }
  );
}

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onUpdated
async function handleUpdated(tabId) {
  injectCss(tabId);
}

chrome.tabs.onUpdated.addListener(handleUpdated);
